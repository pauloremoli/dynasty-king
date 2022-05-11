import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect
} from "@remix-run/node";
import { Form, Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import { ChangeEventHandler, default as React, useState } from "react";
import { getH2H } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import H2HRecord from "~/components/h2h/H2HRecord";
import SelectLeague from "~/components/SelectLeague";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";

interface ActionData {
  errors?: {
    league?: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url).pathname;
  const userId = await requireUserId(request);

  const teams = await getTeamsByUserId(userId);
  const leagueId = teams[0].leagueId;

  const h2h = await getH2H(leagueId, teams[0].teamId);
  return { teams, h2h, url };
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

  const { teamId, leagueId } = JSON.parse(team);

  return redirect("/h2h/leagueId/" + leagueId + "/teamId/" + teamId);
};

const H2H = () => {
  const { teams, h2h, url } = useLoaderData();
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
        <h1 className="text-2xl font-bold text-center">{`H2H${
          selectedLeagueName ? " - " + selectedLeagueName : ""
        }`}</h1>
        <div className="flex flex-col w-full justify-start">
          <Form method="post" onChange={handleChange}>
            <SelectLeague teams={teams} handleSelection={handleSelection} />
          </Form>
          <div className="flex flex-col  pt-12 w-full">
            {url === "/h2h" ? <H2HRecord h2h={h2h} /> : <Outlet />}
          </div>
        </div>
      </div>
    </>
  );
};

export default H2H;
