import React from "react";

interface StandingsProps {
  wins: number;
  ties?: number;
  losses: number;
  name: string;
  owner: string;
  index: number;
}
const Standings: React.FC<StandingsProps> = ({
  wins,
  ties,
  losses,
  index,
  name,
  owner,
}) => {
  return (
    <div className="flex gap-1 rounded-lg w-full mb-1 ">
      <div className="flex gap-1 text-lg ">
        <p>{index + " - "}</p>
        <p>{name + " -"}</p>
        <p className="flex flex-col pl-1 dark:text-blue-300">{owner}</p>
        <p className="text-green-200 pl-3">{wins}W</p>
        {ties && ties !== 0 ? <p className="pl-3">{ties}T</p> : ""}
        <p className="text-red-200 pl-3">{losses}L</p>
      </div>
    </div>
  );
};

export default Standings;
