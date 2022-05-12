import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getPowerRanking } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import { Roster } from "~/types/Roster";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url).pathname;

  const userId = await requireUserId(request);
  const teams = await getTeamsByUserId(userId);

  if (!teams || teams.length === 0) {
    return redirect("/league-selection");
  }
  const leagueId = teams[0].leagueId;

  const powerRanking = await getPowerRanking(leagueId);

  return { powerRanking };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

const PowerRanking = () => {
  const { powerRanking } = useLoaderData();
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-2xl font-bold text-center pb-20">Power Rankings</h1>

        <div className="flex flex-col gap-4">
          {powerRanking.map((team: Roster) => {
            return (
              <div key={team.teamId}>
                <p>{team.teamName}</p>
                <div>
                  {team.players.map((player) => {
                    return (
                      <div key={player.id}>
                        <p>{player.name + " " + player.position}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Roster;
