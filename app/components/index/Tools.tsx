import { Link } from "@remix-run/react";
import React from "react";
import { AiOutlineAlert } from "react-icons/ai";
import {HiViewGrid} from "react-icons/hi"
import {
  GiAmericanFootballPlayer,
  GiDuck,
  GiFaceToFace,
  GiScales,
} from "react-icons/gi";
import { ImListNumbered, ImPower } from "react-icons/im";
import { MdFindInPage } from "react-icons/md";

const Tools = () => {
  return (
    <div className=" ml-auto mr-auto w-full justify-center py-8 md:py-20 bg-white dark:bg-[#36327a]">
      <div className=" ml-auto mr-auto w-full justify-center py-8 md:py-20 bg-white dark:bg-[#36327a] animate-fadeIn">
        <p className="text-center text-2xl font-bold text-gray-800 dark:text-[rgb(227,221,255)] pb-6 ">
          Tools
        </p>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex md:flex-row flex-col gap-4 p-4 w-full justify-center">
            <Link to="/rankings/format/1QB/position/all">
              <div className="flex h-64 w-full flex-col  self-center  overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)]">
                    Dynasty Rankings
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <ImListNumbered size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    PPR rankings for SuperFlex, 1QB, rookies.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/trade-calculator/format/1QB">
              <div className="flex h-64 w-full flex-col  self-center  overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    Trade Calculator
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <GiScales size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    Adjust settings according to your league and personal
                    preferences.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/duck-report">
              <div className="flex h-64 w-full  flex-col overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    Duck Report
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <GiDuck size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    Cool statistics about your league.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/h2h">
              <div className="flex h-64 w-full  flex-col overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    H2H Report
                  </div>

                  <div className="flex items-center justify-center py-2">
                    <GiFaceToFace size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    H2H record against your league mates.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex md:flex-row flex-col gap-4 p-4 w-full pt-0  justify-center">
            <Link to="/power-ranking">
              <div className="flex h-64 w-full  flex-col overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    Power Ranking
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <ImPower size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    Roster value analysis according to our rankings.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/fa-tracker">
              <div className="flex h-64 w-full  flex-col overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    Free Agent Tracker
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <MdFindInPage size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    Add a player to the watchlist to see in which leagues he is
                    available in FA.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="#">
              <div className="flex h-64 w-full  flex-col overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    Live Score
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <HiViewGrid size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    Check the score for all your leagues in one place.
                  </p>
                  <p className="pt-4 font-bold text-gray-700 dark:text-gray-300 text-center">
                    COMING SOON
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/lineup-tracker">
              <div className="flex h-64 w-full  flex-col overflow-hidden rounded-lg hover:scale-105 hover:border-2 hover:border-slate-100 hover:shadow-indigo-300 md:w-64">
                <div className="px-6 py-10">
                  <div className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-[rgb(227,221,255)] ">
                    Lineup Tracker
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <AiOutlineAlert size={40} color="#8f7eda" />
                  </div>
                  <p className="pt-4 text-base text-gray-700 dark:text-gray-300 text-center">
                    Check all your lineups for inactive players.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
