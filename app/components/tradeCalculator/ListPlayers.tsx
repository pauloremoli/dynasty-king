import React, { useEffect, useState } from "react";
import { Format } from "~/models/Format";
import { Player } from "~/models/Player";
import { Position } from "~/models/Position";
import { getPlayerValue, getTag } from "~/utils/players";

interface ListPlayersProps {
  players: Player[];
  format: Format;
  handleDelete: (e: MouseEvent) => void;
}


const ListPlayers = ({ players, format, handleDelete }: ListPlayersProps) => {
  return (
    <>
      {players.length > 0 && (
        <div className="py-4">
          {/* <h3 className="pt-4 font-semibold text-blue-300">Players:</h3> */}
          <ul className="text-gray-100">
            {players.map((player: Player) => (
              <li key={player.fp_id}>
                <div className="flex gap-2 py-2 items-center">
                  <span className={`${getTag(player.pos as Position)}`}>
                    {player.pos}
                  </span>
                  <span className="mr-auto">{player.player}</span>

                  <span className="font-semibold">
                    {getPlayerValue(player, format)}
                  </span>
                  <button
                    className="border-0 bg-transparent text-red-600 hover:text-red-900 ml-4 font-bold"
                    name={player.player}
                    onClick={handleDelete}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ListPlayers;
