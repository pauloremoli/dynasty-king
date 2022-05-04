import React, { useEffect, useState } from "react";

interface TradeAnalysisProps {
  totalValueA: number;
  totalValueB: number;
}
const TradeAnalysis = ({ totalValueA, totalValueB }: TradeAnalysisProps) => {
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const max = Math.max(totalValueA, totalValueB);
    setDifference((Math.abs(totalValueA - totalValueB) * 100) / max);
  }, [totalValueB, totalValueA]);

  if (totalValueA == 0 || totalValueB == 0) return null;

  return (
    <div
      className={`flex flex-col p-8 border-2 shadow-md rounded-xl w-full md:w-96 h-full ${
        difference > 5
          ? totalValueA > totalValueB
            ? "border-blue-600"
            : "border-red-600"
          : "border-green-600"
      }`}
    >
      <div className="flex flex-col">
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
                  totalValueA > totalValueB ? "text-blue-600" : "text-red-600"
                }`}
              >
                Team {totalValueA > totalValueB ? "A" : "B"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeAnalysis;
