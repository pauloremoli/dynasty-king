import React, { useMemo } from "react";
import { Column, Row, useSortBy, useTable } from "react-table";
import { getTag } from "~/utils/players";

type TableProps = {
  columns: Column[];
  data: Row[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const hiddenColumns = [
    "fp_id",
    "scrape_date",
    "draft_year",
    "ecr_1qb",
    "ecr_2qb",
    "ecr_pos",
  ];

  const visibleColumns = useMemo(
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
      ...columns.filter(
        (col) => !hiddenColumns.includes(col?.accessor?.toString()!)
      ),
    ],
    [columns]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    allColumns,
    prepareRow,
  } = useTable(
    {
      columns: visibleColumns,
      data,
      initialState: { hiddenColumns: ["value_1qb", "value_2qb"] },
    },
    useSortBy
  );

  return (
    <div className="w-full h-full max-w-5xl p-4">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-600"
      >
        <thead className="bg-slate-800">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {}
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  {...column.getHeaderProps()}
                  scope="col"
                  className="md:py-3 px-2 py-2 text-left text-xs font-medium dark:text-gray-100 uppercase tracking-wider"
                >
                  <span className="text-left">{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="divide-y divide-gray-700"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-2">
                      <div
                        className={`${
                          cell.column.id === "pos"
                            ? getTag(cell.row.original.pos) + " md:px-6 px-4 justify-center"
                            : " px-2 my-2 py-2 md:px-2"
                        }`}
                      >
                        {cell.render("Cell")}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
