import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import {
  Form,
  Outlet,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import React, { useState } from "react";
import { SelectedOptionValue, SelectSearchOption } from "react-select-search";
import { getStats } from "~/api/fleaflicker";
import AllTimeRecordPostseason from "~/components/duck-report/AllTimeRecordPostseason";
import AllTimeRecord from "~/components/duck-report/AllTimeRecordRegularSeason";
import Top3 from "~/components/duck-report/Top3";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

import styles from "~/styles/customSelect.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);
  const leagueId = teams[0].leagueId;

  const stats = await getStats(leagueId);

  return { teams };
};

const DuckReport = () => {
  const { teams } = useLoaderData();
  const [selectedLeague, setSelectedLeague] = useState<string>();
  const submit = useSubmit();
  const handleSelection = (e: string) => {
    setSelectedLeague(e);
    if (e) {
      submit(null, { method: "post", action: "/duck-report/league/" + e });
    }
  };

  return (
    <>
      <div className="flex flex-col w-screen h-full pt-12 text-white items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Duck Report</h1>
        <div className="flex flex-col max-w-5xl w-full pt-12 items-center justify-center">
          <Form method="post">
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DuckReport;
