import { Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import Table from "~/components/rankings/Table";
import fuzzysort from "fuzzysort";

const getLabel = (item: string) => {
  switch (item) {
    case "player":
      return "Player";
    case "pos":
      return "Position";
    case "team":
      return "Team";
    case "age":
      return "Age";
    case "draft_year":
      return "Year drafted";
    case "ecr_1qb":
      return "Avg ranking 1QB";
    case "ecr_2qb":
      return "Avg ranking 2QB";
    case "ecr_pos":
      return "Position ranking";
    case "value_1qb":
      return "Value 1QB";
    case "value_2qb":
      return "Value 2QB";
    case "scrape_date":
      return "Last update";
    case "fp_id":
      return "Id";
    default:
      return item;
  }
};

const comparePlayer1QB = (a: any, b: any) => {
  const aValue1qb = parseInt(a.value_1qb);
  const bValue1qb = parseInt(b.value_1qb);

  if (aValue1qb < bValue1qb) {
    return 1;
  }
  if (aValue1qb > bValue1qb) {
    return -1;
  }
  return 0;
};

const comparePlayer2QB = (a: any, b: any) => {
  const aValue2qb = parseInt(a.value_2qb);
  const bValue2qb = parseInt(b.value_2qb);

  if (aValue2qb < bValue2qb) {
    return 1;
  }
  if (aValue2qb > bValue2qb) {
    return -1;
  }
  return 0;
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
    const label = getLabel(item);
    return {
      Header: label,
      accessor: item,
    };
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

  const hiddenColumns = [
    "fp_id",
    "scrape_date",
    "draft_year",
    "ecr_1qb",
    "ecr_2qb",
  ];
  columns = columns.filter((col) => !hiddenColumns.includes(col.accessor));

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
  const [format, setFormat] = useState("1QB");
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState(data.data || []);

  const filterData = () => {
    let dataToFilter = data.data;
    if (position) {
      dataToFilter = dataToFilter.filter((item: any) => item.pos === position);
    }

    if (playerName) {
      const result = fuzzysort.go(playerName, dataToFilter, { key: "player" });
      dataToFilter = result.map((player) => player.obj);
    }

    if (format === "2QB") {
      console.log("Sorting superflex");
      
      
      setFilteredData([]);
      dataToFilter = dataToFilter.sort(comparePlayer2QB);
      console.log(dataToFilter);
    } else {
      
      setFilteredData([]);
      dataToFilter = dataToFilter.sort(comparePlayer1QB);
      console.log(dataToFilter);
      
    }

    setFilteredData(dataToFilter);
  };

  useEffect(() => {
    filterData();
  }, [position, format, data, playerName]);

  useEffect(() => {
    filterData();
  }, []);

  useEffect(() => {
    if (filteredData) {
      console.log("filteredData", filteredData);
    } else {
      console.log("no data");
    }
  }, [filteredData]);

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
                  value="1QB"
                  checked={format === "1QB"}
                  onChange={(e) => setFormat(e.target.value)}
                />
                <span className="px-2">1QB</span>
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  value="2QB"
                  checked={format === "2QB"}
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
              <Table data={filteredData} columns={data.columns} />
            ) : (
              <h3>No data available</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
