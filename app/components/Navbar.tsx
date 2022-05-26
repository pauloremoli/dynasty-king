import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { useOptionalUser } from "~/utils/userUtils";
import { FaCrown } from "react-icons/fa";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useOptionalUser();
  return (
    <div>
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center px-4">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <a href="/" className="flex tems-center md:px-8 py-4">
                  <div className="flex items-center pr-2">
                    <FaCrown color="yellow" size={30} />
                  </div>
                  <h1 className="text-lg  font-extrabold font-permanentMarker tracking-wider">
                    DK
                  </h1>
                </a>
              </div>
              <div className="hidden md:block w-full">
                <div className="ml-10 flex items-baseline space-x-4 justify-between w-full">
                  <div>
                    <a
                      href="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </a>

                    <a
                      href="/tools"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Tools
                    </a>

                    <a
                      href="/my-leagues"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Leagues
                    </a>

                    <a
                      href="/about"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      About
                    </a>
                  </div>

                  <div className="hidden md:flex text-white text-sm font-medium">
                    {user ? (
                      <div className="flex items-center">
                        <h3 className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
                          <a
                            href="/user"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {user.username}
                          </a>
                        </h3>
                        <Form action="/logout" method="post">
                          <button
                            type="submit"
                            className="mx-4 text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                          >
                            Logout
                          </button>
                        </Form>
                      </div>
                    ) : (
                      <div className="mt-4 md:flex-row  md:mt-0 ">
                        <a
                          href="/login"
                          className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-[#003459] dark:hover:bg-[#003459d0] dark:hover:border-2 dark:hover:border-blue-100"
                        >
                          Log In
                        </a>
                        <a
                          href="/signup"
                          className="mx-4 bg-white text-[#003459] hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center mr-3 md:mr-0"
                        >
                          Sign Up
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>

                <a
                  href="/tools"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Tools
                </a>

                <a
                  href="/my-leagues"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  My Leagues
                </a>

                <a
                  href="/about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  About
                </a>

                {user ? (
                  <>
                    <a
                      href="/user"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {user.username}
                    </a>
                    <Form action="/logout" method="post">
                      <button
                        type="submit"
                        className="mx-4 text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                      >
                        Logout
                      </button>
                    </Form>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
