import { json } from "@remix-run/node";
import { Format } from "~/types/Format";
import {
  LeagueSettings,
  ScoringCategory,
  ScoringRule,
  ScoringRules
} from "~/types/LeagueSettings";
import { Pick } from "~/types/Picks";
import { Player } from "~/types/Player";
import { Roster } from "~/types/Roster";
import { TotalValue } from "~/types/RosterValue";
import { Team } from "~/types/Team";
import { Standings, TeamStats } from "~/types/TeamStats";
import { getPlayerValue, getRound, pad, searchPlayer } from "~/utils/players";
import { RosterValue } from "../types/Roster";
import { H2HStats } from "./../types/TeamStats";
import { csvToJson } from "./../utils/csvToJson";

interface ActionDataEmail {
  errors?: {
    email?: string;
  };
}

type Cell = {
  player?: any;
  slot?: { slot: number; overall: number; round: number };
};

function wasLeagueActive(team: any) {
  return team?.recordOverall.hasOwnProperty("wins");
}

function wasLeagueActiveH2H(game: any) {
  return game?.awayScore?.score?.hasOwnProperty("value");
}

export const getTeams = async (email: string) => {
  let teams: Team[] = [];
  let year = new Date().getFullYear();
  const params = `FetchUserLeagues?sport=NFL&email=${email}&season=${year}`;
  const url = `https://www.fleaflicker.com/api/${params}`;

  await fetch(url)
    .then(async (response) => {
      const data = await response.json();

      const leagues = data.leagues;
      teams = leagues.map((league: any) => {
        return {
          leagueId: league.id,
          leagueName: league.name,
          teamId: league.ownedTeam.id,
          teamName: league.ownedTeam.name,
        };
      });
    })
    .catch((error) => {
      return json<ActionDataEmail>(
        { errors: { email: "Could not find any league for this email" } },
        { status: 400 }
      );
    });

  return { teams };
};

export const getScoreBoard = async (leagueId: number, year: number) => {
  const params = `FetchLeagueScoreboard?sport=NFL&league_id=${leagueId}&season=${year}`;
  const url = `https://www.fleaflicker.com/api/${params}`;

  return await fetch(url)
    .then(async (response) => {
      return await response.json();
    })
    .catch(() => {
      return json<ActionDataEmail>(
        { errors: { email: "Could not find any league for this email" } },
        { status: 400 }
      );
    });
};

const fetchRules = async (leagueId: number): Promise<LeagueSettings> => {
  const url = `https://www.fleaflicker.com/nfl/leagues/${leagueId}/rules`;

  const rules: LeagueSettings = await fetch(url).then(async (response) => {
    const page = await response.text();

    // Format
    let pos = page.search("TE</span>");
    let qbCount = parseInt(page.slice(pos - 59, pos - 58));
    let format =
      qbCount > 1 || page.search("QB/RB") !== -1
        ? Format.FORMAT_2QB
        : Format.FORMAT_1QB;

    //playoff settings
    pos = page.search("Weeks:");
    let numberOfPlayoffTeams = parseInt(
      page
        .slice(pos - 16, pos - 14)
        .split("<")[0]
        .trim()
    );

    let [first, last] = page
      .slice(pos + 7, pos + 12)
      .trim()
      .split("-");

    const firstWeek = parseInt(first);
    const lastWeek = parseInt(last);

    return { numberOfPlayoffTeams, firstWeek, lastWeek, format };
  });

  return rules;
};

const hasPremiumForTECatch = (rule: {
  pointsPer?: { value: number };
  points?: { value: number };
  applyTo: string[];
}): boolean => {
  if (!rule.applyTo.find((item) => item === "TE")) return false;

  return (rule.pointsPer?.value ?? rule?.points?.value ?? 0) > 1;
};

const fetchScoringRules = async (leagueId: number): Promise<ScoringRules> => {
  const params = `FetchLeagueRules?sport=NFL&league_id=${leagueId}`;
  const url = `https://www.fleaflicker.com/api/${params}`;

  let isHalfPPR: boolean = false;
  let isPPR: boolean = false;
  let isTEPremium: boolean = false;
  let pprTE: number = 0;

  let scoringRules: ScoringRule[] = [];

  await fetch(url).then(async (response) => {
    const data = await response.json();
    if (data) {
      data?.groups.forEach((group: any) => {
        if (group.label == "Passing") {
          const passingRules: any[] = group?.scoringRules.filter(
            (rule: any) => rule.category.nameSingular === "Passing TD"
          );
          if (passingRules.length > 0) {
            const scoringRule: ScoringRule = {
              category: ScoringCategory.PASSING_TD,
              points: passingRules[0].points.value,
              applyTo: passingRules[0].applyTo,
            };
            scoringRules?.push(scoringRule);
          }
        }

        if (group.label == "Receiving") {
          const receivingRules: any[] = group?.scoringRules.filter(
            (rule: any) => rule.category.nameSingular === "Catch"
          );
          receivingRules.forEach((rule: any) => {
            if ((rule?.pointsPer?.value ?? rule?.points?.value ?? 0) >= 1) {
              isPPR = true;
            }

            if ((rule?.pointsPer?.value ?? rule?.points?.value ?? 0) === 0.5) {
              isHalfPPR = true;
            }

            isTEPremium = hasPremiumForTECatch(rule);
            if(isTEPremium){
              pprTE = rule?.pointsPer?.value ?? rule?.points?.value ?? 0;
            }

            const scoringRule: ScoringRule = {
              category: ScoringCategory.RECEPTION,
              points: rule.pointsPer?.value ?? rule?.points?.value ?? 0,
              applyTo: rule.applyTo,
            };
            scoringRules?.push(scoringRule);
          });
        }
        if (group.label == "Rushing") {
          const receivingRules: any[] = group?.scoringRules.filter(
            (rule: any) => rule.category.nameSingular === "Rushing Attempt"
          );
          receivingRules.forEach((rule: any) => {
            const scoringRule: ScoringRule = {
              category: ScoringCategory.RUSH_ATTEMPT,
              points: rule.pointsPer.value,
              applyTo: rule.applyTo,
            };
            scoringRules?.push(scoringRule);
          });
        }
      });
    }
    return scoringRules;
  });

  return {
    scoringRules,
    isHalfPPR,
    isPPR,
    isTEPremium,
    pprTE
  };
};

export const getLeagueSettings = async (
  leagueId: number
): Promise<LeagueSettings> => {
  const leagueSettings = await fetchRules(leagueId);
  leagueSettings.scoringRules = await fetchScoringRules(leagueId);
  return leagueSettings;
};

export const getStats = async (leagueId: number) => {
  let stats: TeamStats[] = [];
  let year = new Date().getFullYear();

  const leagueSettings = await getLeagueSettings(leagueId);

  let hasData = true;
  while (hasData) {
    const params = `FetchLeagueStandings?sport=NFL&league_id=${leagueId}&season=${year}`;

    const url = `https://www.fleaflicker.com/api/${params}`;
    await fetch(url).then(async (response) => {
      const data = await response.json();

      if (data) {
        let teams = [];
        data.divisions.forEach((division: { [x: string]: any }) => {
          teams.push(...division["teams"]);
        });

        if (!wasLeagueActive(teams[0])) {
          if (year === new Date().getFullYear()) {
            return;
          }
          hasData = false;
          return;
        }
        stats = updateStats(teams, stats, year, leagueSettings);
      }
    });
    --year;
  }

  return stats;
};

const updateStandings = (result: string, standings: Standings): Standings => {
  switch (result) {
    case "WIN":
      standings.wins += 1;
      break;
    case "LOSE":
      standings.losses += 1;
      break;
    case "TIE":
      standings.ties = standings.ties ? standings.ties + 1 : 1;
      break;
    default:
      break;
  }

  return standings;
};

export const getH2H = async (
  leagueId: number,
  teamId: number
): Promise<H2HStats[]> => {
  let h2h: H2HStats[] = [];
  let year = new Date().getFullYear();
  let hasData = true;

  // TODO: fetch data concurrently
  while (hasData) {
    let week = 1;
    let hasMoreWeeks = true;
    while (hasMoreWeeks) {
      const params = `FetchLeagueScoreboard?sport=NFL&league_id=${leagueId}&season=${year}&scoring_period=${week}`;

      const url = `https://www.fleaflicker.com/api/${params}`;
      const data = await fetch(url).then(async (response) => {
        return await response.json();
      });

      if (!data.games || !wasLeagueActiveH2H(data.games[0])) {
        if (year !== new Date().getFullYear() && week === 1) {
          return h2h;
        } else {
          hasMoreWeeks = false;
          break;
        }
      }

      const games = data.games.filter(
        (game: any) => game.away.id === teamId || game.home.id === teamId
      );

      games.forEach((game: any) => {
        if (!game.homeResult || !game.awayResult) {
          hasMoreWeeks = false;
          return;
        }

        if (game.isConsolation) {
          return;
        }

        if (game.home.id === teamId) {
          let stats: H2HStats | undefined = h2h.find(
            (stats: H2HStats) => stats.teamId === game.away.id
          );
          if (stats) {
            let standings: Standings = stats.standings;

            stats.standings = updateStandings(game.homeResult, standings);
          } else {
            stats = {
              standings: updateStandings(game.homeResult, {
                wins: 0,
                losses: 0,
              }),
              teamName: game.away.name,
              teamId: game.away.id,
            };
            h2h.push(stats);
          }
        } else {
          let stats: H2HStats | undefined = h2h.find(
            (stats: H2HStats) => stats.teamId === game.home.id
          );
          if (stats) {
            stats.standings = updateStandings(game.awayResult, stats.standings);
          } else {
            stats = {
              standings: updateStandings(game.awayResult, {
                wins: 0,
                losses: 0,
              }),
              teamName: game.home.name,
              teamId: game.home.id,
            };
            h2h.push(stats);
          }
        }
      });
      week++;
    }
    --year;
  }

  return h2h;
};

const wasInThePlayoffs = (
  rank: number,
  leagueSettings: LeagueSettings
): boolean => {
  return rank < leagueSettings.numberOfPlayoffTeams;
};

const updateStats = (
  teams: any,
  stats: TeamStats[],
  year: number,
  leagueSettings: LeagueSettings
) => {
  teams.map((team: any) => {
    let teamStats: TeamStats | undefined = stats.find(
      (s) => s && s.id === team.id
    );
    if (!teamStats) {
      const ties = "ties" in team.recordOverall ? team.recordOverall.ties : 0;
      teamStats = {
        id: team.id,
        name: team.name,
        owner: team.owners[0].displayName,
        logoUrl: team.logoUrl,
        statsPerYear: [
          {
            year,
            rank: team.recordOverall.rank,
            pointsFor: team.pointsFor.value,
            regularSeason: {
              wins: team.recordOverall.wins ? team.recordOverall.wins : 0,
              losses: team.recordOverall.losses ? team.recordOverall.losses : 0,
              ties: ties,
            },
            postseason: {
              wins: wasInThePlayoffs(team.recordOverall.rank, leagueSettings)
                ? "wins" in team.recordPostseason
                  ? team.recordPostseason.wins
                  : 0
                : 0,
              losses: wasInThePlayoffs(team.recordOverall.rank, leagueSettings)
                ? "losses" in team.recordPostseason
                  ? team.recordPostseason.losses
                  : 0
                : 0,
            },
          },
        ],
        regularSeason: {
          wins: team.recordOverall.wins ? team.recordOverall.wins : 0,
          losses: team.recordOverall.losses ? team.recordOverall.losses : 0,
          ties: ties,
        },
        postseason: {
          wins: wasInThePlayoffs(team.recordOverall.rank, leagueSettings)
            ? "wins" in team.recordPostseason
              ? team.recordPostseason.wins
              : 0
            : 0,
          losses: wasInThePlayoffs(team.recordOverall.rank, leagueSettings)
            ? "losses" in team.recordPostseason
              ? team.recordPostseason.losses
              : 0
            : 0,
        },
      };
      stats.push(teamStats);
    } else {
      teamStats.statsPerYear?.push({
        year,
        rank: team.recordOverall.rank,
        pointsFor: team.pointsFor.value,
        regularSeason: {
          wins: "wins" in team.recordOverall ? team.recordOverall.wins : 0,
          losses:
            "losses" in team.recordOverall ? team.recordOverall.losses : 0,
          ties: "ties" in team.recordOverall ? team.recordOverall.ties : 0,
        },
        postseason: {
          wins: wasInThePlayoffs(team.recordOverall.rank, leagueSettings)
            ? "wins" in team.recordPostseason
              ? team.recordPostseason.wins
              : 0
            : 0,
          losses: wasInThePlayoffs(team.recordOverall.rank, leagueSettings)
            ? "losses" in team.recordPostseason
              ? team.recordPostseason.losses
              : 0
            : 0,
        },
      });

      teamStats.regularSeason.wins +=
        "wins" in team.recordOverall ? team.recordOverall.wins : 0;
      teamStats.regularSeason.losses +=
        "losses" in team.recordOverall ? team.recordOverall.losses : 0;
      teamStats.regularSeason.ties +=
        "ties" in team.recordOverall ? team.recordOverall.ties : 0;
      if (wasInThePlayoffs(team.recordOverall.rank, leagueSettings)) {
        teamStats.postseason.wins +=
          "wins" in team.recordPostseason ? team.recordPostseason.wins : 0;
        teamStats.postseason.losses +=
          "losses" in team.recordPostseason ? team.recordPostseason.losses : 0;
      }
    }

    return teamStats;
  });

  return stats;
};

export const getPlayersId = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/db_playerids.csv"
  );

  return csvToJson(await response.text());
};

export const getRosters = async (leagueId: number): Promise<Roster[]> => {
  let year = new Date().getFullYear();

  const params = `FetchLeagueRosters?sport=NFL&league_id=${leagueId}&season=${year}`;
  const url = `https://www.fleaflicker.com/api/${params}`;
  return await fetch(url).then(async (response): Promise<Roster[]> => {
    const data = await response.json();
    const rosters: Roster[] = [];
    data.rosters.forEach(async (roster: any) => {
      if (!roster?.players) return;

      roster.players = roster?.players.filter(
        (player: Player) => !(player.pos in ["QB", "RB", "WR", "TE"])
      );

      let players: Player[] = roster?.players?.map((player: any) => ({
        fleaflickerId: player.proPlayer.id,
        player: player.proPlayer.nameFull,
        pos: player.proPlayer.position,
        team: player.proPlayer.proTeam.abbreviation,
      }));

      rosters.push({
        teamId: roster.team.id,
        teamName: roster.team.name,
        players,
        picks: [],
      });
    });

    return rosters;
  });
};

export const getPlayers = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  let { columns, data } = csvToJson(await response.text());
  columns.push("str");
  data = data.map((player: any) => ({
    ...player,
    str: player.player + "/" + player.pos + "/" + player.team,
  }));
  return { columns, data };
};

export const getPlayer = async (leagueId: number, player: Player) => {
  const params = `FetchPlayerListing?sport=NFL&league_id=${leagueId}&filter.query=${player.player}&filter.position_eligibility=${player.pos}`;
  const url = `https://www.fleaflicker.com/api/${params}`;
  return await fetch(url).then(async (response) => {
    const data = await response.json();

    if (data?.players && data.players.length > 0) {
      return data.players[0];
    }
    return null;
  });
};

export const getPickOnTheClock = async (
  leagueId: number
): Promise<null | { round: number; slot: number; overall: number }> => {
  const params = `FetchLeagueDraftBoard?sport=NFL&league_id=${leagueId}`;
  const url = `https://www.fleaflicker.com/api/${params}`;
  return await fetch(url).then(async (response) => {
    const data = await response.json();

    if ("isInProgress" in data) {
      let otc = {
        round: 1,
        slot: 1,
        overall: 1,
      };

      let found = false;
      data.rows.forEach(
        (item: {
          round: number;
          cells: [
            player?: any,
            slot?: { slot?: number; overall: number; round: number }
          ];
        }) => {
          item.cells.forEach((cell: Cell) => {
            if ("onTheClock" in cell) {
              found = true;

              otc = {
                round: cell.slot?.round ?? 1,
                slot: cell.slot?.slot ?? 1,
                overall: cell.slot?.overall ?? 1,
              };
              return;
            }
          });

          if (found) {
            return;
          }
        }
      );

      return otc;
    }

    return null;
  });
};

export const getPicks = async (
  leagueId: number,
  teamId: number
): Promise<Pick[]> => {
  let picks: Pick[] = [];

  const filterYear = new Date().getFullYear() + 2;

  const currentPick = await getPickOnTheClock(leagueId);

  const params = `FetchTeamPicks?sport=NFL&league_id=${leagueId}&team_id=${teamId}`;
  const url = `https://www.fleaflicker.com/api/${params}`;
  await fetch(url).then(async (response) => {
    const data = await response.json();

    if (data?.picks) {
      data?.picks.forEach((pick: any) => {
        if (pick.season <= filterYear) {
          if (pick.ownedBy.id !== teamId) {
            // original pick with different owner
            return;
          }
          if (
            pick.season == new Date().getFullYear() &&
            currentPick &&
            pick.slot.overall < currentPick.overall
          ) {
            //draft in progress, picks should be ignored as selected player is already in roster
            return;
          }

          picks.push({
            originalOwner: pick.originalOwner?.id ?? undefined,
            originalOwnerName: pick.originalOwner?.name ?? undefined,
            ownedByName: pick.ownedBy.name,
            ownedBy: pick.ownedBy.id,
            slot: pick.slot.slot,
            overall: pick.slot.overall,
            round: pick.slot.round,
            traded: pick.traded ?? false,
            season: pick.season,
          });
        }
      });
    }
  });

  return picks;
};

export const getRostersValues = async (
  leagueId: number
): Promise<RosterValue[]> => {
  const leagueSettings = await getLeagueSettings(leagueId);

  let rosters = await getRosters(leagueId);

  const players = await getPlayers();

  rosters = rosters.map((roster: Roster) => {
    return {
      ...roster,
      players: roster.players.map((playerInRoster: Player) => {
        const result = searchPlayer(playerInRoster, players.data);

        if (!result || !result.player) {
          return {
            player: playerInRoster.player,
            pos: playerInRoster.pos,
            team: playerInRoster.team,
            age: "NA",
            draft_year: "NA",
            ecr_1qb: null,
            ecr_2qb: null,
            ecr_pos: null,
            value_1qb: 1,
            value_2qb: 1,
            scrape_date: "NA",
            fp_id: "NA",
          };
        }
        return result.player;
      }),
    };
  });

  const result = await Promise.all(
    rosters.map(
      async (roster: Roster) =>
        await getRosterValue(roster, leagueId, leagueSettings, players.data)
    )
  );

  result.sort(
    (a: RosterValue, b: RosterValue) => b.value.total - a.value.total
  );

  return result;
};

const getRosterValue = async (
  roster: Roster,
  leagueId: number,
  leagueSettings: LeagueSettings,
  players: Player[]
): Promise<RosterValue> => {
  const value: TotalValue = {
    total: 0,
    totalQB: 0,
    totalRB: 0,
    totalWR: 0,
    totalTE: 0,
    totalPicks: 0,
  };

  roster?.players?.forEach((currentValue: Player) => {
    const playerValue = getPlayerValue(currentValue, leagueSettings.format);
    switch (currentValue.pos) {
      case "QB":
        value.totalQB += playerValue;
        break;
      case "RB":
        value.totalRB += playerValue;
        break;
      case "WR":
        value.totalWR += playerValue;
        break;
      case "TE":
        value.totalTE += playerValue;
        break;
      default:
        break;
    }
    value.total += playerValue;
  });

  const picks = await getPicks(leagueId, roster.teamId);

  let currentYear = new Date().getFullYear();
  picks.forEach((pick: Pick) => {
    let pickStr = pick.season + " " + getRound(pick.round);
    if (pick.season === currentYear) {
      const round = Math.ceil(pick.overall / 12);
      const slot = pick.overall % 12 !== 0 ? pick.overall % 12 : 12;
      pickStr = pick.season + " Pick " + round + "." + pad(slot, 2);
    }

    const pickValue = players.filter(
      (player: Player) => player.player === pickStr
    );

    if (pickValue && pickValue.length > 0) {
      pick.value = getPlayerValue(pickValue[0], leagueSettings.format);
      value.totalPicks += pick.value;
      value.total += pick.value;
    } else {
      pick.value = 1;
      value.totalPicks += 1;
      value.total += 1;
    }
  });

  roster.picks = picks;

  return {
    roster,
    value,
  };
};
