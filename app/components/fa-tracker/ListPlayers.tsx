import React from "react";
import { PlayerTeam } from "~/types/Player";

interface ListPlayersProps {
  faTracker: PlayerTeam[];
  handleDelete: (e: MouseEvent) => void;
}

const ListPlayers = ({ faTracker, handleDelete }: ListPlayersProps) => {
  console.log(faTracker);

  return (
    <div className="w-full">
      {faTracker.length > 0 && (
        <div className="py-4 text-white">
          <ul className="text-gray-100">
            <div className="flex flex-col">
              {faTracker.map((playerTeam: PlayerTeam) => (
                <div
                  key={playerTeam.player.fp_id}
                  className="flex flex-col gap-2 text-white"
                >
                  <p>{playerTeam.player.player}</p>
                  <div className="text-blue-500">
                    {playerTeam.availableInLeague.map((league: string) => (
                      <p key={league}>{league}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListPlayers;
