import React, { useEffect, useMemo, useState } from "react";
import { MdDarkMode, MdLightMode, MdNotificationsNone } from "react-icons/md";

import axios from "axios";
import StudentApprove from "./StudentApprove";
function TeamReportStatus({ detail, id, darkMode, toggleDarkMode, teampage }) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/teamapprove",
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
      { Header: "teamName", accessor: "teamname" },
      { Header: "projectName", accessor: "project_namel" },
      { Header: "teamSize", accessor: "team_size" },
      // { Header: "projectDesc", accessor: "project_desc" },
      {
        Header: "viewteamnumbers",
        accessor: "teamid",
        Cell: ({ cell: { value } }) => (
          <button
            onClick={() => {
              teampage(value);
            }}
            className="view-em"
          >
            {" "}
            view
          </button>
        ),

        // Custom sort function for the Age column
        // sortType: (rowA, rowB) => {
        //   const ageA = rowA.original.level;
        //   const ageB = rowB.original.level;
        //   return ageA > ageB ? 1 : -1;
        // },
      },
      {
        Header: "view",
        accessor: "active",
        Cell: ({ row }) => (
          <div
            onClick={() => {
              const fetchData = async () => {
                try {
                  axios.defaults.withCredentials = true;
                  const response = await axios.post(
                    import.meta.env.VITE_API_URL +
                      "faculty/teamapproveforevent",
                    { team_id: row.original.teamid },
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
              setData((prevData) =>
                prevData.filter((rows) => rows.teamid !== row.original.teamid)
              );

              // setShowNotifications1(true);
            }}
          >
            <button className="view-em">Approve</button>
          </div>
        ),
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

export default TeamReportStatus;
