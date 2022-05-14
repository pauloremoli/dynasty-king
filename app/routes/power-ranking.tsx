import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import fuzzysort from "fuzzysort";
import React from "react";
import { getLeagueSettings, getPlayers, getRosters } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import { Format } from "~/types/Format";
import { Roster } from "~/types/Roster";
import { getPlayerValue } from "~/utils/players";

type RosterValue = {
  totalQB: number;
  totalRB: number;
  totalWR: number;
  totalTE: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url).pathname;

  const userId = await requireUserId(request);
  const teams = await getTeamsByUserId(userId);

  if (!teams || teams.length === 0) {
    return redirect("/league-selection");
  }
  const leagueId = teams[0].leagueId;
  const format = Format.FORMAT_2QB; //await getLeagueSettings(leagueId);
  const rosters = await getRosters(leagueId);
  const players = await getPlayers();

  const data: Roster[] = rosters.map((roster: Roster) => {
    return {
      ...roster,
      players: roster.players.map((playerInRoster: Player) => {
        const result = fuzzysort.go(
          playerInRoster.player +
            "/" +
            playerInRoster.pos +
            "/" +
            playerInRoster.team,
          players.data,
          { key: "str", limit: 1 }
        );

        if (result.total === 1) {
          return result[0].obj;
        } else {
          const result = fuzzysort.go(playerInRoster.player, players.data, {
            key: "player",
            limit: 1,
          });

          if (result.total > 0) {
            return result[0].obj;
          } else {
            console.log(
              "NOT FOUND",
              playerInRoster.player,
              playerInRoster.pos,
              playerInRoster.team
            );

            return {
              player: playerInRoster.player,
              pos: playerInRoster.pos,
              team: playerInRoster.team,
              age: "NA",
              draft_year: "NA",
              ecr_1qb: null,
              ecr_2qb: null,
              ecr_pos: null,
              value_1qb: 1,
              value_2qb: 1,
              scrape_date: "NA",
              fp_id: "NA",
            };
          }
        }
      }),
    };
  });

  // data.map((roster: Roster) => (
  //   return {roster, value: roster.players.reduce(
  //     (previousValue: sterValue, currentValue: Player) => {
  //       const playerValue =  getPlayerValue(currentValue, format);
  //       switch (currentValue.pos) {
  //         case "QB":
  //           previousValue.totalQB +=playerValue
  //           break;
  //         case "RB":
  //           previousValue.totalRB += playerValue;
  //           break;
  //         case "WR":
  //           previousValue.totalWR += playerValue;
  //           break;
  //         case "TE":
  //           previousValue.totalTE += playerValue;
  //           break;
  //         default:
  //           break;
  //       }
  //       previousValue.total += playerValue;
  //       return previousValue;
  //     },
  //     { totalQB: 0, totalRB: 0, totalWR: 0, totalTE: 0 }
  //   )
  // )

  return data;
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

const PowerRanking = () => {
  const { data } = useLoaderData();
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-2xl font-bold text-center pb-20">Power Rankings</h1>
        <p>WIP</p>
        {/* <div className="flex flex-col gap-4">
          {powerRanking && powerRanking.map((team: Roster) => {
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
        </div> */}
      </div>
    </>
  );
};

export default PowerRanking;
