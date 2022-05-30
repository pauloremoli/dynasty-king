import { Team } from "@prisma/client";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import { getPlayers, getRosters } from "~/api/fleaflicker";
import ErrorScreen from "~/components/ErrorScreen";
import ListPlayers from "~/components/fa-tracker/ListPlayers";
import { getWatchlist } from "~/models/faWatchlist.server";
import { getTeamsByUserId } from "~/models/team.server";
import { requireUserId } from "~/session.server";
import { Player, PlayerTeam } from "~/types/Player";
import { Roster } from "~/types/Roster";
import styles from "~/styles/customSelect.css";
import { searchPlayer } from "~/utils/players";
import { League } from "~/types/Team";

type LeagueRosters = {
  league: League;
  rosters: Roster[];
};

type LoaderData = {
  players: Player[];
  teams: Team[];
  allLeaguesRosters: LeagueRosters[];
  faTracker: PlayerTeam[];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return {
    title: "Free Agente Tracker - Dynasty King",
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

      let found: Boolean = false;
      const player = players.data.find((player: Player) => player.fp_id);
      watchlist?.playersId.forEach((playerId: string) => {
        const playerTeam: PlayerTeam = {
          player,
          availableInLeague: [],
        };
        rosters.forEach((roster: Roster) => {
          const result = searchPlayer(player, roster.players);
          if (result && result.playerInRoster) {
            found = true;
            playerTeam.player = result.playerInRoster;
            return;
          }
        });
        if (!found) {
          playerTeam.availableInLeague.push({
            id: team.leagueId,
            name: team.leagueName,
          });
          faTracker.push(playerTeam);
        }
      });
      return team;
    })
  );

  return { teams, players: players.data, faTracker, allLeaguesRosters };
};

export function ErrorBoundary({ error }: any) {
  console.log(error);
  return <ErrorScreen />;
}

const FATracker = () => {
  let { players, faTracker, allLeaguesRosters } = useLoaderData<LoaderData>();
  const [selectedPlayers, setSelectedPlayers] = useState(faTracker);

  useEffect(() => {
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
      if (player) {
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
              playerTeam.player = result.playerInRoster;
              return;
            }
          });
          if (!found) {
            playerTeam.availableInLeague.push(leagueRosters.league);
          }
        });

        setSelectedPlayers((players) => [...players, playerTeam]);
      }
    }
  };

  const handleDelete = (e) => {
    setSelectedPlayers((players) =>
      players.filter(
        (playerTeam: PlayerTeam) => playerTeam.player.player !== e.target.name
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-center pt-24 max-w-5xl text-white animate-fadeIn">
      <h1 className="text-2xl font-bold text-center pb-20">FA Tracker</h1>
      <div className="text-black w-full">
        <SelectSearch
          options={playersSSO}
          multiple={false}
          search
          placeholder="Select a player"
          onChange={handleSelection}
          filterOptions={(options) => {
            const filter = fuzzySearch(options);
            return (q) => filter(q);
          }}
        />
      </div>
      <ListPlayers faTracker={selectedPlayers} handleDelete={handleDelete} />
    </div>
  );
};

export default FATracker;
