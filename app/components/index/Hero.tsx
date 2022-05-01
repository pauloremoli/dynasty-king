import React from "react";
import { FaCrown } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:my-32 px-4 items-center">
      <div className="flex flex-col h-full w-full">
        <div className="flex w-full justify-center ">
          <FaCrown color="yellow" size={70} />
        </div>
        <div className="flex mx-auto flex-col pt-1">
          <h1 className="text-4xl font-extrabold tracking-wider text-white  first-letter:text-[#ffff00] uppercase">
            Dynasty
          </h1>

          <h1 className="pb-8 text-4xl font-extrabold tracking-wider text-white first-letter:text-[#ffff00] uppercase">
            King
          </h1>
        </div>
        <p className="pb-8 text-xl text-[#caf0f8]">
          Collection of tools to help you dominate your dynasty
          leagues.
        </p>
      </div>
      <div className="flex w-full h-full items-start justify-start">
        <img src="game_day.svg" alt="Game day" />
      </div>
    </div>
  );
};

export default Hero;
