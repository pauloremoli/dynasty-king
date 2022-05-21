import React from "react";
import { TeamStats } from "~/types/TeamStats";
import Standings from "./Standings";
import StandingsChart from "./StandingsChart";

const sortByMostWins = (first: TeamStats, second: TeamStats) => {
  if (first.postseason.wins > second.postseason.wins) {
    return -1;
  }
  if (first.postseason.wins < second.postseason.wins) {
    return 1;
  }
  if (
    first.postseason.wins === second.postseason.wins &&
    (first.postseason.losses ? first.postseason.losses : 0) <
      (second.postseason.losses ? second.postseason.losses : 0)
  ) {
    return -1;
  }

  if (
    first.postseason.wins === second.postseason.wins &&
    (first.postseason.losses ? first.postseason.losses : 0) >
      (second.postseason.losses ? second.postseason.losses : 0)
  ) {
    return 1;
  }
  return 0;
};

interface AllTimeRecordPostseasonProps {
  teamStats: TeamStats[];
  charts: boolean;
}
const AllTimeRecordPostseason: React.FC<AllTimeRecordPostseasonProps> = ({
  teamStats,
  charts,
}) => {
  const stats = teamStats.sort(sortByMostWins);
  return (
    <div className="flex flex-col items-start mb-10 dark:text-gray-100 font-light ">
      <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
        All Time Record - Postseason
      </h1>
      {charts ? (
        <StandingsChart teamStats={teamStats} isPostseason={true} />
      ) : (
        stats.map((teamStat: TeamStats, index: number) => (
          <div key={index}>
            <Standings
              name={teamStat.name}
              wins={teamStat.postseason.wins}
              losses={teamStat.postseason.losses}
              owner={teamStat.owner}
              index={index + 1}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default AllTimeRecordPostseason;
