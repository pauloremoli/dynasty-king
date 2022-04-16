function wasLeagueActive(team) {
  return team?.recordOverall.hasOwnProperty("wins");
}

export const getTeams = async (email) => {
  let teams = [];
  let year = new Date().getFullYear();
  console.log(`Year: ${year}`);
  const params = `FetchUserLeagues?sport=NFL&email=${email}&season=${year}`;
  const url = `https://www.fleaflicker.com/api/${params}`;

  console.log(url);

  await fetch(url)
    .then(async (response) => {
      const data = await response.json();

      const leagues = data.leagues;
      teams = leagues.map((league: any) => {
        return {
          league_id: league.id,
          league_name: league.name,
          team_id: league.ownedTeam.id,
          team_name: league.ownedTeam.name,
        };
      });
    })
    .catch((error) => {
      console.log(error);
      return "nok";
    });

  return { teams };
};

export const getStats = async function get_stats(league_id) {
  let stats = [];
  let year = new Date().getFullYear();

  let hasData = true;
  while (hasData) {
    console.log(`Year: ${year}`);
    const params = `FetchLeagueStandings?sport=NFL&league_id=${league_id}&season=${year}`;

    const url = `https://www.fleaflicker.com/api/${params}`;
    await fetch(url).then(async (response) => {
      const data = await response.json();

      if (data) {
        let teams = [];
        data.divisions.forEach((division) => {
          teams.push(...division["teams"]);
        });

        if (!wasLeagueActive(teams[0])) {
          if (year === new Date().getFullYear()) {
            console.log("season not started", year);
            return;
          }
          hasData = false;
          console.log("hasData false", year);
          return;
        }

        console.log(stats);

        stats = updateStats(teams, stats, year);

        console.log(stats.slice(0, 1));
        // console.log(year, stats);
      }
    });
    --year;
  }
};

const updateStats = (teams, stats, year) => {
  teams.map((team) => {
    let teamStats = stats[team.name];
    if (!teamStats) {
      const ties = "ties" in team.recordOverall ? team.recordOverall.ties : 0;
      teamStats = {
        name: team.name,
        logoUrl: team.logoUrl,
        seasonStats: {
          [year]: {
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
        },
        id: team.id,
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
    } else {
      const ties = "ties" in team.recordOverall ? team.recordOverall.ties : 0;

      console.log("already has data", teamStats);

      teamStats.seasonStats[year] = {
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
      };
      teamStats.seasonStats[year].regularSeason.wins = team.recordOverall.wins;
      teamStats.seasonStats[year].regularSeason.losses =
        team.recordOverall.losses;
      teamStats.seasonStats[year].regularSeason.ties = ties;
      teamStats.seasonStats[year].postseason.wins =
        "wins" in team.recordPostseason ? team.recordPostseason.wins : 0;
      teamStats.seasonStats[year].postseason.losses =
        "losses" in team.recordPostseason ? team.recordPostseason.losses : 0;
      teamStats.regularSeason.wins += team.recordOverall.wins;
      teamStats.regularSeason.losses += team.recordOverall.losses;
      teamStats.regularSeason.ties += ties;
      teamStats.postseason.wins +=
        "wins" in team.recordPostseason ? team.recordPostseason.wins : 0;
      teamStats.postseason.losses +=
        "losses" in team.recordPostseason ? team.recordPostseason.losses : 0;
    }
    stats[team.name] = teamStats;
  });
  return stats;
};
