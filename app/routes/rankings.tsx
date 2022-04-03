import { useLoaderData } from "@remix-run/react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { useMemo, useState } from "react";
import GlobalFilter from "../components/rankings/GlobalFilter";
import Navbar from "~/components/Navbar";

type Column = {
  accessor: string;
  Header: string;
};

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

const csvToJson = (input: string) => {
  const data = input.split("\n");
  let result = [];

  // The array[0] contains all the
  // header columns so we store them
  // in headers array
  let headers = data[0].split(",");
  const columns = headers.map((item) => {
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

  return { columns, data: result };
};

export const loader = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv"
  );

  return csvToJson(await response.text());
};

export default function Index() {
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState(data);
  const hiddenColumns = [
    "fp_id",
    "scrape_date",
    "draft_year",
    "ecr_1qb",
    "ecr_2qb",
  ];
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "",
        Cell: (row: any) => {
          return <div>{parseInt(row.row.id) + 1}</div>;
        },
        disableSortBy: true,
        disableFilters: true,
      },
      ...data.columns.filter(
        (col: Column) => !hiddenColumns.includes(col.accessor)
      ),
    ],
    [data]
  );
  const [playerName, setPlayerName] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
  } = useTable({ columns, data: data.data }, useSortBy);

  return (
    <>
      <div className="w-full bg-slate-800 flex justify-center">
        <Navbar />

        <div className="max-w-7xl text-gray-200 pt-14 w-full">
          <h1 className="text-sans text-center p-10 text-white text-xl font-bold">
            Dynasty Rankings {new Date().getFullYear()}{" "}
          </h1>

          <div className="flex flex-col">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-600"
            >
              <thead className="bg-slate-600">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {}
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        {...column.getHeaderProps()}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ▼"
                              : " ▲"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-slate-800 divide-y divide-gray-700"
              >
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
