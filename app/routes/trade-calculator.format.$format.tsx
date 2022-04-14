import { useLoaderData, useParams, Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Settings from "~/components/tradeCalculator/Settings";
import Team from "~/components/tradeCalculator/Team";
import TradeAnalysis from "~/components/tradeCalculator/TradeAnalysis";
import { Format } from "~/types/Format";
import styles from "~/styles/customSelect.css";
import { csvToJson } from "~/utils/csvToJson";
import { filterDataByFormat } from "~/utils/players";

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

  useEffect(() => {
    setFormat(params.format as Format);
  }, [params]);

  const data = useLoaderData();

  const setTotalValue = (team: string, total: number) => {
    team === "A" ? setTotalValueA(total) : setTotalValueB(total);
  };

  return (
    <>
      <div className="max-w-7xl flex flex-col h-full w-full items-center my-24 text-white">
        <h1 className="text-4xl font-semibold tracking-wide text-center pb-8">
          Trade Calculator
        </h1>

        <Settings format={format} />
        <div className="flex max-w-5xl w-full justify-center gap-4 mb-12">
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

        <TradeAnalysis totalValueA={totalValueA} totalValueB={totalValueB} />
      </div>
    </>
  );
};

export default TradeCalculator;
