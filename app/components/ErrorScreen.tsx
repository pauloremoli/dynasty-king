import { Links, Meta } from "@remix-run/react";
import React from "react";
import Layout from "./Layout";

const ErrorScreen = () => {
  return (
    <div className="flex flex-col py-12 items-center justify-center text-2xl text-center dark:text-white p-4 h-screen">
      <p>Something went wrong</p>
      <p>Try reloading the page.</p>
    </div>
  );
};
export default ErrorScreen;
