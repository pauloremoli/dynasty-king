import { css } from "@emotion/react";
import {
  ActionFunction, LoaderFunction,
  MetaFunction,
  redirect
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
  useTransition
} from "@remix-run/react";
import React, { useState } from "react";
import { GridLoader } from "react-spinners";
import { getLeagueSettings, getRostersValues } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import PowerRankingChart from "~/components/powerRanking/PowerRankingChart";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import { Theme, useTheme } from "~/utils/ThemeProvider";

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

  const data = await getRostersValues(leagueId);
  const leagueSettings = await getLeagueSettings(leagueId);

  return { teams, data, leagueSettings };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const team = formData.get("league")?.toString();

  if (!team) {
    return { empty: true };
  }

  const { leagueId } = JSON.parse(team);
  const data = await getRostersValues(parseInt(leagueId));
  const leagueSettings = await getLeagueSettings(leagueId);
  return { data, leagueSettings };
};

export const meta: MetaFunction = () => {
  return {
    title: "Power Ranking - Dynasty King",
  };
};

const PowerRanking = () => {
  const { teams, data, leagueSettings } = useLoaderData();
  const transition = useTransition();
  const [theme] = useTheme();
  const actionData = useActionData();

  const [selectedLeagueName, setSelectedLeagueName] = useState(
    teams.length > 0 ? teams[0].leagueName : ""
  );
  const submit = useSubmit();

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { leagueName } = JSON.parse(e.target.value);
    setSelectedLeagueName(leagueName);
  };

  const handleChange = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  const override = css`
    display: block;
    margin: auto;
    border-color: white;
  `;

  return (
    <>
      <div className="flex flex-col w-full h-full min-h-screen items-center md:pt-10 dark:text-white  max-w-5xl p-4 animate-fadeIn">
        <h1 className="text-2xl font-semibold text-center">{`Power Ranking${
          selectedLeagueName ? " - " + selectedLeagueName : ""
        }`}</h1>
        <div className="flex w-full flex-col justify-start px-4 pt-8 gap-4">
          <label>Select a league:</label>
          <Form method="post" onChange={handleChange}>
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
        </div>
        <div className="flex flex-col dark:text-white font-light pt-12 w-full">
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
          ) : actionData && !actionData?.empty ? (
            <PowerRankingChart
              value={actionData?.data ?? data}
              leagueSetttings={actionData?.leagueSettings ?? leagueSettings}
            />
          ) : (
            <div>
              <p className="dark:text-white text-2xl text-center">
                No data available
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PowerRanking;
