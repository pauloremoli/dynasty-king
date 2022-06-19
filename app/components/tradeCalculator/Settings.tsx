import { Team } from "@prisma/client";
import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { CustomSettings } from "~/types/CustomSettings";
import { Format } from "~/types/Format";
import { getFuturePickStr } from "~/utils/pick";
import { useOptionalUser } from "~/utils/userUtils";
import Accordion from "../Accordion";
import SelectLeague from "../SelectLeague";

interface SettingsProps {
  format: Format;
  teams: Team[];
  setTeam: (team: Team | null) => void;
  setCustomSettings: React.Dispatch<
    React.SetStateAction<CustomSettings | undefined>
  >;
}

const Settings: React.FC<SettingsProps> = ({
  teams,
  format,
  setTeam,
  setCustomSettings,
}) => {
  const user = useOptionalUser();
  const [pprTE, setPprTE] = useState(1);
  const [futurePickValue, setFuturePickValue] = useState(3);

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      setTeam(null);
    }
    const leagueStr = e.target.value;
    const team: Team = JSON.parse(leagueStr);
    setTeam(team);
  };

  useEffect(() => {
    const customSettings: CustomSettings = { pprTE, format, futurePickValue };
    setCustomSettings(customSettings);
    console.log(customSettings);
  }, [pprTE, setCustomSettings, format, futurePickValue]);

  return (
    <Accordion title="Settings">
      <div className="flex flex-col md:flex-row max-w-5xl w-full rounded-2xl my-6 text-gray-900 dark:text-gray-100 md:gap-12 ">
        <div className="flex flex-col text-left flext-start  w-full">
          <p className="text-left  font-semibold">
            Future pick value: <span className="font-normal">{getFuturePickStr(futurePickValue)}</span>
          </p>
          <input
            type="range"
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-4"
            id="futurePickValue"
            min={1}
            value={futurePickValue}
            max={5}
            step={1}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFuturePickValue(parseInt(e.target.value));
            }}
          />
          <h1 className="text-lg pt-12 pb-8 font-semibold">League settings</h1>
          <div className="flex w-full">
            <div className="flex flex-col justify-start w-full pb-8">
              <div className="flex items-center w-full pb-8">
                <h3 className=" font-semibold">Format:</h3>
                <div className="px-4">
                  <Link
                    to={"/trade-calculator/format/1QB"}
                    className={` hover:text-indigo-700 ${
                      format === Format.FORMAT_1QB
                        ? "dark:text-blue-400 text-indigo-600"
                        : "dark:text-blue-100"
                    }`}
                  >
                    <span>1QB</span>
                  </Link>
                </div>

                <div>
                  <Link
                    to={"/trade-calculator/format/2QB"}
                    className={` hover:text-indigo-700 dark:hover:text-yellow-300 ${
                      format === Format.FORMAT_2QB
                        ? "dark:text-blue-400 text-indigo-600"
                        : "dark:text-blue-100"
                    }`}
                  >
                    <span>SuperFlex (2QBs)</span>
                  </Link>
                </div>
              </div>

              <div className="w-full gap-4 flex items-center text-left flext-start pb-8 ">
                <span className="text-left mix-w-xs font-semibold">
                  Points per reception - TEs:
                </span>
                <select
                  name="tePremium"
                  id="tePremium"
                  className="border-0 shadow-sm rounded-lg text-gray-900"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setPprTE(parseFloat(e.target.value));
                  }}
                >
                  <option value="0.5">0.5</option>
                  <option value="0.75">0.75</option>
                  <option selected value="1">
                    1
                  </option>
                  <option value="1.25">1.25</option>
                  <option value="1.5">1.5</option>
                  <option value="1.75">1.75</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>

            <div className="mx-8 flex flex-col justify-center py-0 my-0 h-full">
              <div className="border-0 border-l border-indigo-900 dark:border-slate-400 h-full mx-auto"></div>
              <p className="font-bold py-4">OR</p>
              <div className="border-0 border-l border-indigo-900 dark:border-slate-400 h-full mx-auto"></div>
            </div>
            <div className="flex flex-col w-full">
              {!user && (
                <div className="flex">
                  <a
                    href={`/login?redirectTo=/trade-calculator/format/${format}`}
                    className="text-blue-500 underline pr-1"
                  >
                    Log In
                  </a>
                  <p>to use rosters from your leagues</p>
                </div>
              )}
              {teams.length > 0 && (
                <>
                  <p className="">Trade for a specific league</p>
                  <div className="flex w-full justify-start pt-4">
                    <SelectLeague
                      teams={teams}
                      handleSelection={handleSelection}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default Settings;
