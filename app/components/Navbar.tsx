import { Form, Link } from "@remix-run/react";
import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import { useOptionalUser } from "~/utils/userUtils";

const Navbar = () => {
  const user = useOptionalUser();
  return (
    <div className="fixed h-18 flex  w-full items-center justify-center text-white z-10">
      <nav className="w-full  max-w-7xl bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-slate-900">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a href="/" className="flex tems-center md:pl-20 px-8 py-4">
            <div className="flex items-center pr-2">
              <FaCrown color="yellow" size={30} />
            </div>
            <h1 className="text-lg  font-bold ">DK</h1>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-bg-slate-700 dark:hover:bg-slate-900 "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden md:flex md:order-2 ml-auto">
            {user ? (
              <div className="flex items-center">
                <h3 className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                  {user.username}
                </h3>
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="mx-4 text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                  >
                    Logout
                  </button>
                </Form>
              </div>
            ) : (
              <div className="mt-4 md:flex-row  md:mt-0 md:text-sm md:font-medium">
                <a
                  href="/login"
                  className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="mx-4 bg-white text-blue-700 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:white dark:hover:bg-blue-100 dark:focus:ring-blue-800"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 md:pl-32 ">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="/">
                  <span className="px-8 hover:text-yellow-400 hover:underline">
                    Home
                  </span>
                </a>
              </li>
              <li>
                <a href="/tools">
                  <span className="px-8 hover:text-yellow-400 hover:underline">
                    Tools
                  </span>
                </a>
              </li>
              <li>
                <a href="/team-selection">
                  <span className="px-8 hover:text-yellow-400 hover:underline">
                    My Teams
                  </span>
                </a>
              </li>

              <li>
                <a href="/about">
                  <span className="px-8 hover:text-yellow-400 hover:underline">
                    About
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
