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
    <div className="flex rounded-lg w-full mb-1 pb-4 text-lg">
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="flex">
          <p>{index + " - "}</p>
          <p className="pl-1">{name}</p>
          <p className="flex flex-col pl-2 dark:text-blue-300">{owner}</p>
        </div>
        <div className="flex">
          <p className="text-green-200 md:pl-3">{wins}W</p>
          {ties && ties !== 0 ? <p className="pl-3">{ties}T</p> : ""}
          <p className="text-red-200 pl-3">{losses}L</p>
        </div>
      </div>
    </div>
  );
};

export default Standings;
