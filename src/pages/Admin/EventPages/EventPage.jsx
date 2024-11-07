import React from "react";

import { useState, useEffect } from "react";
import Approved from "./EventStatus/Approved";
import Rejected from "./EventStatus/Rejected";
import AllStatus from "./EventStatus/AllEvent";
import Pending from "./EventStatus/Pending";
const AdminEvent = ({ darkMode, toggleDarkMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [Page, setPage] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const nextPage = (id, status) => {
    setPage(status);
    setSelectedEventId(id);
    setCurrentPage(1);
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
        <AllStatus
          nextPage={nextPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {currentPage === 1 && Page == 1 && (
        <Pending
          selectedEventId={selectedEventId}
          prevPage={prevPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {currentPage === 1 && Page == 9 && (
        <Rejected
          selectedEventId={selectedEventId}
          prevPage={prevPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {currentPage === 1 && Page > 1 && Page < 9 && (
        <Approved
          selectedEventId={selectedEventId}
          prevPage={prevPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  );
};

export default AdminEvent;
