import React from "react";
import { TeamStats } from "~/types/TeamStats";
import AllTimeRecordPostseason from "./AllTimeRecordPostseason";
import AllTimeRecordRegularSeason from "./AllTimeRecordRegularSeason";
import YearlyFinish from "./YearlyFinish";

interface DuckReportProps {
  stats: TeamStats[];
}
const DuckReportComponent: React.FC<DuckReportProps> = ({ stats }) => {
  console.log(stats);

  return (
    <>
      {stats.length > 0 ? (
        <div>
          <YearlyFinish teamStats={stats} />
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
