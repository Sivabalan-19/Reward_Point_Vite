import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { MdDarkMode, MdLightMode, MdNotificationsNone } from "react-icons/md";
import StudentApprove from "./StudentApprove";
function TeamMemberReport({ detail, id, darkMode, toggleDarkMode }) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/teamMembers",
          { id: id },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        const reversedData = response.data.message

          .reverse()
          .map((row, index) => ({ ...row, sno: index + 1 }));
        setData(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const columns = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "Name", accessor: "username" },
      { Header: "department", accessor: "department_name" },
      { Header: "year", accessor: "year" },
      { Header: "rollno", accessor: "rollno" },
      {
        Header: "position",
        accessor: "iscaptain",
        Cell: ({ cell: { value } }) =>
          value == 0 ? <div>Captain</div> : <div>member</div>,

        // Custom sort function for the Age column
        // sortType: (rowA, rowB) => {
        //   const ageA = rowA.original.level;
        //   const ageB = rowB.original.level;
        //   return ageA > ageB ? 1 : -1;
        // },
      },
    ],
    []
  );

  return (
    <div className={`con ${darkMode ? "dark-mode" : ""}`}>
      <div className="header1">
        <div className="Dash">Event Reports</div>
        <div className="theme">
          <div className="noti">
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <MdDarkMode /> : <MdLightMode />}
          </div>
        </div>
      </div>

      <div className="allbody">
        <StudentApprove
          columns={columns}
          data={Data}
          Table_header_name="Attendance table"
        ></StudentApprove>
      </div>
    </div>
  );
}

export default TeamMemberReport;
