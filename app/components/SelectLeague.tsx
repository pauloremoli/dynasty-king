import React from "react";
import { Team } from "~/types/Team";

interface SelectLeagueProps {
  handleSelection: React.ChangeEvent<HTMLSelectElement>;
  teams: Team[];
}

const SelectLeague: React.FC<SelectLeagueProps> = ({
  teams,
  handleSelection,
}) => {
  return (
    <div className="flex flex-col w-full justify-start gap-4 text-gray-900">
      <select onChange={handleSelection} name="league" className="rounded p-2 border-0 shadow">
        <option value=""></option>
        {teams.map((team: Team, index: number) => (
          <option value={JSON.stringify(team)} key={team.leagueId}>
            {team.leagueName + " - " + team.teamName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLeague;
