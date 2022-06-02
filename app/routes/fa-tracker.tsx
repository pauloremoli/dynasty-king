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
import { getPlayers, getRosters } from "~/api/fleaflicker";
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
    teams.map(async (team: Team) => {
      const leagueId = team.leagueId;
      const rosters = await getRosters(leagueId);
      allLeaguesRosters.push({
        league: { id: team.leagueId, name: team.leagueName },
        rosters,
      });

      return team;
    })
  );

  watchlist?.playersId.forEach((playerId: string) => {
    const player = players.data.find(
      (player: Player) => player.fp_id == playerId
    );

    const playerTeam: PlayerTeam = {
      player,
      availableInLeague: [],
    };

    allLeaguesRosters.forEach((leagueRosters: LeagueRosters) => {
      let found: Boolean = false;
      leagueRosters.rosters.forEach((roster: Roster) => {
        const result = searchPlayer(player, roster.players);
        if (result && result.playerInRoster) {
          found = true;
          playerTeam.player = result.player;
          playerTeam.player.fp_id = result.playerInRoster.fp_id;
          return;
        }
      });
      if (!found) {
        playerTeam.availableInLeague.push(leagueRosters.league);
      }
    });

    faTracker.push(playerTeam);
  });

  return { userId, teams, players: players.data, faTracker, allLeaguesRosters };
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

  const fetcher = useFetcher();

  useEffect(() => {
    setSelectedPlayers(faTracker);
    console.log(faTracker);
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
    <div className="flex flex-col w-full h-full items-center pt-10 max-w-5xl px-4 md:px-0 text-white animate-fadeIn">
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
            color={"#ffffff"}
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
