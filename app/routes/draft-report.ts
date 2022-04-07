import React from "react";
import Navbar from "~/components/Navbar";

const RookieReport = () => {
  return (
    <>
      <div className="bg-slate-800 text-gray-200 h-screen w-screen">
        <Navbar />

        <div className="flex flex-col w-full h-full items-center pt-24">
          <h1 className="text-4xl font-bold text-center pb-20">
            Draft Report
          </h1>
          <h2>Work in progress...</h2>
        </div>
      </div>
    </>
  );
};

export default RookieReport;
