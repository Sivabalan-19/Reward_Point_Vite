import React, { useState, useEffect, useRef } from "react";
import { IoMdHome } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import photo from "../../assets/photo1.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Authcontext";
import { BiSolidFileBlank } from "react-icons/bi";

const AdminSidebar = ({ darkMode }) => {
  const { logout } = useAuth();
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || "Dashboard"
  );
  const [linePosition, setLinePosition] = useState(0);
  const itemRefs = useRef([]);
  const navigate = useNavigate();

  const handleItemClick = (item, index) => {
    setActiveItem(item);
    const itemOffsetTop = itemRefs.current[index].offsetTop;
    setLinePosition(itemOffsetTop);
    localStorage.setItem("activeItem", item);
    localStorage.setItem("linePosition", itemOffsetTop);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("activeItem");
      localStorage.removeItem("linePosition");
      setActiveItem("Dashboard");
      if (itemRefs.current[0]) {
        setLinePosition(itemRefs.current[0].offsetTop);
      }
      await logout();
      // axios.defaults.withCredentials = true;
      // await axios.get(`${import.meta.env.VITE_API_URL}r`, {
      //   headers: { withCredentials: true }
      // });
    } catch (error) {
      console.error("Error handling logout:", error);
    }
  };

  useEffect(() => {
    const savedLinePosition = parseFloat(localStorage.getItem("linePosition"));
    const savedActiveItem = localStorage.getItem("activeItem");

    if (savedLinePosition && savedActiveItem) {
      setLinePosition(savedLinePosition);
      setActiveItem(savedActiveItem);
    } else {
      if (itemRefs.current[0]) {
        setLinePosition(itemRefs.current[0].offsetTop);
      }
    }
  }, []);

  return (
    <div className={`Sidebar ${darkMode ? "dark-mode" : ""}`}>
      <div className="Sidehead">
        <div className="Reward">REWARD&nbsp;</div>
        <div className="points">POINTS</div>
      </div>
      <div className="line" style={{ top: linePosition }}></div>
      <div
        ref={(el) => (itemRefs.current[0] = el)}
        className={`Home ${activeItem === "Dashboard" ? "active" : ""}`}
        style={{ marginTop: "15px" }}
        onClick={() => {
          handleItemClick("Dashboard", 0);
          navigate("dashboard");
        }}
      >
        <IoMdHome className="icon" />
        &ensp;Dashboard
      </div>
      <div
        ref={(el) => (itemRefs.current[1] = el)}
        className={`Home ${activeItem === "Reports" ? "active" : ""}`}
        onClick={() => {
          handleItemClick("Reports", 1);
          navigate("Redemption");
        }}
      >
        <BiSolidFileBlank className="icon" />
        &ensp;Redemption
      </div>
      <div
        ref={(el) => (itemRefs.current[2] = el)}
        className={`Home ${activeItem === "Rpactive" ? "active" : ""}`}
        onClick={() => {
          handleItemClick("Rpactive", 2);
          navigate("Adminreport");
        }}
      >
        <MdOutlineEditCalendar className="icon" />
        &ensp;Report
      </div>
      <div className="photo3">
        <img
          src={photo}
          alt="photo1"
          style={{ maxWidth: "82.7%", maxHeight: "20.3%" }}
        />
      </div>
      <div className="Home" style={{ marginTop: "20%" }} onClick={handleLogout}>
        <TbLogin2 className="icon" />
        &ensp;Sign-Out
      </div>
    </div>
  );
};

export default AdminSidebar;
