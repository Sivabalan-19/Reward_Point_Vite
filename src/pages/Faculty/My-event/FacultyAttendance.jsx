import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { MdLightMode, MdNotificationsNone } from "react-icons/md";
import logo1 from "../../../assets/image1.png";
import logo2 from "../../../assets/image2.png";
import logo3 from "../../../assets/image3.png";
import logo4 from "../../../assets/image4.png";
import Closeattendance from "../../../components/Facultypopup/CloseAttendance";
import Closeregisteration from "../../../components/Facultypopup/Clostregistarion";
import Seteventcompleated from "../../../components/Facultypopup/Eventcompleted";
import Openregistration from "../../../components/Facultypopup/Openregistarion";
import Submitpoint from "../../../components/Facultypopup/Submitpoint";
import Facultyrp from "./Facultyrp";
import FacultysingleAttendance from "./FacultySingleAttendan";
import FacultyTeamAttendacne from "./FacultyTeamAttendacn";
import Verticalstepper from '../../../components/stepper/VerticalStepper'
function FacultyAttendance({
  teamsize,
  darkMode,
  toggleDarkMode,
  nextPage,
  handDelete,
  eventId,
  status,
  Activity_type,
  Activity_name,
  setstatus,
}) {
  const [Data, setData] = useState([]); // Initialize Data as an empty array
  const [Task, setTask] = useState([]);
  const [teammember, setteammember] = useState(-1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotifications2, setShowNotifications2] = useState(false);
  const [showNotifications3, setShowNotifications3] = useState(false);
  const [showNotifications4, setShowNotifications4] = useState(false);
  const [showNotifications5, setShowNotifications5] = useState(false);
  const [filterInput2, setFilterInput2] = useState("1");
  const teampage = (team_id) => {
    setteammember(team_id);
  };
  const [acti_n, setacti_n] = useState();
  const [acti_c, setacti_c] = useState();
  const [acti_t, setacti_t] = useState();
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);
  const [student_id, setStudentId] = useState(0);
  const [showNotifications1, setShowNotifications1] = useState(false);
  const [isTableReady, setIsTableReady] = useState(false);

  useEffect(() => {
    const E_i = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/Event_id",
          { id: eventId },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        setacti_n(response.data.message[0].Activity_name);
        setacti_t(response.data.message[0].Activity_type);

        setacti_c(response.data.message[0].Activity_code);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    E_i();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL +
            "faculty/teamapproveattendencestudent",
          { id: teammember },
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
        setdata3(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teammember != -1 ? fetchData() : console.log();
  }, [teammember]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/teamapproveattendence",
          { id: eventId },
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
        setdata2(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teamsize > 1 ? fetchData() : console.log();
  }, [teamsize]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/attendence",
          { id: eventId },
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

    teamsize == 1 ? fetchData() : console.log();
  }, [teamsize]);
  useEffect(() => {
    const taskData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/task",
          { id: eventId },
          {
            headers: {
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        let task = response.data.message.map((row, index) => ({
          ...row,
          sno: index + 1,
        }));

        task = task.map((row) => ({ ...row, obtained_mark: 0 }));
        setTask(task);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    taskData();
  }, []);

  const taskSumbit = async (points_text) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post(
        import.meta.env.VITE_API_URL + "faculty/sumbittask",
        { text: points_text, id: eventId },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setstatus(6);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  const attendence_sumbit = async (attend) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post(
        import.meta.env.VITE_API_URL + "faculty/present",
        { text: attend, id: eventId },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setstatus(5);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  const sumbit_task = () => {
    let points_text = "";

    Task.forEach((item) => {
      points_text += `(${item.user_id},${item.obtained_mark},${item.task_id}),`;
    });
    points_text = points_text.slice(0, -1);

    taskSumbit(points_text);
    setShowNotifications4(!showNotifications4);
  };
  const Sumbit_attendence = () => {
    let attendence = "";

    Data.forEach((item) => {
      if (item.present == 1) {
        attendence += item.user_id;
      }
    });

    attendence_sumbit(attendence);
    setShowNotifications3(!showNotifications3);
  };
  const handlePresentinbackend = async (user_id, team_id, decision) => {
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "faculty/teammemberpresent",
        { user_id: user_id, team_id: teammember, decision: decision },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      console.log("Attendance successfully updated in backend");
      return true;
    } catch (error) {
      console.error("Error updating attendance in backend:", error);
      return false;
    }
  };

  const handlePresent = async (sno) => {
    if (teamsize > 1) {
      setdata3((prevData) =>
        prevData.map((d) => {
          if (d.sno === sno) {
            const newPresent = d.present + 1;
            const newStatus = d.present >= parseInt(filterInput2) ? 0 : 1;

            // Call the backend API
            handlePresentinbackend(d.user_id, teammember, newStatus)
              .then((success) => {
                if (success) {
                  setdata3((prevData) =>
                    prevData.map((item) =>
                      item.sno === sno ? { ...item, present: newPresent } : item
                    )
                  );
                }
              })
              .catch((err) => {
                console.error("Failed to update present status:", err);
              });

            return { ...d, present: newPresent }; // Update the present value optimistically
          }
          return d;
        })
      );
    } else {
      setData((prevData) =>
        prevData.map((d) => {
          if (d.sno === sno) {
            const newPresent = d.present + 1;
            const newStatus = d.present ? 0 : 1;

            // Call the backend API
            handlePresentinbackend(d.user_id, teammember, newStatus)
              .then((success) => {
                if (success) {
                  setData((prevData) =>
                    prevData.map((item) =>
                      item.sno === sno ? { ...item, present: newPresent } : item
                    )
                  );
                }
              })
              .catch((err) => {
                console.error("Failed to update present status:", err);
              });

            return { ...d, present: newPresent }; // Update the present value optimistically
          }
          return d;
        })
      );
    }
  };

  const columns2 = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "teamName", accessor: "teamname" },
      { Header: "projectName", accessor: "project_namel" },
      { Header: "teamSize", accessor: "team_size" },
      { Header: "projectDesc", accessor: "project_desc" },
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
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "Reg No", accessor: "rollno" },
      { Header: "Stdent Name", accessor: "username" },
      { Header: "department", accessor: "department_name" },
      { Header: "year", accessor: "year" },
      {
        Header: "Attendance",
        accessor: "present",
        filter: "custom",
        Cell: ({ cell: { row } }) => (
          <button
            className="view-em"
            onClick={
              status == 4
                ? () => handlePresent(row.original.sno)
                : console.log("")
            }
          >
            {/* {console.log(row.original.present,filterInput2,row.original.present>=parseInt(filterInput2))} */}
            {row.original.present >= parseInt(filterInput2)
              ? "present"
              : "absent"}
          </button>
        ),
      },
      {
        Header: "view",
        accessor: "user_id",
        Cell: ({ cell: { value } }) => (
          <div
            onClick={() => {
              if (status > 4) {
                setStudentId(value);
                setShowNotifications1(true);
              }
            }}
          >
            <FaEye />
          </div>
        ),
      },
    ],
    [nextPage, filterInput2, status]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTableReady(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isTableReady) {
    return <div>Loading...</div>;
  }
  const Student_regestration = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "faculty/openregistration",
        {
          id: eventId,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setstatus(3);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setShowNotifications(!showNotifications);
  };
  const Event_completion = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "faculty/close_event",
        {
          id: eventId,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setstatus(8);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setShowNotifications5(!showNotifications);
  };

  const handleFilter = (e) => {
    setFilterInput2(e.target.value);
  };

  const Student_close = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "faculty/closeregistration",
        {
          id: eventId,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setstatus(4);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setShowNotifications2(!showNotifications2);
  };
  return (
    <div className="con">
      <div className="header1">
        <div className="Dash">Event Details</div>
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

      <div className="allbody-rep">
        <div className="fal-11-rep">
          <div className="fac-att-pag">
            <div className="heade" style={{ justifyContent: "space-between" }}>
              <div className="Reward">Attendance</div>

              <div className="search-bar-em1-rep1">
                <select
                  className="ba-em"
                  value={filterInput2}
                  onChange={handleFilter}
                >
                  <option value="1" selected>
                    First Level
                  </option>
                  <option value="2">Second Level</option>
                  <option value="3">Third Level</option>
                  <option value="4">Fourth Level</option>
                </select>
              </div>
            </div>
            <div className="heade2">
              {teamsize == 1 && teammember == -1 && (
                <FacultysingleAttendance
                  columns={columns}
                  data={Data}
                  Task={Task}
                  Table_header_name="Attendance table"
                  handlePresent={handlePresent}
                  filterInput2={filterInput2}
                ></FacultysingleAttendance>
              )}

              {teamsize > 1 && teammember == -1 && (
                <FacultyTeamAttendacne columns={columns2} data={data2} />
              )}
              {teammember != -1 && (
                <FacultysingleAttendance
                  columns={columns}
                  data={data3}
                  filterInput2={filterInput2}
                ></FacultysingleAttendance>
              )}
            </div>

            <div
              style={{
                height: "10%",
                width: "100%",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "2%",
              }}
            >
              {status == 2 ? (
                <button
                  className="previouseventbut1-cre"
                  onClick={Student_regestration}
                >
                  Open Registration
                </button>
              ) : (
                ""
              )}
              {status == 3 ? (
                <button
                  className="previouseventbut1-cretrtr"
                  onClick={Student_close}
                >
                  Close Registration
                </button>
              ) : (
                ""
              )}
              {status == 4 ? (
                <button
                  className="previouseventbut1-cresu"
                  onClick={Sumbit_attendence}
                >
                  Submit Attendence
                </button>
              ) : (
                ""
              )}
              {status == 5 ? (
                <button
                  className="previouseventbut1-cresu"
                  onClick={sumbit_task}
                >
                  Submit Points
                </button>
              ) : (
                ""
              )}
              {status == 7 ? (
                <button
                  className="previouseventbut1-cretrtr"
                  onClick={Event_completion}
                >
                  Set Event_completed
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="fac-ver-stepp">
            <div
              style={{
                height: "37%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: "65%", borderRadius: "10px" }}>
                {acti_t == "external-technical" ? (
                  <img
                    src={logo1}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                ) : acti_t == "technical-society" ? (
                  <img
                    src={logo2}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                ) : acti_t == "extra-curricular" ? (
                  <img
                    src={logo3}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <img
                    src={logo4}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
              <div className="eventnamefac">{acti_n}</div>
              <div className="eventidfacatt">Event Code : {acti_c}</div>
            </div>
            <div className="line-rep"></div>
            <div style={{ height: "58%", width: "90%", padding: "0 5%" }}>
              <div className="Reward" style={{ paddingBottom: "15px" }}>
                Progress Status :
              </div>
              {status && <Verticalstepper status={status} />}
            </div>
          </div>
        </div>
      </div>

      {showNotifications1 && (
        <Facultyrp
          setShowNotifications1={setShowNotifications1}
          Task={Task}
          status={status}
          student_id={student_id}
          setTask={setTask}
          filterInput2={filterInput2}
        />
      )}

      {showNotifications && (
        <Openregistration handDelete={handDelete} darkMode={darkMode} />
      )}
      {showNotifications2 && (
        <Closeregisteration handDelete={handDelete} darkMode={darkMode} />
      )}
      {showNotifications3 && (
        <Closeattendance handDelete={handDelete} darkMode={darkMode} />
      )}
      {showNotifications4 && (
        <Submitpoint handDelete={handDelete} darkMode={darkMode} />
      )}
      {showNotifications5 && (
        <Seteventcompleated handDelete={handDelete} darkMode={darkMode} />
      )}
    </div>
  );
}

export default FacultyAttendance;
