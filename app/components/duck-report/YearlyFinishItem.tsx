import React from "react";
import { StatsPerYear } from "~/types/TeamStats";

export type StatsFilteredPerRank = {
  name: string;
  finish?: StatsPerYear[];
};

interface YearlyFinishItemProps {
  stats: StatsFilteredPerRank;
  index: number;
}

const YearlyFinishItem: React.FC<YearlyFinishItemProps> = ({
  stats,
  index,
}) => {
  return (
    <div key={stats.name} className="flex flex-col rounded-lg w-full mb-2 ">
      <div className="flex  text-lg  dark:text-gray-100">
        <div key={stats.name} className="flex flex-wrap gap-3">
          <div className="flex gap-1">
            <p>{stats.finish!.length}</p>
            <p>-</p>

            <p>{stats.name}</p>
          </div>
          <div className="flex">
            {stats.finish?.map((statsPerYear: StatsPerYear, index: number) => (
              <p
                key={stats.name + statsPerYear.year}
                className={`dark:text-blue-300 ${
                  index !== stats.finish!.length - 1 ? "pr-1" : ""
                }`}
              >
                {index !== stats.finish!.length - 1
                  ? statsPerYear.year + ","
                  : statsPerYear.year}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyFinishItem;
