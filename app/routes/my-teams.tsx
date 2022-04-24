import { Team } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { deleteTeamById, getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  console.log("userId", userId);

  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);
  console.log("teams", teams);
  if (!teams || teams.length === 0) {
    return redirect("/team-selection");
  }
  return { teams };
};

export const action: ActionFunction = async () => {
  return redirect(`/team-selection`);
};

const MyTeams = () => {
  const data = useLoaderData();

  const handleDelete = async (e) => {
    console.log(e.target.name);

    console.log(await deleteTeamById(e.target.name));
  };

  return (
    <>
      <div className="flex flex-col w-full h-full items-center md:pt-12 text-white">
        <h1 className="font-semibold text-3xl">My Teams</h1>
        <div className="md:pt-10 flex gap-20">
          <div>
            {data.teams.map((team: Team) => {
              return (
                <div key={team.id} className="flex gap-4 py-4">
                  <button
                    className="border-0 bg-transparent text-red-600 hover:text-red-900 ml-4 font-bold"
                    name={team.id}
                    onClick={handleDelete}
                  >
                    x
                  </button>
                  <div>
                    <span className="font-semibold">{team.leagueName} </span>
                    {" - "}
                    <span className="text-gray-900 dark:text-blue-300">
                      {team.teamName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <Form method="post" className="space-y-6">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 my-2 py-2 px-12 text-white hover:bg-blue-600 focus:bg-blue-400 flex-grow-1"
            >
              Add team
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MyTeams;
