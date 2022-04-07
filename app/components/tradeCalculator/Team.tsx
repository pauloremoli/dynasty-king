import React, { useEffect, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption
} from "react-select-search";
import { Format } from "~/models/Format";
import { Player } from "~/models/Player";
import ListPlayers from "./ListPlayers";

interface TeamProps {
  allPlayers: Player[];
  format: Format;
  team: string;
  setTotalValue: (team: string, total: number) => void;
}

const Team = ({ allPlayers, format, team, setTotalValue }: TeamProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>();
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    selectedPlayers.map(
      (current: Player) => (sum += parseInt(current.value_1qb))
    );
    setTotal(sum);
    setTotalValue(team, sum);
  }, [selectedPlayers]);

  const players: SelectSearchOption[] = allPlayers.map((item: Player) => ({
    name: `${item.player} ${item.pos} ${item.team}`,
    value: item.player,
  }));

  const handleClickTeam = (e: React.MouseEvent<HTMLButtonElement>) => {    
    if (selectedPlayer) {
      const player = allPlayers.find(
        (player: Player) => player.player === selectedPlayer
      );
      if (player) {
        setSelectedPlayers([...selectedPlayers, player]);
        setSelectedPlayer("");
      }
    }
  };

  return (
    <>
      <div className="shadow-lg  bg-[#003459] rounded-2xl py-8 px-12">
        <h2
          className={`pb-8 text-2xl font-semibold text-center ${
            team === "A" ? "text-blue-600" : "text-red-600"
          }`}
        >
          Team {team}
        </h2>
        <div className="flex w-full justify-around gap-4 items-center text-gray-900">
          <SelectSearch
            options={players}
            multiple={false}
            search
            placeholder="Select a player"
            value={selectedPlayer}
            onChange={(e: any) => {
              setSelectedPlayer(e);
            }}
            filterOptions={(options) => {
              const filter = fuzzySearch(options);
              return (q) => filter(q).slice(0, 12);
            }}
          />
          <button
            className={`${
              team === "A" ? "bg-blue-600 hover:bg-blue-600" : "bg-red-600 hover:bg-red-700"
            }  hover:scale-105 text-white px-8 py-2 rounded-xl`}
            onClick={handleClickTeam}
          >
            Add
          </button>
        </div>
        <ListPlayers players={selectedPlayers} format={format} />
        {total !== 0 && (
          <div>
            <h3 className="pt-8 font-semibold text-blue-300">Total value: </h3>{" "}
            <h3>{total} </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
