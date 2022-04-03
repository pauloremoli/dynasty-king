import React from "react";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed h-18 flex bg-slate-900 w-full items-center justify-center text-white">
      <div className="max-w-7xl flex items-center justify-start w-full">
        <a href="/" className="flex tems-center pl-20  p-4">
          <div className="flex items-center pr-2">
            <FaCrown color="yellow" size={30} />
          </div>
          <h1 className="text-lg  font-bold ">DK</h1>
        </a>
      </div>
      <div className="flex-end pr-20 font-extralight">
        <a href="/login">
            <span className="px-8 hover:font-bold">LOGIN</span>
        </a>
        <a href="/signup">
            <span className="px-8 hover:font-bold">SIGN-UP</span> 
        </a>
      </div>
    </div>
  );
};

export default Navbar;
