import React, { useState } from "react";

import Review from "./Review";
import SingleReportStatus from "./SingleReportStatus";
import TeamMemberReport from "./TeamMemberReport";
import TeamReportStatus from "./TeamReportStatus";
function FacultyReport({ darkMode, toggleDarkMode }) {
  const [currentPage, setCurrentPage] = useState(2);
  const [id, setId] = useState(0);
  const [team_page, setteampage] = useState(0);
  const [teamid, setteamid] = useState(-1);
  const [team_size, setteam_size] = useState(-1);
  const [formData, setFormData] = useState({
    referenceNo: "",
    serialActivityCode: "",
    startDateTime: "",
    endDateTime: "",
    noOfStudentsRegistered: "",
    noOfStudentsAttended: "",
    noOfStudentsGotPoints: "",
    totalPoints: "",
    maximumPoint: "",
    minimumPoint: "",
    averagePoint: "",
    medianPoint: "",
  });
  const teampage = (team_id) => {
    setteampage(1);
    setteamid(team_id);
  };
  const goToPreviousPage = (value, teamsize) => {
    setCurrentPage((prevPage) => prevPage - 1);
    setteam_size(teamsize);
    setId(value);
  };

  // useEffect(() => {
  //   // This will log the updated id after state change
  // }, [id]);

  return (
    <div
      style={{ height: "100%" }}
      className={`eventrequesteve ${darkMode ? "dark-mode" : ""}`}
    >
      {team_page === 1 && (
        <TeamMemberReport
          formData={formData}
          id={teamid}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {currentPage === 1 && team_size == 1 && (
        <SingleReportStatus
          formData={formData}
          id={id}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {currentPage === 1 && team_size > 1 && (
        <TeamReportStatus
          formData={formData}
          id={id}
          teampage={teampage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      {currentPage === 2 && (
        <Review
          goToPreviousPage={goToPreviousPage}
          formData={formData}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  );
}

export default FacultyReport;
