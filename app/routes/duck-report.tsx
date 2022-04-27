import {
  ActionFunction, LoaderFunction, redirect
} from "@remix-run/node";
import {
  useLoaderData
} from "@remix-run/react";
import React from "react";
import { getStats } from "~/api/fleaflicker";
import AllTimeRecordPostseason from "~/components/duck-report/AllTimeRecordPostseason";
import AllTimeRecord from "~/components/duck-report/AllTimeRecordRegularSeason";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);

  const stats = await getStats(teams[0].leagueId);
  console.log(stats);

  return { stats };
};

export const action: ActionFunction = async ({ request }) => {
  return {};
};

const DuckReport = () => {
  const { stats } = useLoaderData();

  return (
    <>
      <div className="flex flex-col w-screen h-full pt-12 text-white items-center">
        <h1 className="text-2xl font-bold text-center">Duck Report</h1>
        <div className="flex flex-col items-start max-w-4xl w-full pt-12">
          <AllTimeRecord teamStats={stats} />
          <AllTimeRecordPostseason teamStats={stats} />
        </div>
      </div>
    </>
  );
};

export default DuckReport;
