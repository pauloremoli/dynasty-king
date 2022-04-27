import React from "react";
import { TeamStats } from "~/types/TeamStats";

interface AllTimeRecordRegularSeasonProps {
  teamStats: TeamStats[];
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

const AllTimeRecordRegularSeason: React.FC<AllTimeRecordRegularSeasonProps> = ({
  teamStats,
}) => {
  const stats = teamStats.sort(sortByMostWins);
  return (
    <div className="flex flex-col items-start px-8 pb-10 dark:text-[#caf0f8]  font-light">
      <h1 className="font-semibold text-xl text-blue-400 pb-6">
        All Time Record Regular Season
      </h1>
      {stats.map((teamStat: TeamStats, index: number) => {
        return (
          <div key={teamStat.id} className="flex gap-1 rounded-lg w-full mb-1 ">
            <div className="flex gap-1 text-lg ">
              <p className=" dark:text-[#caf0f8] ">
                {index + 1 + " - "}
              </p>
              <p>{teamStat.name}</p>
              <p className="flex flex-col pl-2">({teamStat.owner})</p>
              <p className="text-green-200 pl-3">
                {teamStat.regularSeason.wins}W
              </p>
              {teamStat.regularSeason.ties !== 0 && (
                <p className="pl-3">
                  {teamStat.regularSeason.ties}T
                </p>
              )}
              <p className="text-red-200 pl-3">
                {teamStat.regularSeason.losses}L
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTimeRecordRegularSeason;
