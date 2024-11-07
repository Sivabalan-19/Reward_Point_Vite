import React, { useState, useEffect } from "react";
import { MdNotificationsNone, MdLightMode } from "react-icons/md";
import Notificationpopup from "../../../../components/Notificaition/Notificationpopup";
import axios from "axios";
import { IoMoon } from "react-icons/io5";
import { TbTrashXFilled } from "react-icons/tb";
import { format, parseISO, isValid } from "date-fns";
import RejectPopup from "../AdminPopup/Rejectpopup";
import CreatePopup from "../AdminPopup/CreatePopup";

const initialFormData = {
  Activity_type: "",
  selectedType: "",
  Activity_category: "",
  category: "",
  Activity_name: "",
  onlinemode: true,
  offinemode: false,
  rewardmode: true,
  honourmode: false,
  description: "",
  points: "",
  departmentAndYear: "",
  StartDate: "",
  EndDate: "",
  start_bigintscheduling: "",
  end_bigintscheduling: "",
  duration: "",
  No_of_students_expected: "",
  document: "",
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Pending({ selectedEventId, prevPage, darkMode, toggleDarkMode }) {
  const [showCreated, setShowCreated] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [RejectNotifications, setRejectNotifications] = useState(false);
  const [rejectdetails, setrejectdetails] = useState("");
  const [Data, setData] = useState(initialFormData);
  const approved = async () => {
    setShowCreated(true);
    await axios.post(
      import.meta.env.VITE_API_URL + "admin/event_approved",
      {
        id: selectedEventId,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
    await delay(1000);
    setShowCreated(false);
    prevPage();
  };
  const rejected = async () => {
    await axios.post(
      import.meta.env.VITE_API_URL + "admin/event_rejected",
      {
        id: selectedEventId,
        details: rejectdetails,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
    setRejectNotifications(false);
    prevPage();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "admin/pending",
          {
            id: selectedEventId,
          },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );

        setData(response.data.message[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedEventId) {
      fetchData();
    }
  }, [selectedEventId]);

  useEffect(() => {}, [Data]);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "yyyy-MM-dd'T'HH:mm") : "";
  };

  return (
    <div className={`con ${darkMode ? "dark-mode" : ""}`}>
      <div className="header1">
        <div className="Dash">Dashboard</div>
        <div className="theme">
          <div
            className="noti"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
        </div>
      </div>

      <div className="allbody">
        <div className="main-body--1">
          <div className="Reward">EVENT DETAILS</div>
          <div className="row-imo--1">
            <div className="col-imo-1">
              <div className="dropdown-label-rep">Type of Event</div>
              <div className="dropdown-select-1">
                <input
                  className="text-input--rep"
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  value={Data.Activity_type}
                  disabled
                />
              </div>
              <div className="dropdown-label-rep">Sub Category</div>
              <div className="dropdown-select-1">
                <input
                  className="text-input--rep"
                  type="text"
                  style={{ backgroundColor: "transparent" }}
                  value={Data.selectedType}
                  disabled
                />
              </div>

              <div className="form-options">
                <div style={{ width: "48%" }}>
                  <div className="dropdown-label-rep">Activity Category</div>
                  <label className="form-row" style={{ width: "100%" }}>
                    <div className="click--box">
                      <input
                        type="checkbox"
                        name="honorPoints"
                        checked={true}
                      />
                    </div>
                    {Data.Activity_category}
                  </label>
                </div>
                <div style={{ width: "48%" }}>
                  <div className="dropdown-label-rep">Mode of the Event</div>
                  <label className="form-row" style={{ width: "100%" }}>
                    <div className="click--box">
                      <input type="checkbox" name="honorPoints" checked />
                    </div>
                    {Data.onlinemode ? "online mode" : "offline mode"}
                  </label>
                </div>
              </div>

              <label htmlFor="department-year" className="dropdown-label-rep">
                Departments and Years
              </label>
              <div className="dropdown-select-1">
                <input
                  className="text-input--rep"
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  value="auto"
                />
              </div>

              <label htmlFor="department-year" className="dropdown-label-rep">
                Duration
              </label>
              <div className="dropdown-select-1">
                <input
                  className="text-input--rep"
                  type="text"
                  value={Data.duration}
                  style={{ backgroundColor: "transparent" }}
                />
              </div>

              <label htmlFor="department-year" className="dropdown-label-rep">
                Total Student Expected
              </label>
              <div className="dropdown-select-1">
                <input
                  className="text-input--rep"
                  type="text"
                  value={Data.No_of_students_expected}
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
              <label htmlFor="department-year" className="dropdown-label-rep">
                Document Attached
              </label>
              <div className="dropdown-select-1">
                <div
                  className="text-input--rep"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textDecoration: "underline",
                  }}
                >
                  {" "}
                  <a
                    href={import.meta.env.VITE_API_URL + Data.document}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    view Sheet
                  </a>
                </div>
              </div>
            </div>
            <div className="col-imo-1">
              <label className="dropdown-label-rep">Name of the Event</label>
              <div className="dropdown-select-1">
                <input
                  className="text-input--rep"
                  type="text"
                  value={Data.Activity_name}
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
              <div className="dropdown-container-rep">
                <label htmlFor="event-details" className="dropdown-label-rep">
                  Details About the Event
                </label>
                <textarea
                  className="multiline-input-1"
                  style={{ backgroundColor: "transparent" }}
                  value={Data.description}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "49%" }}>
                  <label className="dropdown-label-rep">
                    Maximum Reward Points per Student
                  </label>
                  <div className="dropdown-select-1">
                    <input
                      className="text-input--rep"
                      type="text"
                      value={Data.points}
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                </div>
                <div style={{ width: "49%" }}>
                  <label className="dropdown-label-rep">Rubics Sheet</label>
                  <div className="rubics-main-1">view sheet</div>
                </div>
              </div>
              <div className="dropdown-label-rep">Start Date and Time</div>
              <input
                className="text-input-1"
                type="datetime-local"
                style={{ backgroundColor: "transparent" }}
                value={formatDate(Data.StartDate)}
                disabled
              />
              <div className="dropdown-label-rep">End Date and Time</div>
              <input
                className="text-input-1"
                type="datetime-local"
                style={{ backgroundColor: "transparent" }}
                value={formatDate(Data.EndDate)}
                disabled
              />
              <div className="dropdown-label-rep">
                Scheduling Start Date and Time
              </div>
              <input
                className="text-input-1"
                type="datetime-local"
                style={{ backgroundColor: "transparent" }}
                value={formatDate(Data.start_bigintscheduling)}
                disabled
              />
              <div className="dropdown-label-rep">
                Scheduling End Date and Time
              </div>
              <input
                className="text-input-1"
                type="datetime-local"
                style={{ backgroundColor: "transparent" }}
                value={formatDate(Data.end_bigintscheduling)}
                disabled
              />
            </div>
          </div>
          <div className="threebuttonintwopage-rep">
            <div>
              <button
                type="button"
                className="previouseventbut1"
                onClick={() => {
                  setRejectNotifications(true);
                }}
              >
                <div style={{ fontSize: "19px", alignItems: "center" }}>
                  <TbTrashXFilled />
                </div>
                <div>Reject</div>
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="createeventbut1"
                onClick={() => {
                  approved();
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
      {showNotifications && <Notificationpopup></Notificationpopup>}
      {RejectNotifications && (
        <RejectPopup
          setRejectNotifications={setRejectNotifications}
          reject={rejected}
          setrejectdetails={setrejectdetails}
          darkMode={darkMode}
        />
      )}
      <CreatePopup
        open={showCreated}
        darkMode={darkMode}
        onClose={() => setShowCreated(false)}
      />
    </div>
  );
}

export default Pending;
