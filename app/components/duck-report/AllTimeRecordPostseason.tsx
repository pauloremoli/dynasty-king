import React from "react";
import { TeamStats } from "~/types/TeamStats";
import Standings from "./Standings";
import StandingsChart from "./StandingsChart";
import StandingsChartV from "./StandingsChartV";

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
}
const AllTimeRecordPostseason: React.FC<AllTimeRecordPostseasonProps> = ({
  teamStats,
}) => {
  teamStats = teamStats.filter(
    (team: TeamStats) =>
      team.postseason.wins !== 0 || team.postseason.losses !== 0
  );
  const stats = teamStats.sort(sortByMostWins);
  return (
    <div className="flex flex-col items-start mb-10 dark:text-gray-100 font-light ">
      <h1 className="font-semibold text-xl text-blue-400 pb-6 ">
        All Time Record - Postseason
      </h1>
      <StandingsChart teamStats={teamStats} isPostseason={true} />
    </div>
  );
};

export default AllTimeRecordPostseason;
