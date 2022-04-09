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
    <div className="w-full h-full">
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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  {...column.getHeaderProps()}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
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
          className="bg-slate-800 divide-y divide-gray-700"
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
                            ? getTag(cell.row.original.pos) + "px-6 justify-center"
                            : "px-6 my-4 py-2 "
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