import React, { useState } from "react";
import Facultyeventstep from "./Faculty-eventstep";
import FacultyAttendance from "./FacultyAttendance";
const Facultyevent = ({ darkMode, toggleDarkMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [Activity_code, setActivity_code] = useState(0);
  const [Activity_name, setActivity_name] = useState(0);
  const [Activity_type, setActivity_type] = useState(0);
  const [status, setstatus] = useState(null);
  const [teamsize,setteamsize]=useState(-1)

  const [selectedEventId, setSelectedEventId] = useState(null);
  const nextPage = (id,status,teamsize) => {
    setSelectedEventId(id);
    setstatus(status)
    
    setteamsize(teamsize)
  
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
        <Facultyeventstep
          nextPage={nextPage}
          setActivity_code={setActivity_code}
          setActivity_name={setActivity_name}
          setActivity_type={setActivity_type}
          Activity_name={Activity_name}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        ></Facultyeventstep>
      )}
      {currentPage === 1 && (
        <FacultyAttendance
          nextPage={nextPage}
          prevPage={prevPage}
          setstatus={setstatus}
          teamsize={teamsize}
          status={status}
          eventId={selectedEventId}
          Activity_code={Activity_code}
          Activity_name={Activity_name}
          Activity_type={Activity_type}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        ></FacultyAttendance>
      )}
    </div>
  );
};

export default Facultyevent;
