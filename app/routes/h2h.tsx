import React from "react";
import Navbar from "~/components/Navbar";

const H2H = () => {
  return (
    <>
      <div className="bg-slate-800 text-gray-200 h-screen w-screen">
        <Navbar />
        <h1 className="text-4xl font-bold text-center text-white pb-20 pt-20 w-full h-full">
          H2H
        </h1>
      </div>
    </>
  );
};

export default H2H;
