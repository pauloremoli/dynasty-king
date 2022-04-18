import { Link } from "@remix-run/react";
import React, { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { useOptionalUser } from "~/utils/userUtils";

const Navbar = () => {
  const user = useOptionalUser();

  useEffect(() => {
    console.log(user?.username);
    
  }, [user])
  

  return (
    <div className="fixed h-18 flex bg-slate-900 w-full items-center justify-center text-white z-10">
      <div className="max-w-7xl flex items-center justify-start w-full">
        <a href="/" className="flex tems-center md:pl-20 px-8 py-4">
          <div className="flex items-center pr-2">
            <FaCrown color="yellow" size={30} />
          </div>
          <h1 className="text-lg  font-bold ">DK</h1>
        </a>

        <div className="ml-auto invisible md:visible md:pr-20 px-8">
          {user ? (
            <div className="flex">
              <h3 className="font-bold pr-2">{user.username}</h3>
              <Link to="/logout">
                <span className="font-light">( logout )</span>
              </Link>
            </div>
          ) : (
            <div className="font-extralight">
              <a href="/login">
                <span className="px-8 hover:font-bold">LOGIN</span>
              </a>
              <a href="/signup">
                <span className="px-8 hover:font-bold">SIGN-UP</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
