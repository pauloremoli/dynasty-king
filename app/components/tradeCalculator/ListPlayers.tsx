import React, { useEffect, useState } from "react";
import { Format } from "~/models/Format";
import { Player } from "~/models/Player";

interface ListPlayersProps {
  players: Player[];
  format: Format;
}

const ListPlayers = ({ players, format }: ListPlayersProps) => {

  return (
    <>
      {players.length > 0 && (
        <div className="py-4">
          <h3 className="pt-4 font-semibold text-blue-300">Players:</h3>
          <ul className="text-gray-100">
            {players.map((player: Player) => (
              <li key={player.fp_id}>
                {`${player.player} ${player.pos} ${player.team} [${
                  format === Format.FORMAT_1QB
                    ? player.value_1qb
                    : player.value_2qb
                }]`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ListPlayers;
