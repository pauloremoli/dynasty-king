import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Outlet, useActionData, useTransition } from "@remix-run/react";
import React from "react";
const DuckReport = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-4xl font-bold text-center pb-20">Duck Report</h1>

      </div>
    </>
  );
};

export default DuckReport;
