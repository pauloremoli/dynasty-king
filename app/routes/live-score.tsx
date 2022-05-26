import React from "react";

import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Live Score - Dynasty King",
  };
};

const LiveScore = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white animate-fadeIn">
        <h1 className="text-4xl font-bold text-center pb-20">Live Score</h1>
        <h2>Work in progress...</h2>
      </div>

      {/* TODO: Implement live score */}
    </>
  );
};

export default LiveScore;
