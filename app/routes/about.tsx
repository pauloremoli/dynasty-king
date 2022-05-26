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
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-4xl font-bold text-center pb-20">About</h1>
        <h2>Work in progress...</h2>
      </div>
    </>
  );
};

export default About;
