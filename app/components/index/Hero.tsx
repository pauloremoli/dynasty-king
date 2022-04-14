import React from "react";
import { FaCrown } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="flex w-full max-w-7xl justify-center p-4">
      <div>
        <div className="flex justify-center">
          <FaCrown color="yellow" size={70} />
        </div>
        <h1 className="pb-8 text-center text-4xl font-bold tracking-wider text-white">
          Dynasty King
        </h1>
        <p className="pb-8 text-center text-xl font-thin text-[#caf0f8] md:pb-20">
          Collection of tools that will help you become the King of your dynasty
          leagues.
        </p>
      </div>
    </div>
  );
};

export default Hero;
