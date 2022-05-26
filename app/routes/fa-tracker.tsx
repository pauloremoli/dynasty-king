import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return {
    title: "Free Agente Tracker - Dynasty King",
  };
};

const FATracker = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white animate-fadeIn">
        <h1 className="text-4xl font-bold text-center pb-20">FA Tracker</h1>
        <h2>Work in progress...</h2>
      </div>
      {/* TODO: Implement FA Tracker */}
    </>
  );
};

export default FATracker;
