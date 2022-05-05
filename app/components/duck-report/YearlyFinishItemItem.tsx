import React from "react";
import { StatsPerYear } from "~/types/TeamStats";

export type StatsFilteredPerRank = {
  name: string;
  finish?: StatsPerYear[];
};

interface YearlyFinishItemItemProps {
  stats: StatsFilteredPerRank;
  index: number;
}

const YearlyFinishItem: React.FC<YearlyFinishItemItemProps> = ({
  stats,
  index,
  showIndex,
}) => {
  return (
    <div key={stats.name} className="flex flex-col rounded-lg w-full mb-2 ">
      <div className="flex gap-1 text-lg  text-gray-100">
        <div key={stats.name} className="flex gap-1">
          <p>{stats.finish!.length}</p>
          <p>-</p>
          <p>{stats.name}</p>(
          {stats.finish?.map((statsPerYear: StatsPerYear, index: number) => (
            <p
              key={stats.name + statsPerYear.year}
              className={`${index !== stats.finish!.length - 1 ? "pr-1" : ""}`}
            >
              {index !== stats.finish!.length - 1
                ? statsPerYear.year + ","
                : statsPerYear.year}
            </p>
          ))}
          )
        </div>
      </div>
    </div>
  );
};

export default YearlyFinishItem;
