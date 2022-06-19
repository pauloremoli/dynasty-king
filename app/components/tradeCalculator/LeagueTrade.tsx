import React, { useEffect, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import { FuturePickValue } from "~/types/CustomSettings";
import { LeagueSettings } from "~/types/LeagueSettings";
import { Player } from "~/types/Player";
import { RosterValue } from "~/types/Roster";
import {
  adjustValueToSettings,
  filterPicks,
  getPlayerValue,
  getSearchOptions,
  sortByDataByFormat,
} from "~/utils/players";
import ListPlayers from "./ListPlayers";

interface LeagueTradeProps {
  futurePickValue: FuturePickValue;
  allPlayers: Player[];
  myRoster?: RosterValue | null;
  rosters?: RosterValue[];
  leagueSettings: LeagueSettings;
  setTotalValue: (isLeftTeam: boolean, total: number) => void;
  isLeftTeam: boolean;
}

const LeagueTrade = ({
  futurePickValue,
  allPlayers,
  rosters,
  myRoster,
  leagueSettings,
  setTotalValue,
  isLeftTeam,
}: LeagueTradeProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<RosterValue>();
  const [players, setPlayers] = useState<SelectSearchOption[]>([]);
  const [picks, setPicks] = useState<SelectSearchOption[]>([]);

  const [listedPicks, setListedPicks] = useState(
    myRoster ? myRoster.roster.picks : selectedTeam?.roster.picks ?? []
  );
  const [listedPlayers, setListedPlayers] = useState(
    myRoster ? myRoster.roster.players : selectedTeam?.roster.players ?? []
  );

  useEffect(() => {
    setSelectedPlayers((selected: Player[]) =>
      selected.map(
        (current: Player) =>
          allPlayers.find(
            (updated: Player) =>
              updated.player === current.player &&
              updated.fp_id === current.fp_id
          ) ?? current
      )
    );
  }, [allPlayers]);

  useEffect(() => {
    let sum = 0;
    selectedPlayers.map(
      (current: Player) =>
        (sum += getPlayerValue(current, leagueSettings.format))
    );

    if (myRoster || selectedTeam?.roster.teamName) {
      setTotal(sum);
      setTotalValue(isLeftTeam, sum);
    }
  }, [
    selectedPlayers,
    leagueSettings,
    setTotalValue,
    selectedTeam,
    isLeftTeam,
    myRoster,
    futurePickValue,
  ]);

  useEffect(() => {
    const searchOptions = getSearchOptions(
      listedPlayers,
      leagueSettings.format,
      false
    );

    setPlayers(searchOptions);
  }, [listedPlayers, leagueSettings]);

  useEffect(() => {
    const picksWithValue = filterPicks(listedPicks, allPlayers);
    const picksSO = getSearchOptions(
      picksWithValue,
      leagueSettings.format,
      true
    );
    setPicks(picksSO);
  }, [listedPicks, leagueSettings, allPlayers]);

  const handleSelectionPLayer = (e: string) => {
    if (e) {
      const selectedPlayer = listedPlayers.find(
        (player: Player) => player.player === e
      );
      if (selectedPlayer) {
        if (
          !selectedPlayers.find(
            (player: Player) =>
              player.fp_id === selectedPlayer.fp_id &&
              player.player === selectedPlayer.player
          )
        ) {
          setSelectedPlayers([...selectedPlayers, selectedPlayer]);
        }
      }
    }
  };

  const handleSelectionPick = (e: string) => {
    if (e) {
      const selectedPick = allPlayers.find(
        (player: Player) => player.player === e
      );
      if (selectedPick) {
        setSelectedPlayers([...selectedPlayers, selectedPick]);
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

    const selectedRoster: RosterValue | undefined = rosters?.find(
      (rosterValue: RosterValue) =>
        rosterValue?.roster?.teamId === parseInt(event.target.value)
    );

    setSelectedTeam(selectedRoster);
    setListedPlayers(selectedRoster?.roster.players ?? []);

    const picks = selectedRoster?.roster.picks ?? [];
    setListedPicks(picks);
  };

  return (
    <>
      <div className="flex flex-col w-full dark:bg-[#003459] rounded-2xl py-4 px-4 md:py-8 md:px-12">
        <h2
          className={`pb-8 text-2xl font-semibold text-center ${
            isLeftTeam ? "text-blue-400" : "text-red-400"
          }`}
        >
          {myRoster
            ? myRoster.roster.teamName
            : selectedTeam?.roster.teamName ?? "Select a team"}
        </h2>
        {!isLeftTeam && (
          <div className="flex w-full justify-start gap-4 items-center text-gray-700">
            <select
              name="team"
              onChange={handleTeamSelection}
              placeholder="Select a team"
              className="border-0 rounded shadow-sm w-full mb-4"
            >
              <option value={""}>Select a team</option>
              {rosters?.map((rosterValue: RosterValue) => (
                <option
                  value={rosterValue.roster.teamId}
                  key={rosterValue.roster.teamId}
                >
                  {rosterValue.roster.teamName}
                </option>
              ))}
            </select>
          </div>
        )}
        <div
          className={`flex w-full justify-start gap-4 items-center text-gray-700 ${
            !selectedTeam && !isLeftTeam ? "hidden" : ""
          }`}
        >
          <SelectSearch
            options={players}
            multiple={false}
            search
            placeholder="Select a player"
            onChange={handleSelectionPLayer}
            filterOptions={(options) => {
              const filter = fuzzySearch(options);
              return (q) => filter(q);
            }}
          />
        </div>
        <div
          className={`flex w-full justify-start gap-4 items-center text-gray-700 pt-4 ${
            !selectedTeam && !isLeftTeam ? "hidden" : ""
          }`}
        >
          <SelectSearch
            options={picks}
            multiple={false}
            search
            placeholder="Select a pick"
            onChange={handleSelectionPick}
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
