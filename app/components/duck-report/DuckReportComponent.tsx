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

  if (!stats || stats.length === 0)
    return (
      <div>
        <p className="text-white text-2xl text-center">No data available</p>
      </div>
    );
  return (
    <>
      <div className="p-4">
        <YearlyFinish teamStats={stats} leagueSettings={leagueSettings} />
        <div className="flex flex-col justify-between w-full gap-8">
          <AllTimeRecordRegularSeason teamStats={stats} charts={charts} />
          <AllTimeRecordPostseason teamStats={stats} charts={charts} />
        </div>
      </div>
    </>
  );
};

export default DuckReportComponent;
