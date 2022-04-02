import React from "react";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed h-18 flex bg-slate-900 w-full items-center">
      <a href="/" className="flex tems-center pl-20  p-4">
        <div className="flex items-center pr-2">
          <FaCrown color="white" size={30} />
        </div>
        <h1 className="text-xl text-white ">DK</h1>
      </a>
    </div>
  );
};

export default Navbar;
