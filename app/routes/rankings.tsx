import { Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import Table from "~/components/rankings/Table";
import fuzzysort from "fuzzysort";

const sortMethod = (a: string, b: string) => {
  const valueA = parseInt(a);
  const valueB = parseInt(b);
  return valueA > valueB ? 1 : -1;
};

const comparePlayer1QB = (a: any, b: any) => {
  return sortMethod(a.value_1qb, b.value_1qb);
};

const comparePlayer2QB = (a: any, b: any) => {
  return sortMethod(a.value_2qb, b.value_2qb);
};

const getCustomProperties = (item: string) => {
  const result: any = {
    accessor: item,
  };
  let label;

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

const csvToJson = (input: string) => {
  const data = input.split("\n");
  let result = [];

  // The array[0] contains all the
  // header columns so we store them
  // in headers array
  let headers = data[0].split(",");
  let columns = headers.map((item) => {
    item = item.replace(/"/g, "");
    return getCustomProperties(item);
  });

  // Since headers are separated, we
  // need to traverse remaining n-1 rows.
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

export const loader = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  return csvToJson(await response.text());
};

export default function Index() {
  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState("");
  const [format, setFormat] = useState("value_1qb");
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState(data.data);

  const filterData = () => {
    let dataToFilter = data.data;
    if (position) {
      dataToFilter = dataToFilter.filter((item: any) => item.pos === position);
    }

    if (playerName) {
      const result = fuzzysort.go(playerName, dataToFilter, { key: "player" });
      dataToFilter = result.map((player) => player.obj);
    }

    setFilteredData(dataToFilter);
  };

  useEffect(() => {
    filterData();
  }, [position, data, playerName]);

  useEffect(() => {
    filterData();
  }, []);

  return (
    <>
      <div className="w-full h-full bg-slate-800 flex justify-center">
        <div className="max-w-7xl text-gray-200 pt-14">
          <h1 className="text-sans text-center p-10 text-xl font-bold">
            Dynasty Rankings {new Date().getFullYear()}{" "}
          </h1>
          <div className="flex p-4">
            <h3 className=""> Format:</h3>
            <div className="px-8">
              <label>
                <input
                  type="radio"
                  value="value_1qb"
                  checked={format === "value_1qb"}
                  onChange={(e) => setFormat(e.target.value)}
                />
                <span className="px-2">1QB</span>
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="value_2qb"
                  checked={format === "value_2qb"}
                  onChange={(e) => setFormat(e.target.value)}
                />

                <span className="px-2">SuperFlex (2QBs)</span>
              </label>
            </div>
          </div>
          <div className="p-4 flex items-center">
            <label htmlFor="playerName" className="text-gray-200 pr-4">
              Find player:
            </label>
            <input
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-black rounded border-0 p-2"
            />
          </div>
          <div className="flex flex-col">
            {filteredData ? (
              <Table
                data={filteredData}
                columns={data.columns}
                format={format}
              />
            ) : (
              <h3>No data available</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
