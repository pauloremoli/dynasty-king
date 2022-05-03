import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getStats } from "~/api/fleaflicker";
import AllTimeRecordPostseason from "~/components/duck-report/AllTimeRecordPostseason";
import AllTimeRecord from "~/components/duck-report/AllTimeRecordRegularSeason";
import Top3 from "~/components/duck-report/Top3";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);
  const leagueId = teams[0].leagueId;

  const stats = await getStats(leagueId);

  return { stats };
};

export const action: ActionFunction = async ({ request }) => {
  return {};
};

const DuckReport = () => {
  const { stats } = useLoaderData();

  return (
    <>
      <div className="flex flex-col w-screen h-full pt-12 text-white items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Duck Report</h1>
        <div className="flex flex-col items-start max-w-5xl w-full pt-12">
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
      </div>
    </>
  );
};

export default DuckReport;
