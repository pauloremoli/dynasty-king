import React from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import ErrorScreen from "~/components/ErrorScreen";
import { requireUserId } from "~/session.server";
import { getTeamsByUserId } from "~/models/team.server";
import { getInactivePlayers } from "~/api/fleaflicker";
import { InactivePlayer, InactivePlayerTeam } from "~/types/InactivePlayer";
import { useLoaderData } from "@remix-run/react";
import { getTag } from "~/utils/players";
import { Position } from "~/types/Position";

export const meta: MetaFunction = () => {
  return {
    title: "Lineup Tracker - Dynasty King",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const teams = await getTeamsByUserId(userId);

  if (!teams || teams.length === 0) {
    return redirect("/league-selection");
  }

  const inactivePlayersTeam = await getInactivePlayers(teams);

  return { inactivePlayersTeam };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

const LineupTracker = () => {
  const { inactivePlayersTeam } = useLoaderData();

  return (
    <>
      <div className="flex flex-col min-h-screen w-full h-full items-center pt-24 dark:text-white animate-fadeIn">
        <h1 className="text-4xl font-semibold text-center pb-12">
          Lineup Tracker
        </h1>

        <div className="flex-col">
          {inactivePlayersTeam.length === 0 && (
            <div>
              <p className="dark:text-white text-xl text-center font-extralight">
                No inactive players.
              </p>
            </div>
          )}
          {inactivePlayersTeam.map((item: InactivePlayerTeam) => {
            return (
              item.inactivePlayers.length > 0 && (
                <div className="flex-col pb-12" key={item.team.teamId}>
                  <h1 className="font-semibold text-lg">
                    {item.team.leagueName}{" "}
                    <span className="pl-2 text-blue-500 font-semibold">
                      {item.team.teamName}
                    </span>
                  </h1>
                  <div>
                    {item.inactivePlayers.map(
                      (inactivePlayer: InactivePlayer, index: number) => {
                        return (
                          <div
                            className="flex gap-4 font-light pt-2 pb-2 items-center"
                            key={inactivePlayer?.player?.fleaflickerId ?? index}
                          >
                            {inactivePlayer.position.includes("/") ? (
                              <p className="text-xs inline-flex items-center justify-center font-bold leading-sm uppercase py-1 p-2 rounded-full bg-lime-200 text-gray-700">
                                {inactivePlayer.position}
                              </p>
                            ) : (
                              <p
                                key={inactivePlayer.position}
                                className={`${getTag(
                                  inactivePlayer.position as Position
                                )}`}
                              >
                                {inactivePlayer.position}
                              </p>
                            )}
                            {inactivePlayer?.player && (
                              <p className="font-medium">
                                {inactivePlayer?.player?.player}
                              </p>
                            )}
                            {inactivePlayer.isEmptySlot ? (
                              <p className="font-medium">Empty</p>
                            ) : (
                              <p className="font-medium text-red-500">
                                {inactivePlayer.isByeWeek
                                  ? "BYE"
                                  : inactivePlayer.isFreeAgent
                                  ? "Free Agent"
                                  : inactivePlayer.reason}
                              </p>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LineupTracker;
