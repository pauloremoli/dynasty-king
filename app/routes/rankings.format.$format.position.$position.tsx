import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "~/components/rankings/Table";
import { Format } from "~/models/Format";
import { Position } from "~/models/Position";
import { csvToJson } from "~/utils/csvToJson";
import {
  filterDataByFormat,
  filterDataByPosition,
  sortMethod,
} from "~/utils/players";

const createReactTableColumn = (item: string) => {
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

export default function Index() {
  const data = useLoaderData();
  const params = useParams();
  const [format, setFormat] = useState(params.format as Format);
  const [position, setPosition] = useState(params.position as Position);

  useEffect(() => {
    setFormat(params.format as Format);
    setPosition(params.position as Position);
  }, [params]);

  return (
    <>
      <div className="w-full h-full bg-slate-800 flex justify-center">
        <div className="max-w-7xl text-gray-200 pt-14">
          <h1 className="text-sans text-center p-10 text-xl font-bold">
            {format == Format.FORMAT_1QB ? "1QB " : "SuperFlex "}
            Dynasty Rankings {new Date().getFullYear()}{" "}
          </h1>
          <div className="flex p-4">
            <h3 className="">Format:</h3>
            <div className="px-4">
              <Link
                to={"/rankings/format/1QB/position/all"}
                className={`font-semibold hover:text-yellow-300 ${
                  format === Format.FORMAT_1QB
                    ? "text-blue-400"
                    : "text-blue-100"
                }`}
              >
                <span>1QB</span>
              </Link>
            </div>

            <div>
              <Link
                to={"/rankings/format/2QB/position/all"}
                className={`font-semibold hover:text-yellow-300 ${
                  format === Format.FORMAT_2QB
                    ? "text-blue-400"
                    : "text-blue-100"
                }`}
              >
                <span>SuperFlex (2QBs)</span>
              </Link>
            </div>
          </div>
          <div className="flex p-4 gap-4">
            <h3 className="">Position:</h3>
            <div>
              <Link
                to={`/rankings/format/${format}/position/all`}
                className={`font-semibold hover:text-yellow-300 ${
                  position === Position.ALL ? "text-blue-400" : "text-blue-100"
                }`}
              >
                <span>All</span>
              </Link>
            </div>
            <div>
              <Link
                to={`/rankings/format/${format}/position/QB`}
                className={`font-semibold hover:text-yellow-300 ${
                  position === Position.QB ? "text-blue-400" : "text-blue-100"
                }`}
              >
                <span>QB</span>
              </Link>
            </div>
            <div>
              <Link
                to={`/rankings/format/${format}/position/RB`}
                className={`font-semibold hover:text-yellow-300 ${
                  position === Position.RB ? "text-blue-400" : "text-blue-100"
                }`}
              >
                <span>RB</span>
              </Link>
            </div>
            <div>
              <Link
                to={`/rankings/format/${format}/position/WR`}
                className={`font-semibold hover:text-yellow-300 ${
                  position === Position.WR ? "text-blue-400" : "text-blue-100"
                }`}
              >
                <span>WR</span>
              </Link>
            </div>
            <div>
              <Link
                to={`/rankings/format/${format}/position/TE`}
                className={`font-semibold hover:text-yellow-300 ${
                  position === Position.TE ? "text-blue-400" : "text-blue-100"
                }`}
              >
                <span>TE</span>
              </Link>
            </div>
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
