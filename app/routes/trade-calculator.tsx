import React from "react";
import Navbar from "~/components/Navbar";

const TradeCalculator = () => {
  return (
    <>
      <div className="bg-slate-800 text-gray-200 h-screen w-screen">
        <Navbar />
        <h1 className="text-4xl font-bold text-center text-white pb-20 pt-20 w-full h-full">
          Trade Calculator
        </h1>
      </div>
    </>
  );
};

export default TradeCalculator;
