import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/Table/Table";
import { Warning } from "../../../components/AlertPopup/Alert";

// import Deptpopup from "./Deptpopup.jsx";
function CertificateApprove({
  goToNextPage,
  formData,
  handleFormDataChange,
  event_id,
  darkMode,
  team_id,
  toggleDarkMode,
}) {
  console.log(team_id, event_id);
  const [document_list, setdocument_list] = useState([]);
  const handleapprove = () => {
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
                  Member
                </div>
              )}
            </span>
            <span></span>
          </div>
        ),
      },
      {
        Header: "Status",
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
                    Approve
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

  const [file, setFile] = useState();
  const [insert, setinsert] = useState(1);
  function imgshower(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

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
      Warning({name:"Please fill in all required fields"})
      
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "get/document/" + team_id,
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
  }, [team_id, event_id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        console.log(event_id);
        console.log(
          import.meta.env.VITE_API_URL +
            "faculty/event-team-details/" +
            team_id
        );
        const response = await axios.get(
          import.meta.env.VITE_API_URL +
            "faculty/event-team-details/" +
            team_id,
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );

        console.log(response.data.message[0]);
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
  return (
    <div className="main-body--1">
      <div
        className="inside-below-padding"
        style={{ overflowY: "scroll", scrollbarWidth: "none" }}
      >
        <div className="eventregidetail">
          <div
            className="Reward"
            style={{
              fontSize: "24px",
              height: "20%",
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
                width: "25%",
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
                width: "65%",
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
        <div className="Reward" style={{ fontSize: "24px", margin: "10px 0" }}>
          Team Details :
        </div>
        <div className="activteamdet">
          <div
            className="Reward"
            style={{ fontSize: "24px", marginBottom: "10px" }}
          >
            Active Member Details
          </div>
          <div>
            <Table columns={columns} data={teamdata} />
          </div>
        </div>

        <div className="geotagcer">
          <div className="Reward" style={{ fontSize: "24px" }}>
            Certificate Upload
          </div>
          <button
            onClick={() => {
              try {
                axios.post(
                  import.meta.env.VITE_API_URL + "faculty/approvethewholeteam",
                  { team_id: team_id, change: 1 },
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
            }}
            className="view-em"
          >
            approve
          </button>
          <button
            onClick={() => {
              try {
                axios.post(
                  import.meta.env.VITE_API_URL + "faculty/approvethewholeteam",
                  { team_id: team_id, change: 2 },
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
            }}
            className="view-em"
          >
            reject
          </button>
          <button
            onClick={() => {
              try {
                axios.post(
                  import.meta.env.VITE_API_URL + "faculty/approvethewholeteam",
                  { team_id: team_id, change: 0 },
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
            }}
            className="view-em"
          >
            reupload
          </button>
          <div className="Geotagimg">
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
            </div>
          </div>
          <div>
            {/* <input type="file" accept=".pdf" /> */}
            <div>
              {document_list.map((item, index) => (
                <div key={index}>
                  <div>
                    {Object.keys(item).map((key, keyIndex) => {
                      if (item[key] !== null) {
                        return (
                          <a
                            key={keyIndex}
                            href={import.meta.env.VITE_API_URL + item[key]}
                            target="_blank"
                          >
                            {item[key].split("_").filter(Boolean)[1]}
                            {"  "}
                          </a>
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

      {/*      
      {showNotifications && <Notipopup></Notipopup>} */}
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

export default CertificateApprove;
