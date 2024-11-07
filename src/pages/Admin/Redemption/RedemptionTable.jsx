import React, { useState, useEffect } from "react";
import { useFilters, useTable, usePagination } from "react-table";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { MdOutlineLockClock } from "react-icons/md";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@mui/material";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function RedemptionTable({ columns, data }) {
  const [isTableReady, setIsTableReady] = useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    pageCount,
    gotoPage,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page index and page size
    },
    useFilters,
    usePagination
  );

  const [filterInput, setFilterInput] = useState("");
  const [filterInput2, setFilterInput2] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTableReady(true);
    }, 100); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isTableReady) {
    return <div></div>;
  }

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("Activity_name", value);
    setFilterInput(value);
  };

  const handleFilterChange2 = (e) => {
    const value = e.target.value || undefined;
    setFilter("Activity_code", value);
    setFilterInput2(value);
  };

  const handleFilterChange3 = (e) => {
    setFilter("Activity_type", e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
          <div className="table-em">
         <table {...getTableProps()}>
            <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps();
                return (
                  <th key={key} {...restColumn}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
              {pageCount > 0 ? (
                 <tbody {...getTableBodyProps}>
                 {page.map((row) => {
                   prepareRow(row);
                   const { key, ...restRowProps } = row.getRowProps();
                   return (
                     <tr key={key} {...restRowProps}>
                       {row.cells.map((cell) => {
                         const { key, ...restCellProps } = cell.getCellProps();
                         return (
                           <td key={key} {...restCellProps}
                           className={
                               cell.column.id === "Activity_name"
                                 ? "event-name"
                                 : ""
                             }>
                             {cell.render("Cell")}
                           </td>
                         );
                       })}
                     </tr>
                   );
                 })}
               </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          {" "}
                          <div className="nodatafoundicon-em">
                            <MdOutlineLockClock />
                          </div>
                          <div className="nodatafoundtext">No Data Found</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <div className="tablefoot-em">
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-between",
                }}
              >
                <span className="page-em">
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageCount}
                  </strong>{" "}
                </span>
                <div>
                  <span className="rowpage-em">Rows Per Page</span>&ensp;
                  <select
                    className="noofrow-em"
                    onChange={handlePageSizeChange}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="tablebottem-em">
                <button
                  className="nextpagebut-em"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"<"}
                </button>
                <button
                  className="nextpagebut-em"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>    
  );
}
