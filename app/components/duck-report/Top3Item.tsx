import React from "react";
import { StatsPerYear } from "~/types/TeamStats";

export type StatsFilteredPerRank = {
  name: string;
  finish?: StatsPerYear[];
};

interface Top3ItemProps {
  stats: StatsFilteredPerRank;
  index: number;
}

const Top3Item: React.FC<Top3ItemProps> = ({ stats, index }) => {
  return (
    <div key={stats.name} className="flex flex-col rounded-lg w-full mb-2 ">
      <div className="flex gap-1 text-lg  text-[#caf0f8]">
        <p>{index + 1 + " - "}</p>
        <p>{stats.name}</p>
        <div className="flex">
          (
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

export default Top3Item;
