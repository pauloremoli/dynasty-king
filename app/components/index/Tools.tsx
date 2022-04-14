import { Link } from "@remix-run/react";
import React from "react";
import {
  GiDuck,
  GiScales,
  GiFaceToFace,
  GiAmericanFootballPlayer,
} from "react-icons/gi";
import { ImListNumbered, ImPower } from "react-icons/im";

const Tools = () => {
  return (
    <div className=" ml-auto mr-auto w-full">
      <div className="align-center grid grid-cols-3 self-center">
        <div className="mb-8  flex h-56 w-full  flex-col self-center overflow-hidden rounded-lg bg-[#003459] shadow-lg  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
          <Link to="/rankings/format/1QB/position/Linkll">
            <div className="w-full px-6 py-6">
              <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                Dynasty Rankings
              </div>
              <div className="flex items-center justify-center py-2">
                <ImListNumbered size={40} color="#007ea7" />
              </div>
              <p className="pt-4 text-base text-gray-100">
                PPR rankings for SuperFlex, 1QB, rookies.
              </p>
            </div>
          </Link>
        </div>

        <Link to="/trade-calculator/format/1QB">
          <div className="self-center overflow-hidden  mb-8 flex h-56  w-full  flex-col rounded-lg bg-[#003459] shadow-lg  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
            <div className="px-6 py-6">
              <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                Trade Calculator
              </div>
              <div className="flex items-center justify-center py-2">
                <GiScales size={40} color="#007ea7" />
              </div>
              <p className="pt-4 text-base text-gray-300">
                Adjust settings according to your league and personal
                preferences.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/h2h">
          <div className="mb-8  flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] shadow-lg  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
            <div className="px-6 py-6">
              <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                H2H Report
              </div>

              <div className="flex items-center justify-center py-2">
                <GiFaceToFace size={40} color="#007ea7" />
              </div>
              <p className="pt-4 text-base text-gray-300">
                H2H record against your league mates.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/duck-report">
          <div className="mb-8  flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] shadow-lg  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
            <div className="px-6 py-6">
              <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                Duck Report
              </div>

              <div className="flex items-center justify-center py-2">
                <GiDuck size={40} color="#007ea7" />
              </div>
              <p className="pt-4 text-base text-gray-300">
                Cool statistics about your league.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/power-rankings">
          <div className="mb-8  flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] shadow-lg  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
            <div className="px-6 py-6">
              <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                Power Rankings
              </div>
              <div className="flex items-center justify-center py-2">
                <ImPower size={40} color="#007ea7" />
              </div>
              <p className="pt-4 text-base text-gray-300">
                Team evaluation according to our rankings.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/draft-report">
          <div className="mb-8  flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] shadow-lg  hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
            <div className="px-6 py-6">
              <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                Draft Report
              </div>
              <div className="flex items-center justify-center py-2">
                <GiAmericanFootballPlayer size={40} color="#007ea7" />
              </div>
              <p className="pt-4 text-base text-gray-300">
                Evaluate Hit/Miss per round for your past rookie drafts.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Tools;
