import { Link } from "@remix-run/react";
import React from "react";
import {
  GiDuck,
  GiScales,
  GiFaceToFace,
  GiAmericanFootballPlayer,
} from "react-icons/gi";
import { MdFindInPage, MdLiveTv } from "react-icons/md";
import { AiOutlineAlert } from "react-icons/ai";
import { ImListNumbered, ImPower } from "react-icons/im";

const Tools = () => {
  return (
    <div className=" ml-auto mr-auto w-full">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex md:flex-row flex-col gap-4 p-4 w-full justify-center">
          <Link to="/rankings/format/1QB/position/all">
            <div className="flex h-56 w-full flex-col  self-center  overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Dynasty Rankings
                </div>
                <div className="flex items-center justify-center py-2">
                  <ImListNumbered size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  PPR rankings for SuperFlex, 1QB, rookies.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/trade-calculator/format/1QB">
            <div className="flex h-56 w-full flex-col  self-center  overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Trade Calculator
                </div>
                <div className="flex items-center justify-center py-2">
                  <GiScales size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Adjust settings according to your league and personal
                  preferences.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/power-rankings">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Power Rankings
                </div>
                <div className="flex items-center justify-center py-2">
                  <ImPower size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Team evaluation according to our rankings.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex md:flex-row flex-col gap-4 p-4 w-full pt-0  justify-center">
          <Link to="/h2h">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  H2H Report
                </div>

                <div className="flex items-center justify-center py-2">
                  <GiFaceToFace size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  H2H record against your league mates.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/duck-report">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Duck Report
                </div>

                <div className="flex items-center justify-center py-2">
                  <GiDuck size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Cool statistics about your league.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/draft-report">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Draft Report
                </div>
                <div className="flex items-center justify-center py-2">
                  <GiAmericanFootballPlayer size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Evaluate Hit/Miss per round for your past rookie drafts.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex md:flex-row flex-col gap-4 p-4 w-full pt-0  justify-center">
          <Link to="/fa-tracker">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Free Agent Tracker
                </div>
                <div className="flex items-center justify-center py-2">
                  <MdFindInPage size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Add a player to the watchlist to see in which leagues he is
                  available in FA.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/live-score">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Live Score
                </div>
                <div className="flex items-center justify-center py-2">
                  <MdLiveTv size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Check the score of all your games in one place.
                </p>
              </div>
            </div>
          </Link>
          <Link to="/lineup-tracker">
            <div className="flex h-56 w-full  flex-col overflow-hidden rounded-lg bg-[#003459] hover:bg-[#003459d0] hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
              <div className="px-6 py-6">
                <div className="mb-2 text-center text-xl font-semibold text-[#caf0f8]">
                  Lineup Tracker
                </div>
                <div className="flex items-center justify-center py-2">
                  <AiOutlineAlert size={40} color="#007ea7" />
                </div>
                <p className="pt-4 text-base text-gray-300 text-center">
                  Check all your lineups for inactive players.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools;
