import { Link } from "@remix-run/react";
import React, { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { useOptionalUser } from "~/utils/userUtils";

const Navbar = () => {
  const user = useOptionalUser();

  useEffect(() => {
    console.log(user?.username);
  }, [user]);

  return (
    <div className="fixed h-18 flex bg-slate-900 w-full items-center justify-center text-white z-10">
      <div className="max-w-7xl flex items-center justify-start w-full">
        <a href="/" className="flex tems-center md:pl-20 px-8 py-4">
          <div className="flex items-center pr-2">
            <FaCrown color="yellow" size={30} />
          </div>
          <h1 className="text-lg  font-bold ">DK</h1>
        </a>

        <div className="ml-auto mr-auto font-thin justify-center">
          <a href="/">
            <span className="px-8 hover:text-yellow-400 hover:underline">Home</span>
          </a>
          <a href="/tools">
            <span className="px-8 hover:text-yellow-400 hover:underline">Tools</span>
          </a>
          <a href="/team-selection">
            <span className="px-8 hover:text-yellow-400 hover:underline">My Teams</span>
          </a>
          
          <a href="/about">
            <span className="px-8 hover:text-yellow-400 hover:underline">About</span>
          </a>
        </div>

        <div className="ml-auto invisible md:visible md:pr-20 px-8">
          {user ? (
            <div className="flex">
              <h3 className="font-semibold pr-2">{user.username}</h3>
              <Link to="/logout">
                <span className="font-light hover:text-yellow-400 hover:underline">( logout )</span>
              </Link>
            </div>
          ) : (
            <div className="font-extralight">
              <a href="/login">
                <span className="px-8 hover:text-yellow-400 hover:underline">Login</span>
              </a>
              <a href="/signup">
                <span className="px-8 hover:text-yellow-400 hover:underline">Sign-up</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
