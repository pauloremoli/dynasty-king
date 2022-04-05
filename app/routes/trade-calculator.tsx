import { useLoaderData } from "@remix-run/react";
import React from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import Navbar from "~/components/Navbar";
import { csvToJson } from "~/utils/csvToJson";
import styles from "~/styles/customSelect.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({ params }) => {
  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  return csvToJson(await response.text());
};

const TradeCalculator = () => {
  const data = useLoaderData();
  const players = data.data.map((item: any) => ({
    name: `${item.player} ${item.pos} ${item.team}`,
    value: item.fp_id,
  }));

  return (
    <>
      <div className="bg-slate-900 text-gray-200 h-screen w-screen flex justify-center">
        <Navbar />
        <div className="max-w-7xl flex flex-col h-full w-full items-center pt-24">
          <h1 className="text-4xl font-bold text-center pb-20">
            Trade Calculator
          </h1>
          <form>
            <div className="flex w-full justify-around gap-4">
              <div className="shadow-lg bg-[#003459] rounded-2xl py-8 px-12">
                <h2 className="pb-8 text-2xl font-bold text-center ">
                  Team A
                </h2>
                <div className="flex w-full justify-around gap-4 items-center text-gray-900">
                  <SelectSearch
                    options={players}
                    search
                    filterOptions={fuzzySearch}
                    placeholder="Select a player"
                    filterOptions={(options) => {
                      const filter = fuzzySearch(options);
                      return (q) => filter(q).slice(0, 12);
                    }}
                  />
                  <button className="bg-blue-400 text-white px-8 py-2 rounded-xl">
                    Add
                  </button>
                </div>
              </div>

              <div className="shadow-lg  bg-[#003459] rounded-2xl py-8 px-12">
                <h2 className="pb-8 text-2xl font-bold text-center ">
                  Team B
                </h2>
                <div className="flex w-full justify-around gap-4 items-center text-gray-900">
                  <SelectSearch
                    options={players}
                    search
                    filterOptions={fuzzySearch}
                    placeholder="Select a player"
                    filterOptions={(options) => {
                      const filter = fuzzySearch(options);
                      return (q) => filter(q).slice(0, 12);
                    }}
                  />
                  <button className="bg-blue-400 text-white px-8 py-2 rounded-xl">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TradeCalculator;
