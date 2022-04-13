import React, { useEffect, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import { Format } from "~/models/Format";
import { Player } from "~/models/Player";
import { getPlayerValue } from "~/utils/players";
import ListPlayers from "./ListPlayers";

interface TeamProps {
  allPlayers: Player[];
  format: Format;
  team: string;
  setTotalValue: (team: string, total: number) => void;
}

const Team = ({ allPlayers, format, team, setTotalValue }: TeamProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    selectedPlayers.map(
      (current: Player) => (sum += getPlayerValue(current, format))
    );
    setTotal(sum);
    setTotalValue(team, sum);
  }, [selectedPlayers]);

  const players: SelectSearchOption[] = allPlayers.map((item: Player) => ({
    name: `${item.player} - ${item.pos} ${item.team}`,
    value: item.player,
  }));

  const handleSelection = (e: string) => {
    if (e) {
      const player = allPlayers.find((player: Player) => player.player === e);
      if (player) {
        setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  };

  const handleDelete = (e) => {
    setSelectedPlayers((players) =>
      players.filter((player: Player) => player.player !== e.target.name)
    );
  };

  return (
    <>
      <div className="flex flex-col w-full border-2 rounded-2xl py-8 px-12">
        <h2
          className={`pb-8 text-2xl font-semibold text-center ${
            team === "A" ? "text-blue-600" : "text-red-600"
          }`}
        >
          Team {team}
        </h2>
        <div className="flex w-full justify-start gap-4 items-center text-gray-900">
          <SelectSearch
            options={players}
            multiple={false}
            search
            placeholder="Select a player"
            onChange={handleSelection}
            filterOptions={(options) => {
              const filter = fuzzySearch(options);
              console.log(filter);
              return (q) => filter(q).slice(0, 12);
            }}
          />
        </div>
        <ListPlayers
          players={selectedPlayers}
          format={format}
          handleDelete={handleDelete}
        />
        {total !== 0 && (
          <div className="mt-auto flex items-center justify-between text-2xl pt-16">
            <h3 className="font-semibold items-center text-blue-300">
              Total value:{" "}
            </h3>{" "}
            <h3 className=" font-semibold justify-end">{total} </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
