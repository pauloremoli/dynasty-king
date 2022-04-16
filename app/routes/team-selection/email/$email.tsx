import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getTeams } from "~/api/fleaflicker";

export const loader = async ({ params }) => {
  const { email } = params;

  const teams = await getTeams(email);
  console.log(teams);

  return teams;
  
};

const SelectLeague = () => {
  const data = useLoaderData();
  return (
    <div>
      <h1>Teams</h1>
      {data && data.teams.map((team) => <h3 key={team.team_id}>{team.league_name} - {team.team_name}</h3>)}
    </div>
  );
};

export default SelectLeague;
