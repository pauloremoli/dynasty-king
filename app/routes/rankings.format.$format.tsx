import { ActionFunction } from "@remix-run/node";
import {
  useLoaderData,
  useParams,
  useSubmit,
  useSearchParams,
} from "@remix-run/react";
import fuzzysort from "fuzzysort";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Table from "~/components/rankings/Table";

const sortMethod = (a: string, b: string) => {
  const valueA = parseInt(a);
  const valueB = parseInt(b);
  return valueA > valueB ? -1 : 1;
};

const sortFor1QB = (a: any, b: any) => {
  const valueA = a.value_1qb;
  const valueB = b.value_1qb;
  return sortMethod(valueA, valueB);
};

const sortFor2QB = (a: any, b: any) => {
  const valueA = a.value_2qb;
  const valueB = b.value_2qb;
  return sortMethod(valueA, valueB);
};

const getCustomProperties = (item: string) => {
  const result: any = {
    accessor: item,
  };

  switch (item) {
    case "player":
      result["Header"] = "Player";
      break;
    case "pos":
      result["Header"] = "Position";
      break;
    case "team":
      result["Header"] = "Team";
      break;
    case "age":
      result["Header"] = "Age";
      break;
    case "draft_year":
      result["Header"] = "Year drafted";
      break;
    case "ecr_1qb":
      result["Header"] = "Avg ranking 1QB";
      break;
    case "ecr_2qb":
      result["Header"] = "Avg ranking 2QB";
      break;
    case "ecr_pos":
      result["Header"] = "Position ranking";
      break;
    case "value_1qb":
      result["Header"] = "Value 1QB";
      result["sortMethod"] = sortMethod;
      result["sortInverted"] = true;
      break;
    case "value_2qb":
      result["Header"] = "Value 2QB";
      result["sortMethod"] = sortMethod;
      result["sortInverted"] = true;
      break;
    case "scrape_date":
      result["Header"] = "Last update";
      break;
    case "fp_id":
      result["Header"] = "Id";
      break;
    default:
      result["Header"] = item;
      break;
  }
  return result;
};

const filterDataByPosition = (result: any, position: string) => {
  if (position && position !== "all") {
    result.data = result.data.filter((item: any) => item.pos === position);
  }

  return result;
};

const filterDataByFormat = (result: any, format: string) => {
  if (format == "2QB") {
    result.columns = result.columns.filter(
      (col: Column) => col.accessor !== "value_1qb"
    );
    result.data.sort(sortFor2QB);
  } else {
    result.columns.filter((col: Column) => col.accessor !== "value_2qb");
    result.data.sort(sortFor1QB);
  }

  return result;
};

const csvToJson = (input: string) => {
  const data = input.split("\n");
  let result = [];

  let headers = data[0].split(",");
  let columns = headers.map((item) => {
    item = item.replace(/"/g, "");
    return getCustomProperties(item);
  });

  for (let i = 1; i < data.length - 1; i++) {
    let obj: any = {};

    let str = data[i];
    str = str.replace(/"/g, "");

    let properties = str.split(",");
    columns.map((item, index) => {
      const value = properties[index].replace(/"/g, "");
      obj[item.accessor] = value;
    });

    result.push(obj);
  }

  return { columns, data: result };
};

export const loader = async ({ params }) => {
  const { format } = params;

  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  let result = csvToJson(await response.text());

  return filterDataByFormat(result, format);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("formData", formData);
};

export default function Index() {
  const submit = useSubmit();
  const data = useLoaderData();
  const params = useParams();
  const format = params.format;

  return (
    <>
      <div className="w-full h-full bg-slate-800 flex justify-center">
        <div className="max-w-7xl text-gray-200 pt-14">
          <h1 className="text-sans text-center p-10 text-xl font-bold">
            {format == "1QB" ? "1QB " : "SuperFlex "}
            Dynasty Rankings {new Date().getFullYear()}{" "}
          </h1>
          <div className="flex p-4">
            <h3 className=""> Rankings:</h3>
            <div className="px-4">
              <Link to={"/rankings/format/1QB"}>
                <a className="font-bold text-blue-100 hover:text-yellow-300">
                  <span>1QB</span>
                </a>
              </Link>
            </div>

            <div>
              <Link to={"/rankings/format/2QB"}>
                <a className="font-bold text-blue-100 hover:text-yellow-300">
                  <span>SuperFlex (2QBs)</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex p-4 items-center">
            <form method="GET">
              <label htmlFor="position" className="pr-4">
                Position:
              </label>
              <select
                name="position"
                className="text-gray-900 border-0 rounded-xl"
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
              >
                <option selected value="All">
                  All
                </option>
                <option value="QB">QB</option>
                <option value="RB">RB</option>
                <option value="WR">WR</option>
                <option value="TE">TE</option>
              </select>
            </form>
          </div>

          <div className="flex flex-col">
            {data ? (
              <Table data={data.data} columns={data.columns} />
            ) : (
              <h3>No data available</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
