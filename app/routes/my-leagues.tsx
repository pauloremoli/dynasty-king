import { Team } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { deleteTeamById, getTeamsByUserId } from "~/models/team.server";
import { getUserId } from "~/session.server";

import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "My leagues - Dynasty King",
  };
};
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const teams = await getTeamsByUserId(userId);
  if (!teams || teams.length === 0) {
    return redirect("/league-selection");
  }
  return { teams };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const formName = formData.get("formName");
  if (!formName) {
    return {};
  }

  if (formName === "$addleague") {
    return redirect(`/league-selection`);
  } else {
    return deleteTeamById(formName.toString());
  }
};

const MyLeagues = () => {
  const data = useLoaderData();

  return (
    <>
      <div className="flex flex-col min-h-screen w-full h-full items-center md:pt-12 dark:text-white animate-fadeIn">
        <h1 className="font-semibold text-3xl">My Leagues</h1>
        <div className="md:pt-10 flex gap-20">
          <div>
            {data.teams.map((team: Team) => {
              return (
                <Form method="post" key={team.id} className="flex gap-4 py-4">
                  <button
                    className="border-0 bg-transparent text-red-600 hover:text-red-900 ml-4 font-bold"
                    name="formName"
                    value={team.id}
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
                </Form>
              );
            })}
          </div>
          <Form method="post" className="space-y-6">
            <button
              type="submit"
              name="formName"
              value="$addleague"
              className="w-full rounded text-white dark:bg-blue-500 bg-indigo-700 my-2 py-2 px-12 dark:hover:bg-blue-600 dark:focus:bg-blue-400 hover:bg-indigo-600 focus:bg-indigo-400  flex-grow-1"
            >
              Add League
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MyLeagues;
