import React, { useEffect, useState } from "react";

interface TradeAnalysisProps {
  totalValueA: number;
  teamAName: string;
  totalValueB: number;
  teamBName: string;
}
const TradeAnalysis = ({
  totalValueA,
  teamAName,
  totalValueB,
  teamBName,
}: TradeAnalysisProps) => {
  console.log("Names", teamAName, teamBName);

  const [valueA, setValueA] = useState(totalValueA);
  const [valueB, setValueB] = useState(totalValueB);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const max = Math.max(valueA, valueB);
    setDifference((Math.abs(valueA - valueB) * 100) / max);
    console.log(valueA > valueB);
    
  }, [valueA, valueB]);

  useEffect(() => {
    setValueA(totalValueA);
  }, [totalValueA]);

  useEffect(() => {
    setValueB(totalValueB);
  }, [totalValueB]);

  if (totalValueA == 0 || totalValueB == 0) return null;

  return (
    <div
      className={`flex flex-col justify-center p-8 dark:shadow-md rounded-xl w-full md:w-96 dark:bg-[#003459]`}
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-center pb-2 text-2xl font-semibold ">
          Trade Analysis
        </h1>
        <div className="flex flex-col justify-center items-center">
          {(Math.round(difference * 100) / 100).toFixed(0) === "0" ? (
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
                  valueA < valueB ? "dark:text-blue-400" : "dark:text-red-400"
                }`}
              >
                {valueA < valueB ? teamAName : teamBName}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeAnalysis;
