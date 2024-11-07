import React, { useState, useEffect } from "react";
import { useTable, usePagination, useFilters, useGlobalFilter } from "react-table";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLockClock } from "react-icons/md";

// Custom filter function
const customFilter = (rows, id, filterValue) => {
  // Check if filterValue is an array, otherwise wrap in array
//   console.log("customer filter")
  const valuesArray = Array.isArray(filterValue) ? filterValue : [filterValue];
  
  return rows.filter(row => {
    const cellValue = row.values[id];
  
    const cellValueArray = Array.isArray(cellValue) ? cellValue : [cellValue];

    return valuesArray.some(val => cellValueArray.includes(val));
  });
};


export default function AdminAll({ columns, data }) {
  const [selected, setSelected] = useState('Overall');
  const [globalFilterr, setGlobalFilterr] = useState("");
  const [isTableReady, setIsTableReady] = useState(false);

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
        <div style={{ display: 'flex', height: '6%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className='adminnavi'>
            <div className='adminnavbutcon'>
              <button className={`adminnavbut ${selected === 'Overall' ? 'selected' : ''}`} onClick={() => handleButtonClick('Overall')}>Overall</button>
            </div>
            <div className={`adminline ${selected === 'Overall' || selected === 'Approved' ? 'hidden' : ''}`}></div>
            <div className='adminnavbutcon'>
              <button className={`adminnavbut ${selected === 'Approved' ? 'selected' : ''}`} onClick={() => handleButtonClick('Approved')}>Approved</button>
            </div>
            <div className={`adminline ${selected === 'Approved' || selected === 'Pending' ? 'hidden' : ''}`}></div>
            <div className='adminnavbutcon'>
              <button className={`adminnavbut ${selected === 'Pending' ? 'selected' : ''}`} onClick={() => handleButtonClick('Pending')}>Pending</button>
            </div>
            <div className={`adminline ${selected === 'Rejected' || selected === 'Pending' ? 'hidden' : ''}`}></div>
            <div className='adminnavbutcon'>
              <button className={`adminnavbut ${selected === 'Rejected' ? 'selected' : ''}`} onClick={() => handleButtonClick('Rejected')}>Rejected</button>
            </div>
          </div>

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
        </div>

        <div className="sim-em">
          <div className="table-em">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              {pageCount > 0 ? (
                <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                          <div className="nodatafoundicon-em"><MdOutlineLockClock /></div>
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
