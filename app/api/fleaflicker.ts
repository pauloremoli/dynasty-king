import { json } from "@remix-run/node";
import { Team } from "~/types/Team";
import { SeasonStats, TeamStats } from "~/types/TeamStats";

interface ActionData {
  errors?: {
    email?: string;
  };
}

function wasLeagueActive(team: any) {
  return team?.recordOverall.hasOwnProperty("wins");
}

const sortByMostWins = (first: TeamStats, second: TeamStats) => {
  if (first.regularSeason.wins > second.regularSeason.wins) {
    return -1;
  }
  if (first.regularSeason.wins < second.regularSeason.wins) {
    return 1;
  }
  if (
    first.regularSeason.wins === second.regularSeason.wins &&
    (first.regularSeason.ties ? first.regularSeason.ties : 0) >
      (second.regularSeason.ties ? second.regularSeason.ties : 0)
  ) {
    return -1;
  }

  if (
    first.regularSeason.wins === second.regularSeason.wins &&
    (first.regularSeason.ties ? first.regularSeason.ties : 0) <
      (second.regularSeason.ties ? second.regularSeason.ties : 0)
  ) {
    return 1;
  }
  return 0;
};

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
  console.log(url);

  return await fetch(url)
    .then(async (response) => {
      const data = await response.json();
      console.log(data);

      return data;
    })
    .catch((error) => {
      return json<ActionData>(
        { errors: { email: "Could not find any league for this email" } },
        { status: 400 }
      );
    });
};

export const getStats = async function get_stats(leagueId: number) {
  let stats: TeamStats[] = [];
  let year = new Date().getFullYear();

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
        stats = updateStats(teams, stats, year);
      }
    });
    --year;
  }

  stats = stats.sort(sortByMostWins);

  return stats;
};

const updateStats = (teams: any, stats: TeamStats[], year: number) => {
  
  teams.map((team: any) => {
    let teamStats: TeamStats | undefined = stats.find((s) => s && s.id === team.id);
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
              wins: team.recordOverall.wins,
              losses: team.recordOverall.losses,
              ties: ties,
            },
            postseason: {
              wins:
                "wins" in team.recordPostseason
                  ? team.recordPostseason.wins
                  : 0,
              losses:
                "losses" in team.recordPostseason
                  ? team.recordPostseason.losses
                  : 0,
            },
          },
        ],
        regularSeason: {
          wins: team.recordOverall.wins,
          losses: team.recordOverall.losses,
          ties: ties,
        },
        postseason: {
          wins:
            "wins" in team.recordPostseason ? team.recordPostseason.wins : 0,
          losses:
            "losses" in team.recordPostseason
              ? team.recordPostseason.losses
              : 0,
        },
      };
      stats.push(teamStats);
    } else {
      const ties = "ties" in team.recordOverall ? team.recordOverall.ties : 0;

      teamStats.statsPerYear?.push({
        year,
        rank: team.recordOverall.rank,
        pointsFor: team.pointsFor.value,
        regularSeason: {
          wins: team.recordOverall.wins,
          losses: team.recordOverall.losses,
          ties: ties,
        },
        postseason: {
          wins:
            "wins" in team.recordPostseason ? team.recordPostseason.wins : 0,
          losses:
            "losses" in team.recordPostseason
              ? team.recordPostseason.losses
              : 0,
        },
      });

      teamStats.regularSeason.wins += team.recordOverall.wins;
      teamStats.regularSeason.losses += team.recordOverall.losses;
      teamStats.regularSeason.ties += ties;
      teamStats.postseason.wins +=
        "wins" in team.recordPostseason ? team.recordPostseason.wins : 0;
      teamStats.postseason.losses +=
        "losses" in team.recordPostseason ? team.recordPostseason.losses : 0;
    }
    return teamStats;
  });
  return stats;
};
