import React from "react";
import { FaCrown } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#36327a] dark:bg-slate-900 h-full w-full md:py-32 px-4 items-center justify-center text-white">
      <div className="flex flex-col md:flex-row max-w-5xl items-center  h-full ">
        <div className="flex flex-col h-full w-full justify-center  max-w-5xl items-center">
          <div className="flex max-w-5xl mx-auto my-auto flex-col pt-10 md:pt-0 justify-center ">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-wider dark:text-white md:text-left text-center first-letter:text-[#ffff00] uppercase">
              Dynasty
            </h1>

            <h1 className="pb-8 text-3xl md:text-6xl font-extrabold tracking-wider dark:text-white md:text-left text-center first-letter:text-[#ffff00] uppercase">
              King
            </h1>
          </div>
          <p className="pt-4 md:pt-8 text-xl md:text-2xl md:text-left text-center text-gray-200">
            Collection of tools that will help you dominate your dynasty
            leagues.
          </p>
        </div>
        <div className="flex w-full h-full items-start justify-start py-12 md:py-0 max-w-5xl">
          <img src="game_day.svg" alt="Game day" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
