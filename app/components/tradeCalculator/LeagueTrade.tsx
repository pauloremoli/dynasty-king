import React, { useEffect, useState } from "react";
import SelectSearch, {
    fuzzySearch,
    SelectSearchOption
} from "react-select-search";
import { LeagueSettings } from "~/types/LeagueSettings";
import { Player } from "~/types/Player";
import { RosterValue } from "~/types/Roster";
import { getPlayerValue } from "~/utils/players";
import ListPlayers from "./ListPlayers";

interface LeagueTradeProps {
  rosters: RosterValue[];
  leagueSettings: LeagueSettings;
  setTotalValue: (team: string, total: number) => void;
  isLeftTeam: boolean;
}

const LeagueTrade = ({
  rosters,
  leagueSettings,
  setTotalValue,
  isLeftTeam
}: LeagueTradeProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<RosterValue>();
  const [players, setPlayers] = useState<SelectSearchOption[]>([]);

  useEffect(() => {
    let sum = 0;
    selectedPlayers.map(
      (current: Player) =>
        (sum += getPlayerValue(current, leagueSettings.format))
    );

    if (selectedTeam?.roster.teamName) {
      setTotal(sum);
      setTotalValue(isLeftTeam ? "A" : "B", sum);
    }
  }, [selectedPlayers, leagueSettings, setTotalValue, selectedTeam, isLeftTeam]);

  useEffect(() => {
    if (!selectedTeam) return;

    setPlayers(
      selectedTeam.roster.players.map((player: Player) => ({
        name: `${player.player} - ${player.pos} ${player.team}`,
        value: player.player,
      }))
    );
  }, [selectedTeam]);

  const handleSelection = (e: string) => {
    if (e) {
      const selectedPlayer = selectedTeam?.roster.players.find(
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

  const handleDelete = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setSelectedPlayers((players) =>
      players.filter((player: Player) => player.player !== e.target.name)
    );
  };

  const handleTeamSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayers([]);
    setPlayers([]);
    setSelectedTeam(
      rosters.find(
        (rosterValue: RosterValue) =>
          rosterValue?.roster?.teamId === parseInt(event.target.value)
      )
    );
  };

  return (
    <>
      <div className="flex flex-col w-full dark:bg-[#003459] rounded-2xl py-4 px-4 md:py-8 md:px-12">
        <h2 className="pb-8 text-2xl font-semibold text-center text-red-400">
          {selectedTeam?.roster.teamName ?? "Select a team"}
        </h2>
        <div className="flex w-full justify-start gap-4 items-center text-gray-700">
          <select
            name="team"
            onChange={handleTeamSelection}
            placeholder="Select a team"
            className="border-0 rounded shadow-sm w-full mb-4"
          >
            <option value={""}>Select a team</option>
            {rosters.map((rosterValue: RosterValue) => (
              <option
                value={rosterValue.roster.teamId}
                key={rosterValue.roster.teamId}
              >
                {rosterValue.roster.teamName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full justify-start gap-4 items-center text-gray-700">
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
          format={leagueSettings.format}
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

export default LeagueTrade;
