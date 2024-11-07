
import React, { useState, useEffect } from "react";
import { useTable, usePagination, useFilters, useGlobalFilter } from "react-table";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLockClock } from "react-icons/md";

// Custom filter function
const customFilter = (rows, id, filterValue) => {
  // Ensure filterValue is a valid number
  if (typeof filterValue !== 'number') {
    return rows;
  }

  return rows.filter(row => {
    const cellValue = row.values[id];

    // If the cell value is not a number, skip this row
    if (typeof cellValue !== 'number') {
      return false;
    }

    // Return rows where the cell value is greater than the filter value
    return cellValue >= filterValue;
  });
};


export default function FacultysingleAttendance({ columns, data,filterInput2}) {
  const [selected, setSelected] = useState('Overall');
  const [globalFilterr, setGlobalFilterr] = useState("");
  const [isTableReady, setIsTableReady] = useState(false);
  const [filterInput3, setFilterInput3] = useState("");
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
      filterTypes: {
        custom: customFilter // Register custom filter type
      },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter, 
    usePagination
  );

  useEffect(() => {
    setIsTableReady(true);
  }, []);

  useEffect(() => {
    console.log(data)
    const statusMap = {
      '1':0,
      '2': 1,
      '3':2, 
      '4':3
    };

    const status = statusMap[filterInput2] ;
    console.log(status)
    setFilter("present", status);
  
  }, [filterInput2]);

  const handleButtonClick = (button) => {
    setSelected(button);
  };
  const handleFilter=(e)=>{
    setFilterInput3(e.target.value)
    setFilter("year",e.target.value == 'First' ? 1 : e.target.value == 'Second' ? 2 : e.target.value == 'Third' ? 3 : 4)
  }
  const handleGlobalFilterChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilterr(value);
    setGlobalFilter(value);
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
  };

  if (!isTableReady) {
    return <div></div>;
  }

  return (
    <div className="main-body">
      <div className="scrollonly-em">
        <div style={{ display: 'flex', height: '6%', alignItems: 'center', justifyContent: 'space-between' }}>
          

          <div className="search-bar-fal-rep-1">
            <div style={{ color: '#2B3674', fontSize: '12px', alignSelf: 'center' }}><FaSearch /></div>
            <input
              type="text"
              style={{ backgroundColor: 'transparent' }}
              placeholder="Search"
              className="bar"
              value={globalFilterr || ""}
              onChange={handleGlobalFilterChange}
            />
          </div>
          <div className="search-bar-em1-rep1">
            <select className="ba-em" value={filterInput3} onChange={handleFilter}>
              <option style={{ color: '#2B3674', fontWeight: '600' }} value="" selected disabled hidden>Academic year</option>
              <option value="First">First Year</option>
              <option value="Second">Second Year</option>
              <option value="Third">Third Year</option>
              <option value="Fourth">Fourth Year</option>
            </select>
        </div>
        </div>

        <div className="sim-em">
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
              <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between' }}>
                <span className="page-em">
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageCount}
                  </strong>{' '}
                </span>
                <div>
                  <span className="rowpage-em">Rows Per Page</span>&ensp;
                  <select className="noofrow-em" onChange={handlePageSizeChange}>
                    {[10, 20, 30, 40, 50].map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="tablebottem-em">
                <button className="nextpagebut-em" onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <button className="nextpagebut-em" onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
