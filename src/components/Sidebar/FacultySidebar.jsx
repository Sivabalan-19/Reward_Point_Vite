import React, { useState, useEffect, useRef } from "react";
import { IoMdHome } from "react-icons/io";
import { MdOutlineBarChart } from "react-icons/md";
import { MdOutlineEditCalendar } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import photo from "../../assets/photo1.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Authcontext";
import axios from "axios";

const FacultySidebar = ({ darkMode, toggleDarkMode }) => {
  const { logout } = useAuth();
  const [activeItem1, setActiveItem] = useState(
    localStorage.getItem("activeItem1") || "My Event"
  );
  const [linePosition1, setLinePosition] = useState(0);
  const itemRefs1 = useRef([]);
  const navigate = useNavigate();

  const handleItemClick = (item, index) => {
    setActiveItem(item);
    const itemOffsetTop = itemRefs1.current[index].offsetTop;
    setLinePosition(itemOffsetTop);
    localStorage.setItem("activeItem1", item);
    localStorage.setItem("linePosition1", itemOffsetTop);
  };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("activeItem1");
      localStorage.removeItem("linePosition1");

      // Ensure that the active item and line position are reset
      setActiveItem("My Event");
      if (itemRefs1.current[0]) {
        setLinePosition(itemRefs1.current[0].offsetTop);
      }

      // Call logout function
      await logout();

      // Fetch data (if needed)
      axios.defaults.withCredentials = true;
      await axios.get(`${import.meta.env.VITE_API_URL}faculty/r`, {
        headers: { withCredentials: true },
      });
    } catch (error) {
      console.error("Error handling logout:", error);
    }
  };

  useEffect(() => {
    const savedLinePosition = parseFloat(localStorage.getItem("linePosition1"));
    const savedActiveItem = localStorage.getItem("activeItem1");

    if (savedLinePosition && savedActiveItem) {
      setLinePosition(savedLinePosition);
      setActiveItem(savedActiveItem);
    } else {
      // Set default position if no saved values
      if (itemRefs1.current[0]) {
        setLinePosition(itemRefs1.current[0].offsetTop);
      }
    }
  }, []);

  return (
    <div className={`Sidebar ${darkMode ? "dark-mode" : ""}`}>
      <div className="Sidehead">
        <div className="Reward">REWARD&nbsp;</div>
        <div className="points">POINTS</div>
      </div>
      <div className="line" style={{ top: linePosition1 }}></div>
      <div
        ref={(el) => (itemRefs1.current[0] = el)}
        className={`Home  ${activeItem1 === "My Event" ? "active" : ""}`}
        style={{ marginTop: "10%" }}
        onClick={() => {
          handleItemClick("My Event", 0);
          navigate("My-Events");
        }}
      >
        <IoMdHome className="icon" />
        &ensp;My Event
      </div>
      <div
        ref={(el) => (itemRefs1.current[1] = el)}
        className={`Home ${activeItem1 === "Points Container" ? "active" : ""}`}
        onClick={() => {
          handleItemClick("Points Container", 1);
          navigate("facultyeventcreate");
        }}
      >
        <MdOutlineBarChart className="icon" />
        &ensp;Event Request
      </div>
      <div
        ref={(el) => (itemRefs1.current[2] = el)}
        className={`Home ${activeItem1 === "Event Register" ? "active" : ""}`}
        onClick={() => {
          handleItemClick("Event Register", 2);
          navigate("review");
        }}
      >
        <MdOutlineEditCalendar className="icon" />
        &ensp;Reports
      </div>
      <div className="photo3">
        <img
          src={photo}
          alt="photo1"
          style={{ maxWidth: "82.7%", maxHeight: "20.3%" }}
        />
      </div>
      <div className="Home" style={{ marginTop: "10%" }} onClick={handleLogout}>
        <TbLogin2 className="icon" />
        &ensp;Sign-Out
      </div>
    </div>
  );
};

export default FacultySidebar;
