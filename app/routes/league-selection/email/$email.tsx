import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import React from "react";
import { getTeams } from "~/api/fleaflicker";
import { addTeam, getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";
import { Team } from "~/types/Team";

interface ActionData {
  errors: {
    teamId?: string;
    userId?: string;
  };
}

export const loader = async ({ params, request }) => {
  const { email } = params;
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const userTeams = await getTeamsByUserId(userId);

  let { teams } = await getTeams(email);

  teams = teams.filter(
    (team: Team) => !userTeams.find((t) => t.teamId === team.teamId)
  );

  return { teams };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  for (var key of formData.keys()) {
    const value = formData.get(key);
    if (!value) {
      return json<ActionData>(
        { errors: { teamId: "Invalid team" } },
        { status: 400 }
      );
    }
    const team: Team = JSON.parse(value.toString());

    const userId = await getUserId(request);

    if (!team) {
      return json<ActionData>(
        { errors: { teamId: "Invalid team" } },
        { status: 400 }
      );
    }

    if (!userId) {
      return json<ActionData>(
        { errors: { userId: "Invalid user id" } },
        { status: 400 }
      );
    }

    await addTeam(
      team.teamId,
      team.teamName,
      team.leagueId,
      team.leagueName,
      userId
    );
  }

  return redirect("/my-leagues");
};

const SelectLeague = () => {
  const data = useLoaderData();
  const transition = useTransition();
  return (
    <div className="animate-fadeIn">
      {!data && (
        <>
          <p className="text-red-400">No leagues found!</p>
        </>
      )}
      {data.teams.length === 0 ? (
        <div>
          <h1 className="font-semibold text-xl pt-10">
            All teams are already added.
          </h1>
          <a href="/my-leagues" className="underline dark:text-blue-400">
            Go back to my leagues
          </a>
        </div>
      ) : (
        <>
          <h1 className="font-semibold">Leagues</h1>
          <Form method="post" className="flex flex-col w-full">
            {data.teams.map((team: Team) => (
              <div key={team.teamId} className="flex gap-2 p-4 items-center">
                <input
                  name={team.teamId.toString()}
                  value={JSON.stringify(team)}
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
        </>
      )}
    </div>
  );
};

export default SelectLeague;
