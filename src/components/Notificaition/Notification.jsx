import React, { useState, useEffect } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";
import { FiClock } from "react-icons/fi";
import { BsFillExclamationCircleFill, BsCheckCircle } from "react-icons/bs";

export default function Notification() {
  const [filterText, setFilterText] = useState("");
  const [data1, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        axios.defaults.withCredentials = true;
        const result = await axios.get(
          import.meta.env.VITE_API_URL+ "student/notifications",
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        setData(result.data.message);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    })();
  }, []);

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredStudents = data1.filter((student) => {
    return (
      student.type.toLowerCase().includes(filterText.toLowerCase()) ||
      student.Activity_name.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  let lastDate = null;

  return (
    <div className="logs-popup">
      <div>
        <div className="noti1">
          <div className="logs">Logs</div>
          <div className="bellicon">
            <FaRegBell />
          </div>
        </div>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <div className="search-bar">
            <div
              style={{
                marginTop: "2px",
                color: "#2B3674",
                fontSize: "12px",
                alignSelf: "center",
              }}
            >
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={filterText}
              onChange={handleFilterTextChange}
              className="bar"
            />
          </div>
        </div>
        <div className="notilist">
          {filteredStudents.map((student, index) => {
            let shouldPrintDate = false;
            const dateFormatted = format(
              new Date(student.StartDate),
              "EEEE, MMM d, yyyy"
            );
            if (dateFormatted !== lastDate) {
              shouldPrintDate = true;
              lastDate = dateFormatted;
            }

            return (
              <div key={index}>
                {shouldPrintDate && (
                  <div className="date-header">{dateFormatted}</div>
                )}
                <div className="notiitems">
                  <div className="photoss">
                    <div
                      className={`icon-container ${student.type
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {student.type === "Event Created Successfully" && (
                        <BsCheckCircle />
                      )}
                      {student.type === "Attendance Pending" && <FiClock />}
                      {student.type === "Event Approval Rejected" && (
                        <BsFillExclamationCircleFill />
                      )}
                      {/* Add more conditions for different types */}
                    </div>
                  </div>
                  <div className="notimes">
                    <div className="impname">{student.type}</div>
                    <div className="impname1">{student.Activity_name}</div>
                    <div className="description">{student.description}</div>
                  </div>
                  <div className="notipop">
                    {/* Add additional icons or actions here if necessary */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
