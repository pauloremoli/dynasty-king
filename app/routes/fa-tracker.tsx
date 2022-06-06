import { css } from "@emotion/react";
import { Team } from "@prisma/client";
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import { GridLoader } from "react-spinners";
import { getPlayer, getPlayers, getRosters } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import ListPlayers from "~/components/fa-tracker/ListPlayers";
import {
  createOrUpdatePlayers,
  getWatchlist,
} from "~/models/faWatchlist.server";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import styles from "~/styles/customSelect.css";
import { Player, PlayerTeam } from "~/types/Player";
import { Roster } from "~/types/Roster";
import { League } from "~/types/Team";
import { searchPlayer } from "~/utils/players";
import { Theme, useTheme } from "~/utils/ThemeProvider";

type LeagueRosters = {
  league: League;
  rosters: Roster[];
};

type LoaderData = {
  players: Player[];
  teams: Team[];
  allLeaguesRosters: LeagueRosters[];
  faTracker: PlayerTeam[];
  userId: string;
};

interface ActionData {
  errors: {
    playerId?: string;
  };
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return {
    title: "Free Agent Tracker - Dynasty King",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const teams = await getTeamsByUserId(userId);
  const players = await getPlayers();

  const watchlist = await getWatchlist(userId);
  const faTracker: PlayerTeam[] = [];
  let allLeaguesRosters: LeagueRosters[] = [];

  await Promise.all(
    watchlist?.playersId.map(async (playerId: string) => {
      const player: Player = players.data.find(
        (player: Player) => player.fp_id == playerId
      );

      const playerTeam: PlayerTeam = {
        player,
        availableInLeague: [],
      };

      await Promise.all(
        teams.map(async (team: Team) => {
          const ffPlayer = await getPlayer(team.leagueId, player);

          if (!("owner" in ffPlayer)) {
            player.fleaflickerId = ffPlayer.proPlayer.id;
            console.log(
              "player.fleaflickerId",
              player.fleaflickerId,
              ffPlayer.proPlayer.nameFull
            );
            playerTeam.availableInLeague.push({
              id: team.leagueId,
              name: team.leagueName,
            });
          }
        })
      );

      faTracker.push(playerTeam);
      return playerId;
    })
  );

  return { userId, teams, players: players.data, faTracker };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const playersIds = formData.get("playersIds")?.toString();
  if (!playersIds) {
    return json<ActionData>(
      { errors: { playerId: "Invalid players list" } },
      { status: 400 }
    );
  }

  const ids: string[] = JSON.parse(playersIds);

  const faWatchlist = await createOrUpdatePlayers(userId, ids);

  return { faWatchlist };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

const FATracker = () => {
  const { players, faTracker } = useLoaderData<LoaderData>();
  const [selectedPlayers, setSelectedPlayers] = useState(faTracker);
  const [theme] = useTheme();

  const fetcher = useFetcher();

  useEffect(() => {
    console.log(faTracker);

    setSelectedPlayers(faTracker);
  }, [faTracker]);

  const playersSSO: SelectSearchOption[] = players?.map((item: Player) => ({
    name: `${item.player} - ${item.pos} ${item.team}`,
    value: item.player,
  }));

  const handleSelection = (e: string) => {
    if (e) {
      let player: Player | undefined = players.find(
        (player: Player) => player.player === e
      );

      if (
        selectedPlayers.find(
          (selectedPlayer: PlayerTeam) =>
            selectedPlayer.player.fp_id === player?.fp_id
        )
      ) {
        // already added, just ignores
        return;
      }

      if (player) {
        const playersIds: string[] = [
          ...faTracker.map((playerTeam: PlayerTeam) => playerTeam.player.fp_id),
          player.fp_id,
        ];

        fetcher.submit(
          {
            playersIds: JSON.stringify(playersIds),
          },
          { method: "post" }
        );
      }
    }
  };

  const handleDelete = (e: { target: { name: string } }) => {
    const players = faTracker.filter(
      (playerTeam: PlayerTeam) => playerTeam.player.player !== e.target.name
    );

    const playersIds: string[] = players.map(
      (playerTeam: PlayerTeam) => playerTeam.player.fp_id
    );

    fetcher.submit(
      {
        playersIds: JSON.stringify(playersIds),
      },
      { method: "post" }
    );

    setSelectedPlayers((players) =>
      players.filter(
        (playerTeam: PlayerTeam) => playerTeam.player.player !== e.target.name
      )
    );
  };

  const override = css`
    display: block;
    margin: auto;
    border-color: white;
  `;

  return (
    <div className="flex flex-col w-full h-full items-center py-12 max-w-5xl px-4 md:px-0 dark:text-gray-100 animate-fadeIn">
      <h1 className="text-2xl font-bold text-center pb-10 ">
        Free Agent Tracker
      </h1>
      <div className="text-black w-full">
        <Form method="post" className="w-full">
          <SelectSearch
            options={playersSSO}
            multiple={false}
            search
            placeholder="Add a player to the watchlist"
            onChange={handleSelection}
            filterOptions={(options) => {
              const filter = fuzzySearch(options);
              return (q) => filter(q);
            }}
          />
        </Form>
      </div>
      {fetcher.state === "submitting" || fetcher.state === "loading" ? (
        <div className="flex w-full h-full items-center justify-center pt-10">
          <GridLoader
            color={theme == Theme.LIGHT ? "black" : "#ffffff"}
            loading={true}
            css={override}
            size={15}
          />
        </div>
      ) : (
        <ListPlayers faTracker={selectedPlayers} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default FATracker;
