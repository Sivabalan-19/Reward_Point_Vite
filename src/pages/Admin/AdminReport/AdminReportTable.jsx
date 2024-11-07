import React, { useState, useEffect } from "react";
import { useTable, usePagination, useFilters, useGlobalFilter } from "react-table";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLockClock } from "react-icons/md";

// Custom filter function
const customFilter = (rows, id, filterValue) => {
  // Check if filterValue is an array, otherwise wrap in array
 
  const valuesArray = Array.isArray(filterValue) ? filterValue : [filterValue];
  
  return rows.filter(row => {
    const cellValue = row.values[id];
  
    const cellValueArray = Array.isArray(cellValue) ? cellValue : [cellValue];

    return valuesArray.some(val => cellValueArray.includes(val));
  });
};

export default function AdminReportTable({ columns, data  }) {
  const [selected, setSelected] = useState('Overall');
  const [globalFilterr, setGlobalFilterr] = useState("");
  const [isTableReady, setIsTableReady] = useState(false);
  const [filterInput,setFilterInput]=useState("")
  const [filterInput2,setFilterInput2]=useState("")

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
    const statusMap = {
      'Pending': 1,
      'Rejected': 9,
      'Approved': [2,3,4,5],
      'Overall': [1,2,3,4,5,6,7,8,9,10]
    };

    const status = statusMap[selected] || 'overall';

    if (status === 'overall') {
      setFilter("status", '');
    } else if (status === 2) {
      setFilter("status", [2, 3, 4, 5, 6, 7, 8]);
    } else {
      setFilter("status", status);
    }
  }, [selected, setFilter]);

  const handleButtonClick = (button) => {
    setSelected(button);
  };

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
      <div
          style={{
            display: "flex",
            width: "100%",
            height: "8%",
            alignItems: "center",
          }}
        >
          <div className="Reward"> Reward Points </div>

          <input
  value={filterInput2}
  onChange={(e) => setFilterInput2(e.target.value)}  // Add this handler
  placeholder={"Activity Code"}
  className="ba-em"
/>

<input
  value={filterInput}
  onChange={(e) => setFilterInput(e.target.value)}  // Add this handler
  placeholder={"Activity Name"}
  className="ba-em"
/>

          <div className="search-bar-em1">
            <select 
            // onChange={handleFilterChange3}
             className="ba-em">
              <option
                style={{ color: "#2B3674", fontWeight: "600" }}
                value=""
                selected
                disabled
                hidden
              >
                Sort By Category
              </option>
              <option value="Reward">Reward</option>
              <option value="Honour">Honour</option>
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
