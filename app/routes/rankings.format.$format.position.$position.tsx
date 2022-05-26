import { MetaFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import Filters from "~/components/rankings/Filters";
import Table from "~/components/rankings/Table";
import { Format } from "~/types/Format";
import { Position } from "~/types/Position";
import { csvToJson } from "~/utils/csvToJson";
import {
  createReactTableColumn,
  filterDataByFormat,
  filterDataByPosition,
} from "~/utils/players";

export const loader = async ({ params }) => {
  const { format, position } = params;

  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  let result = csvToJson(await response.text());

  result.columns = result.columns.map((item) => {
    return createReactTableColumn(item);
  });

  result.data = filterDataByFormat(result.data, format as Format);
  if (position && position !== Position.ALL) {
    result.data = filterDataByPosition(result.data, position as Position);
  }

  return result;
};


export const meta: MetaFunction = () => {
  return {
    title: "Rankings - Dynasty King",
  };
};

export default function Rankings() {
  const data = useLoaderData();
  const params = useParams();
  const [format, setFormat] = useState(params.format as Format);
  const [position, setPosition] = useState(params.position as Position);

  useEffect(() => {
    setFormat(params.format as Format);
    setPosition(params.position as Position);
  }, [params]);

  return (
    <div className="w-full flex justify-center bg-slate-900">
      <div className="w-full max-w-5xl text-gray-200 bg-slate-900">
        <h1 className="text-sans text-center p-10 text-xl font-bold">
          {position === Position.ALL
            ? format == Format.FORMAT_1QB
              ? "1QB "
              : "SuperFlex "
            : ""}
          Dynasty {position !== Position.ALL ? position : ""} Rankings{" "}
          {new Date().getFullYear()}{" "}
        </h1>
        <Filters format={format} position={position} onlyRookies={false} />
        <div className="flex flex-col">
          {data ? (
            <Table data={data.data} columns={data.columns} />
          ) : (
            <h3>No data available</h3>
          )}
        </div>
      </div>
    </div>
  );
}
