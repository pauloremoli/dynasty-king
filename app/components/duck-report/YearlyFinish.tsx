import React from "react";
import { LeagueSettings } from "~/types/LeagueSettings";
import { StatsPerYear, TeamStats } from "~/types/TeamStats";
import YearlyFinishItem, { StatsFilteredPerRank } from "./YearlyFinishItem";

const sortByMostTimes = (
  first: StatsFilteredPerRank,
  second: StatsFilteredPerRank
) => {
  if (first.finish!.length > second.finish!.length) {
    return -1;
  }
  if (first.finish!.length < second.finish!.length) {
    return 1;
  }
  return 0;
};

const filterByRank = (
  teamStats: TeamStats[],
  position: number
): StatsFilteredPerRank[] => {
  const statsFilteredPerRank: StatsFilteredPerRank[] = teamStats.map(
    (teamStat: TeamStats) => {
      const finish = teamStat.statsPerYear?.filter(
        (yearStat: StatsPerYear) => yearStat.rank === position
      );
      return { name: teamStat.name, finish };
    }
  );

  const filtered = statsFilteredPerRank.filter(
    (statsFilteredPerRank: StatsFilteredPerRank) =>
      statsFilteredPerRank.finish?.length !== 0
  );

  return filtered.sort(sortByMostTimes);
};

const filterByPlayoffAppearance = (
  teamStats: TeamStats[],
  playoffTeams: number
): StatsFilteredPerRank[] => {
  const statsFilteredPerRank: StatsFilteredPerRank[] = teamStats.map(
    (teamStat: TeamStats) => {
      const finish = teamStat.statsPerYear?.filter(
        (yearStat: StatsPerYear) =>
          yearStat.rank < teamStats.length - playoffTeams
      );
      return { name: teamStat.name, finish };
    }
  );

  const filtered = statsFilteredPerRank.filter(
    (statsFilteredPerRank: StatsFilteredPerRank) =>
      statsFilteredPerRank.finish?.length !== 0
  );

  return filtered.sort(sortByMostTimes);
};

interface YearlyFinishProps {
  teamStats: TeamStats[];
  leagueSettings: LeagueSettings;
}

const YearlyFinish: React.FC<YearlyFinishProps> = ({
  teamStats,
  leagueSettings,
}) => {
  const titles = filterByRank(teamStats, 1);
  const secondPlaces = filterByRank(teamStats, 2);
  const thirdPlaces = filterByRank(teamStats, 3);
  const playoffAppearances = filterByPlayoffAppearance(
    teamStats,
    leagueSettings.numberOfPlayoffTeams
  );
  const last = filterByRank(teamStats, 12);

  return (
    <div className="flex flex-col w-full dark:text-white font-light  ">
      <div className="flex flex-col md:flex-row md:gap-20 w-full justify-start md:pb-8 dark:text-white font-light items-start ">
        <div className="flex flex-col justify-center pb-8">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            League Winners
          </h1>
          {titles.map((stats: StatsFilteredPerRank, index: number) => (
            <div key={"first" + index}>
              <YearlyFinishItem stats={stats} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-20 w-full justify-between pb-8 dark:text-white font-light  ">
        <div className="flex flex-col pb-8">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            2nd place
          </h1>
          {secondPlaces.map((stats: StatsFilteredPerRank, index: number) => (
            <div key={"second" + index}>
              <YearlyFinishItem stats={stats} index={index} />
            </div>
          ))}
        </div>
        <div className="flex flex-col pb-8">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            3rd place
          </h1>
          {thirdPlaces.map((stats: StatsFilteredPerRank, index: number) => (
            <div key={"third" + index}>
              <YearlyFinishItem stats={stats} index={index} />
            </div>
          ))}
        </div>
        <div className="flex flex-col pb-8">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            Last place
          </h1>
          {last.map((stats: StatsFilteredPerRank, index: number) => (
            <div key={"last" + index}>
              <YearlyFinishItem stats={stats} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-20 w-full justify-start pb-8 dark:text-white font-light  ">
        <div className="flex flex-col justify-center pb-8">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            Playoff appearances
          </h1>
          {playoffAppearances.map(
            (stats: StatsFilteredPerRank, index: number) => (
              <div key={"first" + index}>
                <YearlyFinishItem stats={stats} index={index} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default YearlyFinish;
