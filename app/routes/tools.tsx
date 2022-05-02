import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getUsers } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { data, prisma } = await getUsers();

  return { data, prisma };
};

const Tools = () => {

  const { data, prisma } = useLoaderData();
  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        <h1 className="text-4xl font-bold text-center pb-20">Tools</h1>
        <pre>Users: {JSON.stringify(data, null, 2}</pre>
        <pre>Primas: {JSON.stringify(prisma, null, 2}</pre>
      </div>
    </>
  );
};

export default Tools;
