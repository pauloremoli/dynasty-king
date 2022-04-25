import {
  ActionFunction,
  json,
  redirect,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import React, { useEffect } from "react";
import { getStats } from "~/api/fleaflicker";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";
import { Team } from "@prisma/client";
import { TeamStats } from "~/types/TeamStats";
import AllTimeRecord from "~/components/duck-report/AllTimeRecord";

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
        </div>
      </div>
    </>
  );
};

export default DuckReport;
