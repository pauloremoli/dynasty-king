import { MetaFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { getPlayers } from "~/api/fleaflicker";
import Settings from "~/components/tradeCalculator/Settings";
import Team from "~/components/tradeCalculator/Team";
import TradeAnalysis from "~/components/tradeCalculator/TradeAnalysis";
import styles from "~/styles/customSelect.css";
import { Format } from "~/types/Format";
import { filterDataByFormat } from "~/utils/players";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const loader = async ({ params }) => {
  const { format } = params;

  const result = await getPlayers();

  result.data = filterDataByFormat(result.data, format);
  return result.data;
};

export const meta: MetaFunction = () => {
  return {
    title: "Trade Calculator - Dynasty King",
  };
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
    <div className="w-full h-full flex justify-center md:min-h-screen  animate-fadeIn">
      <div className="flex flex-col w-full max-w-5xl dark:text-gray-200 ">
        <h1 className="text-2xl font-semibold tracking-wide text-center pb-8 md:pt-20 pt-8">
          Trade Calculator
        </h1>

        <Settings format={format} />
        <div className="flex flex-col md:flex-row max-w-5xl w-full justify-center gap-4 mb-4">
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

        <div className="flex flex-col md:flex-row max-w-5xl w-full justify-center gap-4 mb-4">
          <TradeAnalysis totalValueA={totalValueA} totalValueB={totalValueB} />
        </div>
      </div>
    </div>
  );
};

export default TradeCalculator;
