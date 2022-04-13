import { Link } from "@remix-run/react";
import React from "react";
import { Format } from "~/models/Format";

interface SettingsProps {
  format: Format;
}

const Settings: React.FC<SettingsProps> = ({ format }) => {
  return (
    <div className="flex flex-col max-w-5xl w-full rounded-2xl pb-8 px-12 my-12">
      <h1 className="pb-4 text-2xl font-semibold text-center">Settings</h1>
      <div className="flex p-4">
        <h3 className="">Format:</h3>
        <div className="px-4">
          <Link
            to={"/trade-calculator/format/1QB"}
            className={`font-semibold hover:text-yellow-300 ${
              format === Format.FORMAT_1QB ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>1QB</span>
          </Link>
        </div>

        <div>
          <Link
            to={"/trade-calculator/format/2QB"}
            className={`font-semibold hover:text-yellow-300 ${
              format === Format.FORMAT_2QB ? "text-blue-400" : "text-blue-100"
            }`}
          >
            <span>SuperFlex (2QBs)</span>
          </Link>
        </div>
      </div>

      <div className="relative pt-1 flex flex-col flex-nowrap whitespace-nowrap items-center text-left flext-start">
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
      </div>
    </div>
  );
};

export default Settings;
