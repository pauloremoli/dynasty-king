import React from "react";
import { TeamStats } from "~/types/TeamStats";
import Standings from "./Standings";
import StandingsChart from "./StandingsChart";

interface AllTimeRecordRegularSeasonProps {
  teamStats: TeamStats[];
  charts: boolean;
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
  charts,
}) => {
  const stats = teamStats.sort(sortByMostWins);
  return (
    <div className="flex flex-col items-start mb-10 dark:text-gray-100 font-light">
      <h1 className="font-semibold text-xl text-blue-400 pb-6">
        All Time Record - Regular Season
      </h1>
      {charts ? (
        <StandingsChart teamStats={teamStats} isPostseason={false} />
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

export default AllTimeRecordRegularSeason;
