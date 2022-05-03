import { useLoaderData } from "@remix-run/react";
import { default as React, default as React } from "react";
import { getStats } from "~/api/fleaflicker";
import AllTimeRecordPostseason from "~/components/duck-report/AllTimeRecordPostseason";
import AllTimeRecord from "~/components/duck-report/AllTimeRecordRegularSeason";
import Top3 from "~/components/duck-report/Top3";
import { TeamStats } from "~/types/TeamStats";

export const loader: LoaderFunction = async ({ params }) => {
  const { league } = params;
  const leagueId = parseInt(league);
  const stats = await getStats(leagueId);

  return { stats };
};

const LeagueIndex: React.FC<{}> = () => {
  const { stats } = useLoaderData();

  return (
    <div>
      {stats ? (
        <div>
          <Top3 teamStats={stats} />
          <div className="flex justify-between w-full gap-8">
            <AllTimeRecord teamStats={stats} />
            <AllTimeRecordPostseason teamStats={stats} />
          </div>
        </div>
      ) : (
        "No data"
      )}
    </div>
  );
};

export default LeagueIndex;
