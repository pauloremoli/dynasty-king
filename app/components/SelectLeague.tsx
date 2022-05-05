import React, { ChangeEventHandler } from "react";
import { Team } from "~/types/Team";

interface SelectLeagueProps {
  handleSelection: (e: ChangeEventHandler<HTMLSelectElement>) => void;
  teams: Team[];
}

const SelectLeague: React.FC<SelectLeagueProps> = ({
  teams,
  handleSelection,
}) => {
  return (
    <div className="flex flex-col w-full justify-start gap-4 text-gray-900 pt-12 pb-4">
      <select onChange={handleSelection} name="league" className="rounded p-2">
        {teams.map((team: Team) => (
          <option value={JSON.stringify(team)} key={team.leagueId}>
            {team.leagueName + " - " + team.teamName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLeague;
