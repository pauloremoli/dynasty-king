import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getUsers } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getUsers();

  return { data };
};

const Tools = () => {

  const { data } = useLoaderData();
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-4xl font-bold text-center pb-20">Tools</h1>
        <pre>Users: {JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
};

export default Tools;
