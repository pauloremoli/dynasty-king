import { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return {
    title: "About - Dynasty King",
  };
};

const About = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col w-full h-full items-center justify-start pt-20 dark:text-white max-w-5xl font-extralight text-left p-4">
        <h1 className="text-2xl font-bold text-center pb-10">About</h1>
        <p className="w-full">
          This project is open source on{" "}
          <a
            href="https://github.com/pauloremoli/dynasty-king/issues"
            className="underline pl-1"
          >
            GitHub
          </a>
          , feel free to contribute =D
        </p>
        <p className="w-full">
          If you have any ideas for new tools or suggestions on how to improve
          current tools, please let me know.
        </p>
        <p className="font-semibold w-full pt-8">Data</p>
        <p className=" w-full">
          Data used for rankings are based on
          <a
            href="https://github.com/dynastyprocess/data"
            className="underline pl-1"
          >
            Dynasty Process
          </a>
        </p>
        <p className="font-semibold w-full pt-8 ">Bug reports</p>
        <p className="w-full">
          Issues can be reported on{" "}
          <a
            href="https://github.com/pauloremoli/dynasty-king/issues"
            className="underline pl-1"
          >
            GitHub Issues
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default About;
