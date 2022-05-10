import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLeagueSettings, getStats } from "~/api/fleaflicker";
import DuckReport from "~/components/duck-report/DuckReportComponent";

export const loader: LoaderFunction = async ({ params }) => {
  const { leagueId } = params;
  if (!leagueId) {
    throw new Response("Missing parameter league", { status: 404 });
  }
  const leagueSettings = await getLeagueSettings(leagueId);

  const stats = await getStats(parseInt(leagueId));

  return { stats, leagueSettings };
};

const LeagueIndex: React.FC<{}> = () => {
  const { stats, leagueSettings } = useLoaderData();

  return (
    <div>
      <DuckReport stats={stats} leagueSettings={leagueSettings} />
    </div>
  );
};

export default LeagueIndex;
