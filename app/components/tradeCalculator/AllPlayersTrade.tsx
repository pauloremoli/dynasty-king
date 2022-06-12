import React, { useEffect, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import { Format } from "~/types/Format";
import { Player } from "~/types/Player";
import { Roster } from "~/types/Roster";
import { getPlayerValue } from "~/utils/players";
import ListPlayers from "./ListPlayers";

interface AllPlayersTradeProps {
  allPlayers: Player[];
  format: Format;
  roster?: Roster;
  team: string;
  setTotalValue: (team: string, total: number) => void;
}

const AllPlayersTrade = ({ allPlayers, format, team, setTotalValue }: AllPlayersTradeProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    selectedPlayers.map(
      (current: Player) => (sum += getPlayerValue(current, format))
    );
    setTotal(sum);
    setTotalValue(team, sum);
  }, [selectedPlayers, format]);

  const players: SelectSearchOption[] = allPlayers.map((item: Player) => ({
    name: `${item.player} - ${item.pos} ${item.team}`,
    value: item.player,
  }));

  const handleSelection = (e: string) => {
    if (e) {
      const selectedPlayer = allPlayers.find(
        (player: Player) => player.player === e
      );
      if (selectedPlayer) {
        if (
          !selectedPlayers.find(
            (player: Player) => player.fp_id === selectedPlayer.fp_id
          )
        ) {
          setSelectedPlayers([...selectedPlayers, selectedPlayer]);
        }
      }
    }
  };

  const handleDelete = (e : React.ChangeEvent<HTMLButtonElement>) => {
    setSelectedPlayers((players) =>
      players.filter((player: Player) => player.player !== e.target.name)
    );
  };

  return (
    <>
      <div className="flex flex-col w-full dark:bg-[#003459] rounded-2xl py-4 px-4 md:py-8 md:px-12">
        <h2
          className={`pb-8 text-2xl font-semibold text-center ${
            team === "A" ? "text-blue-400" : "text-red-400"
          }`}
        >
          {team}
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
              return (q) => filter(q);
            }}
          />
        </div>
        <ListPlayers
          players={selectedPlayers}
          format={format}
          handleDelete={handleDelete}
        />
        {total !== 0 && (
          <div className="mt-auto flex items-center justify-between text-xl pt-16">
            <h3 className="font-semibold items-center dark:text-blue-300">
              Total value:{" "}
            </h3>{" "}
            <h3 className=" font-semibold justify-end">{total} </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default AllPlayersTrade;
