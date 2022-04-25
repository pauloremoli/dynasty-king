import React from "react";
import { TeamStats } from "~/types/TeamStats";

interface AllTimeRecordProps {
  teamStats: TeamStats[];
}
const AllTimeRecord: React.FC<AllTimeRecordProps> = ({ teamStats }) => {
  return (
    <div className="flex flex-col items-start px-8">
      <h1 className="font-semibold text-xl text-blue-400 pb-6">
        All Time Record
      </h1>
      {teamStats.map((teamStat: TeamStats, index: number) => {
        return (
          <div key={teamStat.id} className="flex flex-col pb-6">
            <div className="flex gap-1 text-lg font-semibold">
              <span className="font-semibold dark:text-blue-400">
                {index + 1 + " - "}
              </span>
              <p>{teamStat.name}</p>
            </div>
            <div className="flex gap-2 py-2">
              <p>Regular Season:</p>
              <p className="text-green-200">{teamStat.regularSeason.wins}W</p>
              {teamStat.regularSeason.ties !== 0 && (
                <p className="text-gray-200">{teamStat.regularSeason.ties}T</p>
              )}
              <p className="text-red-200">{teamStat.regularSeason.losses}L</p>
              <p className="pl-8">Postseason:</p>
              <p className="text-green-200">{teamStat.postseason.wins}W</p>
              <p className="text-red-200">{teamStat.postseason.losses}L</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTimeRecord;
