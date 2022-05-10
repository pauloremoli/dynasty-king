import React from "react";
import { H2HStats } from "~/types/TeamStats";

interface H2HRecordProps {
  h2h: H2HStats;
}
const H2HRecord: React.FC<H2HRecordProps> = ({ h2h }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 w-full">
      {h2h &&
        Object.keys(h2h).map((key: string) => (
          <div key={h2h[key].teamName} className="flex p-4 justify-center w-72 rounded-xl flex-col bg-[#003459] gap-1">
            <p className="font-semibold text-lg">{h2h[key].teamName}</p>
            <p className="text-green-200 pl-3">
              {h2h[key].standings.wins + "W"}
            </p>
            {h2h[key].standings.ties && h2h[key].standings.ties !== 0 ? (
              <p className="pl-3">{h2h[key].standings.ties + "T"}</p>
            ) : (
              ""
            )}
            <p className="text-red-200 pl-3">
              {h2h[key].standings.losses + "L"}
            </p>

            <p className="pl-3">
              {(
                Math.round(
                  ((h2h[key].standings.wins * 100) /
                    (h2h[key].standings.wins + h2h[key].standings.losses)) *
                    100
                ) / 100
              ).toFixed(0)}
              %
            </p>
          </div>
        ))}
    </div>
  );
};

export default H2HRecord;
