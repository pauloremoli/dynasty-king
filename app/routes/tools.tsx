import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return {
    title: "Tools - Dynasty King",
  };
};

const Tools = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center md:pt-10 pt-4 dark:bg-[#0A1931] dark:text-gray-100 animate-fadeIn px-4 pb-20">
        <div className="flex flex-col h-full w-full max-w-5xl">
          <h1 className="text-2xl font-bold text-center pb-10 dark:text-white">Tools</h1>
          <div className="flex flex-col w-full dark:text-gray-300 text-gray-800">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/rankings/format/1QB/position/all">Dynasty Rankings</a>
            </h1>
            <p className="pb-8">
              PPR dynasty rankings based on data from
              <a
                href="https://github.com/dynastyprocess/data"
                className="underline pl-1"
              >
                Dynasty Process
              </a>
            </p>
            <div className="flex font-semibold flex-col gap-1 ">
              <a href="/rankings/format/1QB/position/all">1QB Rankings</a>
              <a href="/rankings/format/2QB/position/all">
                Super Flex Rankings
              </a>
              <a href="/rankings/format/1QB/position/QB" className="pt-4">
                Quarterback Rankings
              </a>
              <a href="/rankings/format/1QB/position/RB">
                Running Back Rankings
              </a>
              <a href="/rankings/format/1QB/position/WR">
                Wide Receiver Rankings
              </a>
              <a href="/rankings/format/1QB/position/TE">Tight End Rankings</a>
              <a href="/rookie_rankings/format/1QB/position/all">
                Rookie Rankings
              </a>
            </div>
          </div>
          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/trade-calculator/format/1QB">Trade Calculator</a>
            </h1>
            <p className="">
              Adjust calculator according to your league settings and personal
              preferences.
            </p>
          </div>

          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/duck-report">Duck Report</a>
            </h1>
            <p>Cool statistics about your league history</p>
            <ul className="px-4 list-disc">
              <li>League Winners</li>
              <li>2nd, 3rd, and last place finishes</li>
              <li>Playoff Appearances</li>
              <li>All time record - Regular season & Postseason</li>
            </ul>
          </div>
          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/h2h">H2H Report</a>
            </h1>
            <p>All time H2H record against your league mates.</p>
          </div>

          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/power-ranking">Power Ranking</a>
            </h1>
            <p>
              Roster value analysis for all teams in your league according to
              our rankings
            </p>
          </div>
          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/draft-report">Draft Report</a>
            </h1>
            <p>Evaluate your Hit/Miss rate based on your drafted rookies.</p>
          </div>
          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/fa-tracker">Free Agent Tracker</a>
            </h1>
            <p>
              Add a player to the watchlist to see in which leagues he is
              available in FA.
            </p>
          </div>
          <div className="flex flex-col w-full dark:text-gray-300  text-gray-800 md:pt-20 pt-8">
            <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
              <a href="/lineup-tracker">Lineup Tracker</a>
            </h1>
            <p>Check all your lineups for inactive players.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
