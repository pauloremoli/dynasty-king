import React, { useState } from "react";
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
  const [charts, setCharts] = useState(true);
  return (
    <>
      {stats.length > 0 ? (
        <div className="p-4">
          <YearlyFinish teamStats={stats} leagueSettings={leagueSettings} />
          <div className="flex flex-col justify-between w-full gap-8">
            <AllTimeRecordRegularSeason teamStats={stats} charts={charts} />
            <AllTimeRecordPostseason teamStats={stats} charts={charts} />
          </div>
        </div>
      ) : (
        <p className="text-xl">No data to show</p>
      )}
    </>
  );
};

export default DuckReportComponent;
