import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return {
    title: "Draft Report - Dynasty King",
  };
};

const DraftReport = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white animate-fadeIn">
        <h1 className="text-4xl font-bold text-center pb-20">Draft Report</h1>
        <h2>Work in progress...</h2>
      </div>
      {/* TODO: Implement draft report */}
    </>
  );
};

export default DraftReport;
