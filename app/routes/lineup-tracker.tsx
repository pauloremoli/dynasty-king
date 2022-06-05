import React from "react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Lineup Tracker - Dynasty King",
  };
};

const LineupTracker = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full h-full items-center pt-24 dark:text-white animate-fadeIn">
        <h1 className="text-4xl font-bold text-center pb-20">Lineup Tracker</h1>
        <h2>Work in progress...</h2>
        {/* TODO: Implement Lineup tracker */}
      </div>
    </>
  );
};

export default LineupTracker;
