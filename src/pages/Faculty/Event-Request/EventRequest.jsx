import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdNotificationsNone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo1 from "../../../assets/image1.png";
import logo2 from "../../../assets/image2.png";
import logo3 from "../../../assets/image3.png";
import logo4 from "../../../assets/image4.png";
import Notification from "../../../components/Notificaition/Notification.jsx";
import Noevent from "../My-event/Noevent.jsx";
function EventRequest({
  goToNextPage,
  formData,
  handleFormDataChange,
  handDelete,
  rows,
  setRows,
  setdAta,

  darkMode,
  toggleDarkMode,
  setSelected,
  selected,
  saved,
  setsaved,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filtersort, setFiltersort] = useState(1);
  const [Data, setData] = useState([]);
  const [showNotifications3, setShowNotifications3] = useState(false);
  const [showNotifications1, setShowNotifications1] = useState(false);
  const [showNotifications2, setShowNotifications2] = useState(false);
  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    handleFormDataChange({ EventType: event.target.value });
  };

  const handleSubCategoryChange = (event) => {
    handleFormDataChange({ selectedType: event.target.value });
  };

  const handleModeChange = (mode) => {
    if (mode === "online") {
      handleFormDataChange({ onlinemode: true, offinemode: false });
    } else if (mode === "offline") {
      handleFormDataChange({ onlinemode: false, offinemode: true });
    }
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "faculty/r",
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

  const filterData = Data.filter((student) => {
    return (
      (student.Activity_type.toLowerCase().includes(filterText.toLowerCase()) ||
        student.Activity_name.toLowerCase().includes(
          filterText.toLowerCase()
        )) &&
      student.status >= filtersort &&
      student.status < 9
    );
  });

  const Card = ({ title, status, Activity_type, id, nextPage, teamsize }) => (
    <div
      className="card-ev"
      onClick={() =>
        navigate("/faculty/Certificationteam", {
          state: {
            teamsize: teamsize,
            selectedEventId: id,
          },
        })
      }
    >
      <div className="image">
        {Activity_type == "external-technical" ? (
          <img
            src={logo1}
            style={{ height: "100%", width: "100%", position: "relative" }}
          />
        ) : Activity_type == "technical-society" ? (
          <img
            src={logo2}
            style={{ height: "100%", width: "100%", position: "relative" }}
          />
        ) : Activity_type == "extra-curricular" ? (
          <img
            src={logo3}
            style={{ height: "100%", width: "100%", position: "relative" }}
          />
        ) : (
          <img
            src={logo4}
            style={{ height: "100%", width: "100%", position: "relative" }}
          />
        )}
      </div>
      <div
        className="title"
        style={{
          height: "25%",
          width: " 100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
      </div>
    </div>
  );

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
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div
      onSubmit={handleSubmit}
      className={`con ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="header1">
        <div className="Dash">Event Request </div>
        <div className="theme">
          <div
            className="noti"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <MdDarkMode /> : <MdLightMode />}
          </div>
        </div>
      </div>

      <div className="below-header">
        <div className="inside-below">
          <div className="inside-below-padding">
            <div
              style={{
                width: "100%",
                height: "7%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ width: "15%" }}
                onClick={() => navigate("/faculty/event-enter")}
              >
                <button className="createeventbutin">
                  <span
                    style={{
                      fontSize: "80%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <FaPlus />
                  </span>
                  Create Event
                </button>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <div className="search-bar-fal">
                  <div
                    style={{
                      color: "#2B3674",
                      fontSize: "12px",
                      alignSelf: "center",
                    }}
                  >
                    <FaSearch />
                  </div>
                  <input
                    type="text"
                    style={{ backgroundColor: "transparent" }}
                    placeholder="Search"
                    onChange={handleFilterTextChange}
                    className="bar"
                  />
                </div>
              </div>
            </div>
            <div
              className="main-container"
              style={{ padding: "20px 0", height: "90%" }}
            >
              {filterData.length == 0 ? (
                <Noevent />
              ) : (
                filterData.map((card, index) => (
                  <Card
                    key={index}
                    title={card.Activity_name}
                    status={card.status}
                    Activity_type={card.Activity_type}
                    id={card.Event_id}
                    teamsize={card.team_size}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {showNotifications && <Notification />}
    </div>
  );
}

export default EventRequest;
