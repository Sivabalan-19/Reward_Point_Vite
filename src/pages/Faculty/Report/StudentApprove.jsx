import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLockClock } from "react-icons/md";

export default function StudentApprove({ columns, data }) {
  const [isTableReady, setIsTableReady] = useState(false);
  const [SortFilter, setSortFilter] = useState("firstcomers");
  const [filterroll, setfilterroll] = useState("");
  const [selectedStudentsCount, setSelectedStudentsCount] = useState(50);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setPageSize,
    nextPage,
    setFilter,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: React.useMemo(() => {
        if (SortFilter === "pslevel") {
          return [...data].sort((a, b) => b.level - a.level); // Sorting by PS Level
        }
        return data; // Default sorting (First Comers)
      }, [data, SortFilter]),
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTableReady(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isTableReady) {
    return <div></div>;
  }

  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
  };

  const handleregchange = (e) => {
    setfilterroll(e.target.value);
    setFilter("rollno", filterroll);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handleStudentCountChange = (e) => {
    setSelectedStudentsCount(Number(e.target.value));
  };

  const handleApprove = () => {
    const studentsToApprove = rows.slice(0, selectedStudentsCount);
    const approvedStudents = studentsToApprove.map((row) => row.original);

    // Your approval logic here

    // You can replace this console log with the actual logic to mark the students as approved
  };

  return (
    <div className="main-body">
      <div className="scrollonly-em">
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "8%",
            alignItems: "center",
          }}
        >
          <div className="eventm-em"> Student Approval</div>
          <div className="search-bar-em">
            <input
              placeholder={"Reg No"}
              className="ba-em"
              value={filterroll}
              onChange={handleregchange}
            />
            <div className="search-em">
              <FaSearch />
            </div>
          </div>
          <div className="search-bar-em1">
            <select className="ba-em" onChange={handleSortChange}>
              <option
                style={{ color: "#2B3674", fontWeight: "600" }}
                value=""
                selected
                disabled
                hidden
              >
                Sort By Category
              </option>
              <option value="firstcomers">First Comers</option>
              <option value="pslevel">PS Level</option>
            </select>
          </div>
          <div className="search-bar-em1">
            <select className="ba-em" onChange={handleStudentCountChange}>
              <option
                style={{ color: "#2B3674", fontWeight: "600" }}
                value=""
                selected
                disabled
                hidden
              >
                Select Students
              </option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={200}>200</option>
            </select>
          </div>
        </div>
        <div className="sim-em---ev">
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
                  </strong>
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
        </div>
        <button className="previouseventbut1-cresu" onClick={handleApprove}>
          Approve
        </button>
      </div>
    </div>
  );
}
