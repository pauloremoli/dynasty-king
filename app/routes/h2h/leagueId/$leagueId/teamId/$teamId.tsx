import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getH2H } from "~/api/fleaflicker";
import H2HRecord from "~/components/h2h/H2HRecord";

export const loader: LoaderFunction = async ({ params }) => {
  const { leagueId, teamId } = params;
  if (!leagueId) {
    throw new Response("Missing parameter leagueId", { status: 404 });
  }

  if (!teamId) {
    throw new Response("Missing parameter teamId", { status: 404 });
  }

  const h2h = await getH2H(parseInt(leagueId), parseInt(teamId));

  return { h2h };
};

const H2HLeagueIndex: React.FC<{}> = () => {
  const { h2h } = useLoaderData();

  return (
    <div>
      <H2HRecord h2h={h2h} />
    </div>
  );
};

export default H2HLeagueIndex;
