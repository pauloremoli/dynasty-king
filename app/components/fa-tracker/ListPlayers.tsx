import React from "react";
import { PlayerTeam } from "~/types/Player";
import { Position } from "~/types/Position";
import { League } from "~/types/Team";
import { getTag } from "~/utils/players";

interface ListPlayersProps {
  faTracker: PlayerTeam[];
  handleDelete: (e: MouseEvent) => void;
}

const ListPlayers = ({ faTracker, handleDelete }: ListPlayersProps) => {
  console.log(faTracker);

  return (
    <div className="w-full pt-10">
      {faTracker.length > 0 && (
        <div className="flex flex-col">
          {faTracker.map((playerTeam: PlayerTeam) => (
            <div
              className="flex flex-col text-white pb-8"
              key={playerTeam.player.fp_id}
            >
              <div className="flex justify-start items-center gap-4">
                <button
                  className="border-0 bg-transparent text-red-600 hover:text-red-900 ml-4 font-bold pr-"
                  name={playerTeam.player.player}
                  onClick={handleDelete}
                >
                  x
                </button>
                <p className="font-semibold">
                  {playerTeam.player.player + " - " + playerTeam.player.team}
                </p>
                <span
                  className={`${getTag(playerTeam.player.pos as Position)}`}
                >
                  {playerTeam.player.pos}
                </span>
              </div>
              <div className="text-white pl-4">
                {playerTeam.availableInLeague.length > 0 ? (
                  playerTeam.availableInLeague.map((league: League) => (
                    <div key={league.id}>
                      <p>{league.name}</p>
                      <a
                        href={`https://www.fleaflicker.com/nfl/leagues/${league.id}/players/add?toAddPlayerId=${playerTeam.player.fleaflickerId}`}
                      >
                        Add
                      </a>
                    </div>
                  ))
                ) : (
                  <p>Rostered in all leagues</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPlayers;
