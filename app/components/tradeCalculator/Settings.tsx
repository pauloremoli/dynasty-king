import { Link } from "@remix-run/react";
import React from "react";
import { Format } from "~/types/Format";

interface SettingsProps {
  format: Format;
}

const Settings: React.FC<SettingsProps> = ({ format }) => {
  return (
    <div className="flex flex-col max-w-5xl w-full rounded-2xl px-12 my-6">
      <div className="flex">
        <h3 className="">Format:</h3>
        <div className="px-4">
          <Link
            to={"/trade-calculator/format/1QB"}
            className={`font-semibold hover:text-indigo-700 ${
              format === Format.FORMAT_1QB ? "dark:text-blue-400 text-indigo-600" : "dark:text-blue-100"
            }`}
          >
            <span>1QB</span>
          </Link>
        </div>

        <div>
          <Link
            to={"/trade-calculator/format/2QB"}
            className={`font-semibold hover:text-indigo-700 dark:hover:text-yellow-300 ${
              format === Format.FORMAT_2QB ? "dark:text-blue-400 text-indigo-600" : "dark:text-blue-100"
            }`}
          >
            <span>SuperFlex (2QBs)</span>
          </Link>
        </div>
      </div>
      {/* // TODO: implement rookie optimism */}
      {/* <div className="relative pt-1 flex flex-col flex-nowrap whitespace-nowrap items-center text-left flext-start">
        <span
          className="p-4 
           text-left mix-w-xs"
        >
          Rookie Optimism:
        </span>
        <input
          type="range"
          className="
            flex-grow-2
            p-0
            form-range
            w-full
            h-6
            focus:outline-none focus:ring-0 focus:shadow-none
            "
          id="rookieOptmism"
          min="-5"
          defaultValue={"0"}
          max="5"
          step="1"
        />
      </div> */}
    </div>
  );
};

export default Settings;
