import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Table from "../../../components/Table/Table";
import { IoMoon } from "react-icons/io5";
import { MdLightMode, MdNotificationsNone } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { format } from "date-fns";
import Notificationpopup from "../../../components/Notificaition/Notificationpopup";
import { VscThreeBars } from "react-icons/vsc";
import ResponsiveSide from "../../../components/Sidebar/ResponsiveSidebar";
import EventRegisterPopup from "./EventRegisterPopup";
const EventMaster = ({ darkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEventRegister, setShowEventRegister] = useState(false);
  const [data, setData] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [teamSize, setteamSize] = useState(-1);
  const showRegisterForm = (id, data, team_size) => {
    setShowEventRegister(true);
    setteamSize(team_size);

    setEventData(id);
  };

  const formClose = () => {
    setShowEventRegister(false);
    setEventData(null);
  };

  const columns = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      {
        Header: "Date",
        accessor: "Date",
        Cell: ({ cell: { value } }) => (
          <span>{format(new Date(value), "dd-MM-yy")}</span>
        ),
      },
      { Header: "Activity name", accessor: "Activity_name" },
      { Header: "Activity code", accessor: "Activity_code" },
      { Header: "Activity Category", accessor: "Activity_type" },
      { Header: "Max Points", accessor: "points" },
      { Header: "Organiser", accessor: "Organier" },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div>
            <button
              className="view-em"
              onClick={() =>
                showRegisterForm(row.original.id, data, row.original.team_size)
              }
            >
              view
            </button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "student/pointtable",
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

  const handleDeleteRow = async (id) => {
    setShowEventRegister(false);
    setEventData(null);
    // Set default configuration for Axios
    axios.defaults.withCredentials = true;

    // Check the token and request body
    const token = localStorage.getItem("authToken");
    setData((d) => {
      return d.filter((item) => item.id !== id);
    });
    await axios.post(
      `${import.meta.env.VITE_API_URL}student/changeregister`,
      { event_id: id },
      {
        headers: {
          Authorization: `${token}`, // Add a scheme if required
        },
      }
    );
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
    <div className={`con ${darkMode ? "dark-mode" : ""}`}>
      <div className="header1">
        <div
          style={{
            display: "flex",
            width: "80%",
            alignItems: "center",
            height: "100%",
          }}
        >
          
          <div className="Dash-rep">
          <div className="burger" onClick={() => Sidebarclicked()}>
            <VscThreeBars  />
          </div>
          <div className="Sefr">Event Registration</div>
        </div>
          <div className="Dash-em1">
            <IoIosArrowForward />
          </div>
          <div className="em-subtiti">Event Master</div>
        </div>
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
      {sidebar ? <ResponsiveSide setsidebar={setsidebar} /> : ""}
        <Table
          columns={columns}
          data={data}
          Table_header_name="Event Master"
          handleDeleteRow={handleDeleteRow}
        />
      </div>

      {showNotifications && <Notificationpopup></Notificationpopup>}

      <Dialog open={showEventRegister} onClose={formClose}>
        <EventRegisterPopup
          detail={data}
          id={eventData}
          onDeleteRow={(id) => handleDeleteRow(id)}
          onc={formClose}
          darkMode={darkMode}
          teamSize={teamSize}
        />
      </Dialog>
    </div>
  );
};
export default EventMaster;
