import React from "react";
import { Route, Routes } from "react-router-dom";
import EventForm from "../../pages/Faculty/Event-Request/Eventform";
import EventRequest from "../../pages/Faculty/Event-Request/EventRequest";
import StudentStatuspage from "../../pages/Faculty/Event-Request/Statuspage";
import Facultyevent from "../../pages/Faculty/My-event/Faculty-myevent";
import FacultyReport from "../../pages/Faculty/Report/FacultyReport";
import FacultySidebar from "../Sidebar/FacultySidebar";
const Faculty_Layout = ({ darkMode, toggleDarkMode }) => (
  <div className={`main ${darkMode ? "dark-mode" : ""}`}>
    <div className="leftside">
      <FacultySidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
    <div className="rightside">
      <Routes>
        <Route
          path="My-Events"
          element={
            <Facultyevent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          }
        />

        <Route
          path="facultyeventcreate"
          element={
            <EventRequest darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          }
        />

        <Route
          path="event-enter"
          element={
            <EventForm darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          }
        />
         <Route
          path="Certificationteam"
          element={
            <StudentStatuspage
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="review"
          element={
            <FacultyReport
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
      </Routes>
    </div>
  </div>
);

export default Faculty_Layout;
