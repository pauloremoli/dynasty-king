import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getH2H } from "~/api/fleaflicker";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);
  const leagueId = teams[0].leagueId;

  const h2h = await getH2H(leagueId, teams[0].teamId);

  return { h2h };
};

const H2H = () => {
  const { h2h } = useLoaderData();
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-4xl font-bold text-center pb-20">H2H</h1>
        <h2>Work in progress...</h2>
        <pre>{JSON.stringify(h2h, null, 2)}</pre>
      </div>
    </>
  );
};

export default H2H;
