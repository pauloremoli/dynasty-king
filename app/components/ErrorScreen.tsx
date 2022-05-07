import { Links, Meta } from "@remix-run/react";
import React from "react";
import Layout from "./Layout";

const ErrorScreen = () => {
  return (
    <div className="flex flex-col py-12 md:py-30 h-full items-center text-2xl text-center text-white">
      <p>Oops, something went wrong =/</p>
      <p>Try reloading the page.</p>

      <img src="scared.svg" alt="Error" className="pt-16 h-48" />
    </div>
  );
};
export default ErrorScreen;
