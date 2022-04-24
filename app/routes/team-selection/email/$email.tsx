import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import React from "react";
import { getTeams } from "~/api/fleaflicker";
import { addTeam } from "~/models/team.server";
import { getUserId } from "~/session.server";
import { Team } from "~/types/Team";

interface ActionData {
  errors: {
    teamId?: string;
    userId?: string;
  };
}

export const loader = async ({ params }) => {
  const { email } = params;

  return await getTeams(email);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  for (var key of formData.keys()) {
    console.log(key);
    
    const [leagueId, leagueName, teamId, teamName] = key.split("##");
    const selected = formData.get(key) === "on";
    const userId = await getUserId(request);

    if (!leagueId || !leagueName || !teamId || !teamName) {
      console.log("Invalid team data");
      
      return json<ActionData>(
        { errors: { teamId: "Invalid team" } },
        { status: 400 }
      );
    }

    if (!userId) {
      console.log("Invalid user id");
      return json<ActionData>(
        { errors: { userId: "Invalid user id" } },
        { status: 400 }
      );
    }

    console.log("selected", selected, leagueId, leagueName, teamId, teamName);
    if (selected) {
      console.log(await addTeam(parseInt(teamId), teamName, parseInt(leagueId), leagueName, userId));
    }
  }

  return redirect("/my-teams");
};

const SelectLeague = () => {
  const data = useLoaderData();
  const transition = useTransition();
  return (
    <div>
      <h1>Teams</h1>
      {data && (
        <Form method="post" className="flex flex-col w-full">
          {data.teams.map((team: Team) => (
            <div key={team.teamId} className="flex gap-2 p-4 items-center">
              <input
                name={
                  team.leagueId.toString() +
                  "##" +
                  team.leagueName +
                  "##" +
                  team.teamId.toString() +
                  "##" +
                  team.teamName
                }
                type="checkbox"
                defaultChecked={true}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={team.teamId.toString()}
                className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
              >
                <span className="font-semibold">{team.leagueName} </span> -{" "}
                <span className="text-gray-900 dark:text-blue-300">
                  {team.teamName}
                </span>
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="w-full rounded bg-blue-500 my-2 py-2 px-12 text-white hover:bg-blue-600 focus:bg-blue-400 flex-grow-1"
          >
            {transition.state === "submitting" ? "Loading..." : "Save"}
          </button>
        </Form>
      )}
    </div>
  );
};

export default SelectLeague;
