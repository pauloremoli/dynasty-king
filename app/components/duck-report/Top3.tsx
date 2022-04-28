import React from "react";
import { StatsPerYear, TeamStats } from "~/types/TeamStats";
import Top3Item, { StatsFilteredPerRank } from "./Top3Item";

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

interface Top3Props {
  teamStats: TeamStats[];
}

const Top3: React.FC<Top3Props> = ({ teamStats }) => {
  console.log(teamStats);
  const titles = filterByRank(teamStats, 1);
  const secondPlaces = filterByRank(teamStats, 2);
  const thirdPlaces = filterByRank(teamStats, 3);

  return (
    <div className="flex flex-col w-full items-start mb-10 dark:text-[#caf0f8] font-light  ">
      <div className="flex flex-col pb-10">
        <h1 className="font-semibold text-xl text-blue-400 pb-6 ">Champions</h1>
        {titles.map((stats: StatsFilteredPerRank, index: number) => (
          <div key={"first" + index}>
            <Top3Item stats={stats} index={index} />
          </div>
        ))}
      </div>

      <div className="flex md:gap-20 w-full items-start mb-10 dark:text-[#caf0f8] font-light  ">
        <div className="flex flex-col pb-10">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            2nd place
          </h1>
          {secondPlaces.map((stats: StatsFilteredPerRank, index: number) => (
            <div key={"second" + index}>
              <Top3Item stats={stats} index={index} />
            </div>
          ))}
        </div>
        <div className="flex flex-col pb-10">
          <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
            3rd place
          </h1>
          {thirdPlaces.map((stats: StatsFilteredPerRank, index: number) => (
            <div key={"thrid" + index}>
              <Top3Item stats={stats} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top3;
