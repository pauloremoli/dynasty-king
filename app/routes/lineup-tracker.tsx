import { useLoaderData } from "@remix-run/react";
import React from "react";

export const loader: LoaderFunction = async ({ request }) => {
  return {db: process.env.DATABASE_URL}
};

const LineupTracker = () => {
  const { db } = useLoaderData();
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-4xl font-bold text-center pb-20">Lineup Tracker</h1>
        <h2>Work in progress... {db}</h2>
        {/* TODO: Implement Lineup tracker */}
      </div>
    </>
  );
};

export default LineupTracker;
