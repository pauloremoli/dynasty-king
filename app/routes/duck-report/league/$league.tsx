import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStats } from "~/api/fleaflicker";
import DuckReport from "~/components/duck-report/DuckReportComponent";

export const loader: LoaderFunction = async ({ params }) => {
  const { league } = params;
  if (!league) {
    throw new Response("Missing parameter league", { status: 404 });
  }
  const leagueId = parseInt(league);
  const stats = await getStats(leagueId);

  return { stats };
};

const LeagueIndex: React.FC<{}> = () => {
  const { stats } = useLoaderData();

  return (
    <div>
      <DuckReport stats={stats} />
    </div>
  );
};

export default LeagueIndex;
