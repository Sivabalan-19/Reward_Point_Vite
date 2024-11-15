import React, { useEffect, useMemo, useState } from "react";
import { MdNotificationsNone, MdLightMode, MdDarkMode } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
import AddMemberPopup from "./AddMember/AddMemberPopup.jsx"
import axios from "axios";
import MyEventTable from "../../../components/Table/MyEventTable.jsx";
import { VscThreeBars } from "react-icons/vsc";
import { IoMoon } from "react-icons/io5";
import ResponsiveSide from "../../../components/Sidebar/ResponsiveSidebar.jsx";
import Notificationpopup from "../../../components/Notificaition/Notificationpopup.jsx";
import MembersTable from "./AddMember/MembersTable.jsx";
import { Warning } from "../../../components/AlertPopup/Alert.jsx";
// import Deptpopup from "./Deptpopup.jsx";
function TeamDetails({
  goToNextPage,
  formData,
  event_id,
  darkMode,
  toggleDarkMode,
}) {
  const [dummy, setdummy] = useState(0);
  const [geotag, setgeotag] = useState("");
  const [document_list, setdocument_list] = useState([]);
  const [documenttype, setdocumenttype] = useState("");
  const onChange = (e) => {
    console.log(e.target.files[0]);
    setgeotag(e.target.files[0]);
  };
  const handleapprove = () => {
    setdummy(1);
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;

        const response = await axios.post(
          import.meta.env.VITE_API_URL +
            "student/event-team-member-details/approve",
          {
            team_id: team_id,
            event_id: event_id,
          },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "username",
      },
      {
        Header: "position",
        accessor: "iscaptain",
        Cell: ({ cell: { value } }) => (
          <div style={{ display: "flex" }}>
            <span>
              {value == 1 ? (
                <div className="COMPLEATED-REP">Captain</div>
              ) : (
                <div className="UPCOMING" style={{ color: "black" }}>
                  member{" "}
                </div>
              )}
            </span>
            <span></span>
          </div>
        ),
      },
      {
        Header: "position",
        accessor: "student_approved",
        Cell: ({ cell: { value } }) => (
          <div style={{ display: "flex" }}>
            <span>
              {value == 0 ? (
                <div className="COMPLEATED-REP" style={{ color: "orange" }}>
                  Pending
                </div>
              ) : value == 1 ? (
                <div className="UPCOMING" style={{ color: "green" }}>
                  Active{" "}
                </div>
              ) : value == -1 ? (
                <div>inactive</div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      handleapprove();
                    }}
                    className="view-em"
                  >
                    approve
                  </button>
                </div>
              )}
            </span>
            <span></span>
          </div>
        ),
      },
    ],
    []
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotifications1, setShowNotifications1] = useState(false);
  const [teamdata, setteamdata] = useState([]);
  const [data, setdata] = useState({});
  const [team_id, setteam_id] = useState(39);
  const [file, setFile] = useState();
  const [insert, setinsert] = useState(1);
  function imgshower(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleupload = async () => {
    if (!geotag) {
      Warning({message : "Please select a file first!"})

      return;
    }
    console.log(geotag);
    const formDatA = new FormData();
    formDatA.append("pdf", geotag);
    formDatA.append("title", documenttype);
    formDatA.append("team_id", team_id);
    insert == 1
      ? (Response = await axios.post(
          "http://localhost:5000/upload2/insert",
          formDatA
        ))
      : (Response = await axios.post(
          "http://localhost:5000/upload2/update",
          formDatA
        ));
    const fetchData = async () => {
      try {
        console.log(team_id);
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "get/document/" + team_id,
          {
            headers: {
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        setdocument_list(response.data.message);
      } catch (error) {
        console.error("Error fetching updated documents:", error);
      }
    };
    fetchData();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.EventType &&
      formData.selectedType &&
      formData.eventName &&
      formData.eventDetails &&
      formData.maxPoints
    ) {
      goToNextPage();
    } else {
      Warning({message : "Please fill in all required fields."})
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        console.log("i am at get ", team_id);
        const response = await axios.post(
          import.meta.env.VITE_API_URL+ "get/document",
          {
            team_id: team_id,
          },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        console.log(response.data.message[0]);
        setdocument_list(response.data.message);
        setinsert(response.data.message[0] == undefined ? 1 : 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(event_id);
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          import.meta.env.VITE_API_URL +
            "student/event-team-details/" +
            event_id,
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        console.log(response.data.message[0].teamid);

        setteam_id(response.data.message[0].teamid);
        console.log(response.data.message[0].teamid);
        setdata(response.data.message[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;

        const response = await axios.get(
          import.meta.env.VITE_API_URL +
            "student/event-team-member-details/" +
            team_id,
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );

        await setteamdata(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [team_id, event_id]);

  const [sidebar, setsidebar] = useState(false);

  const Sidebarclicked = () => {
    if (sidebar) {
      setsidebar(false);
    } else {
      setsidebar(true);
    }
  };

  return (
    <div
      onSubmit={handleSubmit}
      className={`con ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="header1">
        <div className="Dash-rep-rep">
          <div className="burger" onClick={() => Sidebarclicked()}>
            <VscThreeBars  />
          </div>
          <div>Event Details</div>
        </div>
        <div className="theme">
          <div
            className="noti"
            onClick={() => {
              setShowNotifications(!showNotifications);
            }}
          >
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
        </div>
      </div>

      <div className="below-header">
      {sidebar ? <ResponsiveSide setsidebar={setsidebar} /> : ""}
      <div className="inside-below">
          <div
            className="inside-below-padding"
            style={{ overflowY: "scroll", scrollbarWidth: "none" }}
          >
            <div className="eventregidetail">
              <div
                className="Reward"
                style={{
                  fontSize: "24px",
                  height: "10%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Registration Details :
              </div>

              <div className="eventregdet">
                <div
                  style={{
                    height: "100%",
                    width: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <div className="evenrewqti">Event Name</div>
                  <div className="evenrewqti">Team Name</div>
                  <div className="evenrewqti">Team Size</div>
                  <div className="evenrewqti">Project Title</div>
                  <div className="evenrewqti">Level Completed</div>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "2%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <div className="evenrewqti">:</div>
                  <div className="evenrewqti">:</div>
                  <div className="evenrewqti">:</div>
                  <div className="evenrewqti">:</div>
                  <div className="evenrewqti">:</div>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <div className="evenrewqti">{data.Activity_name}</div>
                  <div className="evenrewqti">{data.teamname}</div>
                  <div className="evenrewqti">{data.team_size}</div>
                  <div className="evenrewqti">{data.project_namel}</div>
                  <div className="evenrewqti">{data.levelcompleted}</div>
                </div>
              </div>
            </div>
            <div className="teamleaddeta">
              <div className="Reward" style={{ fontSize: "24px" }}>
                Team Details
              </div>

              <button
                className="createeventbutin-team"
                onClick={() => setShowNotifications1(!showNotifications1)}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <FaPlus />
                </span>
                Add Member
              </button>
            </div>
            <div className="activteamdet">
              <MembersTable columns={columns} data={teamdata} />
            </div>

            <div className="geotagcer">
              <div className="Reward" style={{ fontSize: "24px" }}>
                Certificate Upload
              </div>

              <div className="Reward" style={{ padding: "10px 0" }}>
                Add Geo Tag Image:
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <select
                  style={{ backgroundColor: "transparent" }}
                  value={documenttype}
                  onChange={(e) => {
                    setdocumenttype(e.target.value);
                  }}
                >
                  <option value="" selected hidden>
                    Select Geo Tag
                  </option>
                  <option value="geoTag">Geo Tag</option>
                  <option value="document">Document</option>
                  <option value="certificate">Certificate</option>
                </select>
                {data.approvethedocument == 1 ? (
                  <div>approved</div>
                ) : data.approvethedocument == 2 ? (
                  <div>reupload</div>
                ) : data.approvethedocument == 3 ? (
                  <div>rejected</div>
                ) : (
                  <div> </div>
                )}
                {/* <input type="file" onChange={onChange} /> */}

                <label htmlFor="file-upload">Choose File</label>

                <input id="file-upload" type="file" onChange={onChange} />
                {/* <span className="file-selected">{file ? file.name : "No file selected"}</span> */}
                {/* <input type="file" onChange={imgshower} /> */}
                <div
                  style={{
                    backgroundColor: "red",
                    width: "100%",
                    height: "50%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {" "}
                  <img src={file} style={{ height: "100%", width: "20%" }} />
                </div>
              </div>
              <div style={{}}>
                <button
                  onClick={() => {
                    handleupload();
                  }}
                  className="view-em"
                  style={{ padding: "1.2%  4%", marginBottom: "30px" }}
                >
                  Sumbit
                </button>

                <div>
                  {document_list.map((item, index) => (
                    <div key={index}>
                      <div>
                        {Object.keys(item).map((key, keyIndex) => {
                          if (item[key] !== null) {
                            return (
                              <div key={keyIndex}>
                                <a
                                  href={
                                    import.meta.env.VITE_API_URL + item[key]
                                  }
                                >
                                  {item[key]}
                                </a>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNotifications1 && (
        <AddMemberPopup
          event_id={event_id}
          team_id={team_id}
        ></AddMemberPopup>
      )}
      {showNotifications && <Notificationpopup></Notificationpopup>}
      {/* {showNotifications3 && <Deptpopup setdAta={setdAta}  setSelected={setSelected}
          selected={selected}
          setsaved={setsaved}
          saved={saved} />}
      {showNotifications1 && (
        <Popup handDelete={handDelete} darkMode={darkMode} />
      )}
      {showNotifications2 && (
        <Rubicspopup row={rows} setRows={setRows}></Rubicspopup>
      )} */}
    </div>
  );
}

export default TeamDetails;
