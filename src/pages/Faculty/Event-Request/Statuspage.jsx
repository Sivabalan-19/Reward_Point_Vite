import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdLightMode, MdNotificationsNone } from "react-icons/md";
import { useLocation } from "react-router-dom";
import TeamReport from "../../Admin/AdminReport/TeamReport";
import CertificateApprove from "./CertificateApprove";

function StudentStatuspage({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  const [Data2, setData2] = useState([]);
  const teamsize = location.state.teamsize;
  const selectedEventId = location.state.selectedEventId;
  const [showNotifications1, setShowNotifications1] = useState(false);
  const handleapprovechange = (student_id) => {
    setData2((data) =>
      data.map((d) => {
        if (d.user_id === student_id) {
          console.log(d);

          if (d.approvethedocument === 0) {
            try {
              axios.post(
                import.meta.env.VITE_API_URL + "faculty/approvetheteam",
                { user_id: student_id, event_id: selectedEventId, change: 1 },
                {
                  headers: {
                    withCredentials: true,
                    Authorization: localStorage.getItem("authToken"),
                  },
                }
              );
              console.log("successfully updated in backend");
            } catch (error) {
              console.error("Error updating attendance in backend:", error);
            }

            return { ...d, approvethedocument: 1 };
          } else if (d.approvethedocument === 1) {
            try {
              axios.post(
                import.meta.env.VITE_API_URL + "faculty/approvetheteam",
                { user_id: student_id, event_id: selectedEventId, change: 2 },
                {
                  headers: {
                    withCredentials: true,
                    Authorization: localStorage.getItem("authToken"),
                  },
                }
              );
              console.log("successfully updated in backend");
            } catch (error) {
              console.error("Error updating attendance in backend:", error);
            }
            return { ...d, approvethedocument: 2 };
          } else if (d.approvethedocument == 2) {
            try {
              axios.post(
                import.meta.env.VITE_API_URL + "faculty/approvetheteam",
                { user_id: student_id, event_id: selectedEventId, change: 0 },
                {
                  headers: {
                    withCredentials: true,
                    Authorization: localStorage.getItem("authToken"),
                  },
                }
              );
              console.log("successfully updated in backend");
            } catch (error) {
              console.error("Error updating attendance in backend:", error);
            }
            return { ...d, approvethedocument: 0 };
          }
        }
        return d;
      })
    );
  };

  const [nex, setnex] = useState(0);
  // const [uSe,  setuse] = useState(0);
  const [teamid, setteamid] = useState(-1);
  // const [Data, setData] = useState([]);
  // const [Data3, setData3] = useState([]);
  const nextPage = () => {
    setnex(nex + 1);
  };
  const prevPage = () => {
    setnex(nex - 1);
  };

  const [Data, setData] = useState([]);
  const teampage = (id) => {
    console.log(id);
    setteamid(id);
  };
  const [showNotifications, setShowNotifications] = useState(false);
  // const [showNotifications1, setShowNotifications1] = useState(false);
  // const [student_id,setstudent_id]=useState(0)
  // const [Task, setTask] = useState([]);
  const columns = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "Reg No", accessor: "rollno" },
      { Header: "Stdent Name", accessor: "username" },
      { Header: "department", accessor: "department_name" },
      { Header: "year", accessor: "year" },
      {
        Header: "view",
        accessor: "document",
        Cell: ({ cell: { value } }) => (
          <a href={import.meta.env.VITE_API_URL + value} target="_blank">
            view
          </a>
        ),
      },
      {
        Header: "approve",
        accessor: "approvethedocument",
        Cell: ({ cell: { row } }) => {
          return (
            <button
              className="view-em"
              onClick={() => {
                handleapprovechange(row.original.user_id);
              }}
            >
              {row.original.approvethedocument === 0
                ? "approve"
                : row.original.approvethedocument === 1
                ? "reject"
                : "reupload"}
            </button>
          );
        },
      },
    ],
    [nextPage]
  );
  const columns2 = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "team Name", accessor: "teamname" },
      { Header: "project Title", accessor: "project_namel" },
      { Header: "team Size", accessor: "team_size" },
      // { Header: "projectDesc", accessor: "project_desc" },
      {
        Header: "viewteamnumbers",
        accessor: "teamid",
        Cell: ({ cell: { value } }) => (
          <button
            onClick={() => {
              console.log(value);
              teampage(value);
              nextPage();
            }}
            className="view-em"
          >
            {" "}
            view
          </button>
        ),
      },
    ],
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      console.log("HI i am team size");
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/getstudentdocument",
          { id: selectedEventId },
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
        console.log(reversedData);
        setData2(reversedData);
        console.log(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teamsize == 1 ? fetchData() : console.log();
  }, [teamsize]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("HI i am team size");
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/teamapproveattendence2",
          { id: selectedEventId },
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
        setData2(reversedData);
        console.log(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teamsize > 1 ? fetchData() : console.log();
  }, [teamsize]);

  return (
    <div className={`con ${darkMode ? "dark-mode" : ""}`}>
      <div className="header1">
        <div className="Dash">Team Status</div>
        <div className="theme">
          <div
            className="noti"
            onClick={() => setShowNotifications1(!showNotifications1)}
          >
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
        </div>
      </div>
      <div className="allbody">
        {console.log(nex, teamsize, teamid)}
        {nex == 0 && teamsize > 1 && teamid == -1 && (
          <TeamReport columns={columns2} data={Data2} />
        )}
        {nex == 0 && teamsize == 1 && teamid == -1 && (
          <TeamReport columns={columns} data={Data2} />
        )}

        {nex == 1 && teamsize > 1 && teamid != -1 && (
          <CertificateApprove
            nextPage={nextPage}
            prevPage={prevPage}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            team_id={teamid}
            event_id={selectedEventId}
          ></CertificateApprove>
        )}
      </div>
      {showNotifications && <Notification />}
      {showNotifications1 && (
        <Notification setShowNotifications1={setShowNotifications1} />
      )}
    </div>
  );
}

export default StudentStatuspage;
