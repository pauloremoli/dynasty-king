import React from "react";
import { TeamStats } from "~/types/TeamStats";

const sortByMostWins = (first: TeamStats, second: TeamStats) => {
  if (first.postseason.wins > second.postseason.wins) {
    return -1;
  }
  if (first.postseason.wins < second.postseason.wins) {
    return 1;
  }
  if (
    first.postseason.wins === second.postseason.wins &&
    (first.postseason.losses ? first.postseason.losses : 0) >
      (second.postseason.losses ? second.postseason.losses : 0)
  ) {
    return -1;
  }

  if (
    first.postseason.wins === second.postseason.wins &&
    (first.postseason.losses ? first.postseason.losses : 0) <
      (second.postseason.losses ? second.postseason.losses : 0)
  ) {
    return 1;
  }
  return 0;
};

interface AllTimeRecordPostseasonProps {
  teamStats: TeamStats[];
}
const AllTimeRecordPostseason: React.FC<AllTimeRecordPostseasonProps> = ({
  teamStats,
}) => {
  const stats = teamStats.sort(sortByMostWins);
  return (
    <div className="flex flex-col items-start px-8 pb-10 text-[#caf0f8] font-light">
      <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
        All Time Record Postseason
      </h1>
      {stats.map((teamStat: TeamStats, index: number) => {
        return (
          <div
            key={teamStat.id}
            className="flex flex-col rounded-lg w-full mb-2 "
          >
            <div className="flex gap-1 text-lg  text-[#caf0f8]">
              <p>{index + 1 + " - "}</p>
              <p>{teamStat.name}</p>
              <p className="flex flex-col pl-2">( {teamStat.owner} )</p>
              <p className="text-green-200 pl-3">{teamStat.postseason.wins}W</p>
              <p className="text-red-200 pl-3">{teamStat.postseason.losses}L</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTimeRecordPostseason;
