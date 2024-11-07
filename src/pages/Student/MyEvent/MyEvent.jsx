import React from 'react'
import { useState } from 'react';
import MyEventTable from '../../../components/Table/MyEventTable';
import TeamDetails from './TeamDetails';

function  MyEvent({ darkMode, toggleDarkMode }) {
    const [currentPage, setCurrentPage] = useState(0);
  const [event_id,setevent_id]=useState(-1)
    const nextPage = (id) => {
        setCurrentPage(1);
        setevent_id(id)
      };
      const prevPage = () => {
        setCurrentPage(0);
      };
  return (
    <div
      style={{ height: "100%" }}
      className={`eventrequesteve ${darkMode ? "dark-mode" : ""}`}
    >
      {currentPage === 0 && (
        <MyEventTable
          nextPage={nextPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        ></MyEventTable>
      )}
      {currentPage === 1 && (
        <TeamDetails
          nextPage={nextPage}
          prevPage={prevPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          event_id={event_id}
        ></TeamDetails>
      )}
    </div>
  )
}

export default MyEvent