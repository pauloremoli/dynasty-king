import React from "react";
import { TeamStats } from "~/types/TeamStats";
import Record from "./Record";

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
    <div className="flex flex-col items-start mb-10 dark:text-[#caf0f8] font-light ">
      <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
        All Time Record Postseason
      </h1>
      {stats.map((teamStat: TeamStats, index: number) => (
        <div key={index}>
          <Record
            name={teamStat.name}
            wins={teamStat.postseason.wins}
            losses={teamStat.postseason.losses}
            owner={teamStat.owner}
            index={index + 1}
          />
        </div>
      ))}
    </div>
  );
};

export default AllTimeRecordPostseason;
