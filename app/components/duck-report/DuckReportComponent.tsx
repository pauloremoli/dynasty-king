import React from "react";
import { LeagueSettings } from "~/types/LeagueSettings";
import { TeamStats } from "~/types/TeamStats";
import AllTimeRecordPostseason from "./AllTimeRecordPostseason";
import AllTimeRecordRegularSeason from "./AllTimeRecordRegularSeason";
import YearlyFinish from "./YearlyFinish";

interface DuckReportProps {
  stats: TeamStats[];
  leagueSettings: LeagueSettings;
}
const DuckReportComponent: React.FC<DuckReportProps> = ({
  stats,
  leagueSettings,
}) => {
  return (
    <>
      {stats.length > 0 ? (
        <div>
          <YearlyFinish teamStats={stats} leagueSettings={leagueSettings} />
          <div className="flex justify-between w-full gap-8">
            <AllTimeRecordRegularSeason teamStats={stats} />
            <AllTimeRecordPostseason teamStats={stats} />
          </div>
        </div>
      ) : (
        <p className="text-xl">No data to show</p>
      )}
    </>
  );
};

export default DuckReportComponent;
