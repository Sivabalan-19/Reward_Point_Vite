import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import {
    MdLightMode,
    MdNotificationsNone,
} from "react-icons/md";
import logo1 from "../../../assets/image1.png";
import logo2 from "../../../assets/image2.png";
import logo3 from "../../../assets/image3.png";
import logo4 from "../../../assets/image4.png";
import Notification from "../../../components/Notificaition/Notification";
import Stepper from "../../../components/stepper/Stepper";
import Noevent from "./Noevent";
function Facultyeventstep({
  nextPage,
  setActivity_type,
  setActivity_name,
  setActivity_code,
  darkMode,
  toggleDarkMode,
}) {

  const [filterText, setFilterText] = useState("");
  const [filtersort, setFiltersort] = useState(1);
  const [Data, setData] = useState([]);
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };
  const selectchange = (event) => {
    setFiltersort(event.target.value == "Reward" ? 1 : 8);
  };
  const [currentStep, setCurrentStep] = useState(5);
  const steps = [4, 5, 6];
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const gotoNextPage = (id) => { 
    nextPage(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(import.meta.env.VITE_API_URL + "faculty/r", {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        });

        setActivity_code(response.data.message.Activity_code);
        setActivity_type(response.data.message.Activity_type);
        setActivity_name(response.data.message.Activity_name);
    
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
  const Card = ({ title, status, Activity_type, id, nextPage,teamsize }) => (
    <div className="card">
      <div className="image" >
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
      <div className="details">
        <div className="title">{title}</div>
        <div className="view">
          <div style={{textDecoration:'underline',color:'#007bff' , cursor:'pointer'}} onClick={() => nextPage(id,status,teamsize)}>view</div>
        </div>
      </div>
     <div className="steppper">
        {/* stepper */}
        {status==1?<Stepper steps={[1,2,3]} currentStep={1} />:status==8?<Stepper steps={[6,7,8]} currentStep={8} />:status==9?<span>Rejected</span>:<Stepper steps={[status-1,status,status+1]} currentStep={status} />}
        
      </div>
      <div className="status">{status==1 ? "Event Approval Pending..." : status==9?"Rejected":status==8?"Event Compleated Successfully":"Ongoing"}</div>
    </div>
  );

  const cardsData = [
    {
      title: "AI TECHNOLOGY - FUTURE OF THE INDUSTRIAL REVOLUTION",
      status: "Event Approval Pending",
    },
  ];
  
  const filterData = Data.filter((student) => {

    return (
      (student.Activity_type.toLowerCase().includes(filterText.toLowerCase()) ||
        student.Activity_name.toLowerCase().includes(
          filterText.toLowerCase()
        )) &&
      (student.status >= filtersort && student.status<9)
    );
  });


  return (
    <div className={`con ${darkMode ? "dark-mode" : ""}`}>
      <div className="header1">
        <div
          className="Dash-pt"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <div>My Events</div>
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
              style={{ backgroundColor:'transparent'}}
              placeholder="Search"
              className="bar"
              value={filterText}
              onChange={handleFilterTextChange}
            />
          </div>

          <div className="search-bar-em1-rep">
            <select style={{ backgroundColor:'transparent'}} className="ba-em" onChange={selectchange}>
              <option
                style={{ color: "#2B3674", fontWeight: "600" , backgroundColor:'transparent' }}
                
                selected
                disabled
                hidden
              >
                Sort By Type
              </option>
              <option style={{ color: "#2B3674", fontWeight: "600" , backgroundColor:'transparent' }} value="Reward">Active Event</option>
              <option style={{ color: "#2B3674", fontWeight: "600" , backgroundColor:'transparent' }} value="Honour">In Active Event</option>
            </select>
          </div>
        </div>
        <div className="theme">
          <div
            className="noti"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}{" "}
          </div>
        </div>
      </div>
      <div
        className="main-container"
        style={{ "--columns": cardsData.length === 1 ? 1 : "auto-fit" }}
      >
        {filterData.length == 0 ? (
          <Noevent></Noevent>
        ) : (
          filterData.map((card, index) => (
            <Card
              key={index}
              title={card.Activity_name}
              status={card.status}
              Activity_type={card.Activity_type}
              id={card.Event_id}
              nextPage={nextPage}
              teamsize={card.team_size}
            />
          ))
        )}
      </div>
      {showNotifications && <Notification />}
    </div>
  );
}

export default Facultyeventstep;
