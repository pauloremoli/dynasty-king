import React from "react";
import { TeamStats } from "~/types/TeamStats";
import Standings from "./Standings";
import StandingsChart from "./StandingsChart";

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
    <div className="flex flex-col items-start mb-10 dark:text-gray-100 font-light">
      <h1 className="font-semibold text-xl text-blue-400 pb-6">
        All Time Record - Regular Season
      </h1>
      <StandingsChart teamStats={stats} isPostseason={false} />
    </div>
  );
};

export default AllTimeRecordRegularSeason;
