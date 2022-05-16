import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import React, { ChangeEventHandler, useState } from "react";
import { getLeagueSettings, getRosterValue } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import PowerRankingChart from "~/components/powerRanking/PowerRankingChart";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";

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

  console.log("LoaderFunction");
  const data = await getRosterValue(leagueId);
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
    return json<ActionData>(
      { errors: { league: "Team data is invalid" } },
      { status: 400 }
    );
  }

  const { leagueId } = JSON.parse(team);
  const data = await getRosterValue(parseInt(leagueId));
  const leagueSettings = await getLeagueSettings(leagueId);
  return { data, leagueSettings };
};

const PowerRanking = () => {
  const { teams, data, leagueSettings } = useLoaderData();
  const actionData = useActionData();

  const [selectedLeagueName, setSelectedLeagueName] = useState(
    teams.length > 0 ? teams[0].leagueName : ""
  );
  const submit = useSubmit();

  const handleSelection = (e: ChangeEventHandler<HTMLSelectElement>) => {
    const { leagueName } = JSON.parse(e.target.value);
    setSelectedLeagueName(leagueName);
  };

  const handleChange = (event: any) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <>
      <div className="flex flex-col w-full h-full items-center md:pt-24 text-white  max-w-5xl p-4">
        <h1 className="text-2xl font-bold text-center">{`Power Ranking${
          selectedLeagueName ? " - " + selectedLeagueName : ""
        }`}</h1>
        <div className="flex flex-col w-full justify-start">
          <Form method="post" onChange={handleChange}>
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
        </div>
        <div className="flex flex-col text-white font-light pt-12 w-full">
          <PowerRankingChart
            value={actionData?.data ?? data}
            leagueSetttings={actionData?.leagueSettings ?? leagueSettings}
          />
        </div>
      </div>
    </>
  );
};

export default PowerRanking;
