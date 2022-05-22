import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import React, { ChangeEventHandler, useState } from "react";
import { getLeagueSettings, getStats } from "~/api/fleaflicker";
import DuckReportComponent from "~/components/duck-report/DuckReportComponent";
import ErrorScreen from "~/components/ErrorScreen";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import styles from "~/styles/customSelect.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

interface ActionData {
  errors?: {
    league?: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url).pathname;

  const userId = await requireUserId(request);
  const teams = await getTeamsByUserId(userId);

  if (!teams || teams.length === 0) {
    return redirect("/league-selection");
  }
  const leagueId = teams[0].leagueId;

  const leagueSettings = await getLeagueSettings(leagueId);  

  const stats = await getStats(leagueId);

  return { teams, stats, url, leagueSettings };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const league = formData.get("league")?.toString();

  if (!league) {
    return json<ActionData>(
      { errors: { league: "League is invalid" } },
      { status: 400 }
    );
  }

  const { leagueId } = JSON.parse(league);

  return redirect("/duck-report/leagueId/" + leagueId);
};

const DuckReport = () => {
  const { teams, stats, url, leagueSettings } = useLoaderData();
  const [selectedLeagueName, setSelectedLeagueName] = useState(
    teams.length > 0 ? teams[0].leagueName : ""
  );
  const submit = useSubmit();

  const handleSelection = (e: ChangeEventHandler<HTMLSelectElement>) => {
    const league = e.target.value;
    const { leagueName } = JSON.parse(league);
    setSelectedLeagueName(leagueName);
  };

  const handleChange = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <>
      <div className="flex flex-col md:max-w-5xl w-full h-full md:w-5xl pt-8 text-white items-center justify-center">
        <h1 className="text-2xl font-bold text-center">{`Duck Report${
          selectedLeagueName ? " - " + selectedLeagueName : ""
        }`}</h1>
        <div className="flex w-full justify-start px-4">
          <Form method="post" onChange={handleChange} className="w-full">
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
        </div>
        <div className="flex flex-col md:pt-12 w-full">
          {url === "/duck-report" ? (
            <DuckReportComponent stats={stats} leagueSettings={leagueSettings}/>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};

export default DuckReport;
