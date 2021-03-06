import { css } from "@emotion/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect
} from "@remix-run/node";
import {
  Form, useActionData,
  useLoaderData,
  useSubmit,
  useTransition
} from "@remix-run/react";
import React, { useState } from "react";
import { GridLoader } from "react-spinners";
import { getLeagueSettings, getStats } from "~/api/fleaflicker";
import DuckReportComponent from "~/components/duck-report/DuckReportComponent";
import ErrorScreen from "~/components/ErrorScreen";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import styles from "~/styles/customSelect.css";
import { Theme, useTheme } from "~/utils/ThemeProvider";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

interface ActionData {
  errors?: {
    league?: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const teams = await getTeamsByUserId(userId);

  if (!teams || teams.length === 0) {
    return redirect("/league-selection");
  }
  const leagueId = teams[0].leagueId;

  const leagueSettings = await getLeagueSettings(leagueId);

  const stats = await getStats(leagueId);

  return { teams, stats, leagueSettings };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

export const meta: MetaFunction = () => {
  return {
    title: "Duck Report - Dynasty King",
  };
};

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

  const leagueSettings = await getLeagueSettings(leagueId);

  const stats = await getStats(parseInt(leagueId));

  return { stats, leagueSettings };
};

const DuckReport = () => {
  const { teams, stats, leagueSettings } = useLoaderData();
  const [theme] = useTheme();
  const [selectedLeagueName, setSelectedLeagueName] = useState(
    teams.length > 0 ? teams[0].leagueName : ""
  );
  const submit = useSubmit();
  let actionData = useActionData();
  const transition = useTransition();

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const league = e.target.value;

    if (!league) {
      setSelectedLeagueName("");
      actionData = {};
      return;
    }
    const { leagueName } = JSON.parse(league);
    setSelectedLeagueName(leagueName);
  };

  const handleChange = (event: any) => {
    if (selectedLeagueName === "") {
      return;
    }

    submit(event.currentTarget, { replace: true });
  };

  const override = css`
    display: block;
    margin: auto;
    border-color: white;
  `;

  return (
    <>
      <div className="flex flex-col min-h-screen md:max-w-5xl w-full h-full md:w-5xl pt-8 dark:text-white items-center animate-fadeIn">
        <h1 className="text-2xl font-bold text-center">{`Duck Report${
          selectedLeagueName ? " - " + selectedLeagueName : ""
        }`}</h1>
        <div className="flex w-full flex-col justify-start px-4 pt-8 gap-4">
          <label>Select a league:</label>
          <Form method="post" onChange={handleChange} className="w-full">
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
        </div>
        <div className="flex flex-col md:pt-12 w-full">
          {transition.state === "submitting" ||
          transition.state === "loading" ? (
            <div className="flex w-full h-full items-center justify-center">
              <GridLoader
                color={theme == Theme.LIGHT ? "black" : "#ffffff"}
                loading={true}
                css={override}
                size={15}
              />
            </div>
          ) : (
            <DuckReportComponent
              stats={actionData?.stats ?? stats}
              leagueSettings={actionData?.leagueSettings ?? leagueSettings}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DuckReport;
