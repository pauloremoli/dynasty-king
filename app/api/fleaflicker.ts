import { csvToJson } from './../utils/csvToJson';
import { PlayerPosition } from '../types/Roster';
import { json } from "@remix-run/node";
import { Team } from "~/types/Team";
import { H2HStats, Standings, TeamStats } from "~/types/TeamStats";
import { LeagueSettings } from "~/types/LeagueSettings";
import { Roster } from "~/types/Roster";

interface ActionData {
  errors?: {
    email?: string;
  };
}

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
      return json<ActionData>(
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
      return json<ActionData>(
        { errors: { email: "Could not find any league for this email" } },
        { status: 400 }
      );
    });
};

export const getLeagueSettings = async (
  leagueId: number
): Promise<LeagueSettings> => {
  const url = `https://www.fleaflicker.com/nfl/leagues/${leagueId}/rules`;
  const rules: LeagueSettings = await fetch(url).then(async (response) => {
    const page = await response.text();
    const pos = page.search("Weeks:");
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

    return { numberOfPlayoffTeams, firstWeek, lastWeek };
  });
  return rules;
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
): Promise<H2HStats> => {
  let h2h: H2HStats = {};
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
        if (game.home.id === teamId) {
          if (h2h.hasOwnProperty(game.away.id)) {
            let standings: Standings = h2h[game.away.id].standings;
            h2h[game.away.id].standings = updateStandings(
              game.homeResult,
              standings
            );
          } else {
            let standings: Standings = { wins: 0, losses: 0 };
            h2h[game.away.id] = {
              standings: updateStandings(game.homeResult, standings),
              teamName: game.away.name,
            };
          }
        } else {
          if (h2h.hasOwnProperty(game.home.id)) {
            let standings: Standings = h2h[game.home.id].standings;
            h2h[game.home.id].standings = updateStandings(
              game.awayResult,
              standings
            );
          } else {
            let standings: Standings = { wins: 0, losses: 0 };
            h2h[game.home.id] = {
              standings: updateStandings(game.awayResult, standings),
              teamName: game.home.name,
            };
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
      console.log(
        "rank",
        team.recordOverall.rank,
        team.name,
        year,
        leagueSettings
      );

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
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  return csvToJson(await response.text());
} 

export const getPowerRanking = async (leagueId: number) => {
  let year = new Date().getFullYear();



  const params = `FetchLeagueRosters?sport=NFL&league_id=${leagueId}&season=${year}`;
  const url = `https://www.fleaflicker.com/api/${params}`;
  return await fetch(url).then(async (response) => {
    const data = await response.json();
    const powerRanking : Roster[] = []; 
    data.rosters.forEach((roster: any) => {
      const players = roster.players.map((player: any) => ({id: player.proPlayer.id, name: player.proPlayer.nameFull, position: player.proPlayer.position}))
      console.log(roster.team.id, roster.team.name, players);
      powerRanking.push({teamId: roster.team.id, teamName: roster.team.name, players}) 
    });

    return powerRanking;
  });
};
