import React, { useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";
import { Team } from "~/types/Team";

interface SelectLeagueProps {
  handleSelection: (e: string) => void;
  teams: Team[];
}

const SelectLeague: React.FC<SelectLeagueProps> = ({
  teams,
  handleSelection,
}) => {
  const teamsOption: SelectSearchOption[] = teams.map((item: Team) => ({
    name: `${item.leagueName} - ${item.teamName}`,
    value: item.teamId,
  }));

  return (
    <div className="flex w-full justify-start gap-4 items-center text-gray-900 py-8 max-w-md">
      <SelectSearch
        options={teamsOption}
        multiple={false}
        search
        placeholder="Select a league"
        id="selectLeague"
        onChange={handleSelection}
        filterOptions={(options) => {
          const filter = fuzzySearch(options);
          return (q) => filter(q).slice(0, 12);
        }}
      />
    </div>
  );
};

export default SelectLeague;
