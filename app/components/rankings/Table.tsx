import React, { useEffect, useMemo } from "react";
import { useSortBy, useTable } from "react-table";

type Column = {
  accessor: string;
  Header: string;
};

type TableProps = {
  columns: Column[];
  data: any;
};

const Table: React.FC<TableProps> = ({ columns, data }) => {  
  const hiddenColumns = [
    "fp_id",
    "scrape_date",
    "draft_year",
    "ecr_1qb",
    "ecr_2qb",
    "value_1qb",
    "value_2qb",
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
      ...columns.filter((col) => !hiddenColumns.includes(col.accessor))
    ],
    [columns]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
  } = useTable({ columns: visibleColumns, data }, useSortBy);



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
                  {column.render("Header")}
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
  );
};

export default Table;
