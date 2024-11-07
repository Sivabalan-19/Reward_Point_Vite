import { useFilters,usePagination, useGlobalFilter }from "react-table";
import React,{useState} from "react";
import { FaSearch } from "react-icons/fa";
import { useTable } from "react-table";
import { MdOutlineLockClock } from "react-icons/md";
export default function FacultyTeamAttendacne({ columns, data,Task,handlePresent}) {
 
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    setGlobalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    pageCount,
    page,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {

      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },

    },

    useFilters,
    useGlobalFilter, 
    usePagination

  );
  const [filterInput, setFilterInput] = useState("");
  const [filterInput2, setFilterInput2] = useState("");
  console.log("team table")
  const handleGlobalFilterChange = (e) => {

    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setGlobalFilter(value);
  };
const handleFilter=(e)=>{
  setFilterInput2(e.target.value)
  setFilter("year",e.target.value == 'First' ? 1 : e.target.value == 'Second' ? 2 : e.target.value == 'Third' ? 3 : 4)
}
const handlePageSizeChange = (e) => {
  setPageSize(Number(e.target.value));
};
  return (
    <div className="main-body">
      <div className="scrollonly-em">
      <div className="heade1">
        <div className="Dash-pt--rep" style={{display:'flex',justifyContent:'space-between',width:'60%'}}> 
        <div className="search-bar-fal-rep">
        <div style={{color: '#2B3674',fontSize:'12px',alignSelf:'center'}}><FaSearch /></div>
        <input
          type="text"
          placeholder="Search"
          className="bar"
          value={globalFilter || ""}
          onChange={handleGlobalFilterChange}
        />
        </div>
        
        </div>
        </div>
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
          </div>
    </div>
    
    
  );
}
