import { useLoaderData, useParams } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import SelectSearch, {
  fuzzySearch,
  SelectedOptionValue,
  SelectSearchOption,
} from "react-select-search";
import Navbar from "~/components/Navbar";
import { csvToJson } from "~/utils/csvToJson";
import styles from "~/styles/customSelect.css";
import { Player } from "~/models/Player";
import { filterDataByFormat } from "~/utils/players";
import { Format } from "~/models/Format";
import ListPlayers from "~/components/tradeCalculator/ListPlayers";
import Team from "~/components/tradeCalculator/Team";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({ params }) => {
  const { format } = params;

  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  let result = csvToJson(await response.text());

  result.data = filterDataByFormat(result.data, format);
  return result.data;
};

const TradeCalculator = () => {
  const params = useParams();
  const [format, setFormat] = useState(params.format as Format);
  const [totalValueA, setTotalValueA] = useState(0);
  const [totalValueB, setTotalValueB] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    setFormat(params.format as Format);
  }, [params]);

  useEffect(() => {
    const max = Math.max(totalValueA, totalValueB);
    setDifference((Math.abs(totalValueA - totalValueB) * 100) / max);
  }, [totalValueB, totalValueA]);

  const data = useLoaderData();

  const setTotalValue = (team: string, total: number) => {
    team === "A" ? setTotalValueA(total) : setTotalValueB(total);
  };

  return (
    <>
      <div className="bg-slate-900 text-gray-200 h-full min-h-screen w-screen flex justify-center">
        <Navbar />
        <div className="max-w-7xl flex flex-col h-full w-full items-center pt-24">
          <h1 className="text-4xl font-semibold tracking-wide text-center pb-20">
            Trade Calculator
          </h1>

          <div className="flex  w-full justify-center gap-4">
            <Team
              allPlayers={data}
              team={"A"}
              format={format}
              setTotalValue={setTotalValue}
            />
            <Team
              allPlayers={data}
              team={"B"}
              format={format}
              setTotalValue={setTotalValue}
            />
          </div>

          {totalValueA !== 0 && totalValueB !== 0 && (
            <div className="flex flex-col p-8 bg-blue-900 rounded-xl  w-80 h-full my-12 ">
              <h1 className="text-center pb-2 font-semibold ">
                Trade Analysis
              </h1>
              <div className="flex flex-col justify-center items-center">
                {difference === 0 ? (
                  <span className="text-3xl">Fair trade</span>
                ) : (
                  <>
                    <span
                      className={`text-center pl-2 text-2xl ${
                        difference < 5 ? "text-green-500" : "text-red-600"
                      }`}
                    >
                      {(Math.round(difference * 100) / 100).toFixed(0)}%
                    </span>
                    <span>in favor of</span>
                    <span
                      className={`text-center pl-2 text-3xl ${
                        totalValueA > totalValueB
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      Team {totalValueA > totalValueB ? "A" : "B"}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TradeCalculator;
