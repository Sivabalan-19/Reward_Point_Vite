import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdNotificationsNone, MdLightMode, MdDarkMode } from "react-icons/md";
import Notificationpopup from "../../../components/Notificaition/Notificationpopup.jsx";
import axios from "axios";
import { VscThreeBars } from "react-icons/vsc";
import { IoMoon } from "react-icons/io5";
import ResponsiveSide from "../../../components/Sidebar/ResponsiveSidebar.jsx";

function TeamRegistrationForm({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const team_size = location.state.team_size;
  const event_id = location.state.event_id;
  const [showNotifications, setShowNotifications] = useState(false);
  const [teamSize, setTeamSize] = useState(team_size);
  const [desc, setdesc] = useState("");
  const [title, settitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [team_name, setteam_name] = useState("");

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setTeamSize(size);
    if (size > team_size) {
      setErrorMessage(`Team size should be ${team_size} or less`);
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("authToken");

      await axios.post(
        `${import.meta.env.VITE_API_URL}student/teamregister`,
        {
          team_size: teamSize,
          event_id: event_id,
          team_name: team_name,
          description: desc,
          title: title,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: token ? token : "",
          },
        }
      );
      // After successful submission, navigate to event masters
      navigate("/student/my-events");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("There was a problem registering the team. Please try again.");
    }
  };

  const [sidebar, setsidebar] = useState(false);

  const Sidebarclicked = () => {
    if (sidebar) {
      setsidebar(false);
    } else {
      setsidebar(true);
    }
  };

  return (
    <form
      className={`con ${darkMode ? "dark-mode" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="header1">
        <div className="Dash-rep-rep">
          <div className="burger" onClick={() => Sidebarclicked()}>
            <VscThreeBars  />
          </div>
          <div>Event Registration</div>
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
          <div className="inside-below-padding">
            <div className="Reward">Event Registration</div>
            <div className="row-imo-student">
              <div className="dropdown-container-student1">
                <div className="dropdown-label" style={{ padding: "0" }}>
                  Team Name<span className="required">*</span>
                </div>
                <input
                  className="stuinp"
                  type="text"
                  placeholder="Type here..."
                  onChange={(e) => setteam_name(e.target.value)}
                  value={team_name}
                  required
                />
              </div>

              <div className="dropdown-container-student1">
                <div className="dropdown-label" style={{ padding: "0" }}>
                  Team Size<span className="required">*</span>
                </div>
                <input
                  className="stuinp"
                  type="number"
                  placeholder="Enter team size"
                  value={teamSize}
                  onChange={handleTeamSizeChange}
                  required
                />
                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </div>

              <div className="dropdown-container-student1">
                <div className="dropdown-label" style={{ padding: "0" }}>
                  Project Title<span className="required">*</span>
                </div>
                <input
                  className="stuinp"
                  type="text"
                  placeholder="Type here..."
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                  required
                />
              </div>

              <div className="dropdown-container-student2">
                <label style={{ padding: "0" }} className="dropdown-label">
                  Details About the project <span className="required">*</span>
                </label>
                <textarea
                  id="event-details"
                  style={{ backgroundColor: "transparent" }}
                  className="stuinp1111"
                  placeholder="Type here..."
                  onChange={(e) => setdesc(e.target.value)}
                  value={desc}
                  required
                />
              </div>
            </div>
            <div className="threebuttonintwopage" style={{ padding: "0px" }}>
              <button
                type="submit"
                className="createeventbut"
                style={{ backgroundColor: "#4318FF" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {showNotifications && <Notificationpopup />}
    </form>
  );
}

export default TeamRegistrationForm;
