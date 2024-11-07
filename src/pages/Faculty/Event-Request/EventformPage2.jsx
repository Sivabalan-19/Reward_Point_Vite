import React, { useState } from "react";
import { MdDarkMode, MdLightMode, MdNotificationsNone } from "react-icons/md";
import { TbTrashXFilled } from "react-icons/tb";
import EventCreated from "../../../components/Facultypopup/EventCreated.jsx";
import Trashpopup from "../../../components/Facultypopup/Trashpopup.jsx";
import Notification from "../../../components/Notificaition/Notification.jsx";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Eventform2({
  goToPreviousPage,
  formData,
  handleFormDataChange,
  handleSubmit,
  handDelete,
  handlefile,
  handleUpload,
  darkMode,
  toggleDarkMode,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotifications11, setShowNotifications11] = useState(false);
  const [showCreated, setShowCreated] = useState(false);

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const handleStartDateChange = (value) => {
    handleFormDataChange({ startDateTime: value });

    if (
      formData.endDateTime &&
      new Date(value) >= new Date(formData.endDateTime)
    ) {
      handleFormDataChange({ endDateTime: "" });
    }
  };

  const handleEndDateChange = (value) => {
    if (new Date(value) > new Date(formData.startDateTime)) {
      handleFormDataChange({ endDateTime: value });
    } else {
      alert("End date must be greater than the start date");
    }
  };

  const handleSchedulingStartDateChange = (value) => {
    handleFormDataChange({ schedulingStartDateTime: value });

    if (
      formData.schedulingEndDateTime &&
      new Date(value) >= new Date(formData.schedulingEndDateTime)
    ) {
      handleFormDataChange({ schedulingEndDateTime: "" });
    }
  };

  const handleSchedulingEndDateChange = (value) => {
    if (new Date(value) > new Date(formData.schedulingStartDateTime)) {
      handleFormDataChange({ schedulingEndDateTime: value });
    } else {
      alert("Scheduling End Date must be greater than Scheduling Start Date");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.duration &&
      formData.noOfStudents &&
      formData.startDateTime &&
      formData.endDateTime &&
      formData.schedulingStartDateTime &&
      formData.schedulingEndDateTime
    ) {
      setShowCreated(true);
      handleSubmit();
      handleUpload();
      await delay(1000);
      setShowCreated(false);
      handDelete();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`con ${darkMode ? "dark-mode" : ""}`}
    >
      <div className="header1">
        <div className="Dash">Event Request</div>
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
                display: "flex",
                width: "100%",
                height: "50px",
                alignItems: "center",
              }}
            >
              <div className="event-details">EVENT DETAILS</div>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", width: "100%", gap: "1%" }}>
                  <div style={{ width: "40%", borderRadius: "50%" }}>
                    <progress value="100" max="100" class="progressibar">
                      {" "}
                    </progress>
                  </div>
                  <div style={{ width: "40%", borderRadius: "50%" }}>
                    <progress value="100" max="100" class="progressibar">
                      {" "}
                    </progress>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "#0B1437" }}>
                  {" "}
                  step 2 of 2
                </div>
              </div>
            </div>
            <div style={{ color: "#0B1437", fontWeight: "600" }}>Note</div>
            <div className="box-tt">
              <div>
                1. THE FACULTY MEMBERS ARE REQUESTED TO SUBMIT THE PROPOSAL WITH
                THEIR BITSATHY MAIL ID ONLY (NO NEED TO SUBMIT THE HARD COPY OF
                THE PROPOSAL)
              </div>
              <div>2. TYPE EVERYTHING IN CAPITAL LETTERS</div>
            </div>
            <div className="row-imo">
              <div className="col-imo">
                <div className="dropdown-container">
                  <div className="dropdown-label">
                    Team Size<span className="required">*</span>
                  </div>
                  <input
                    className="dropdown-select1"
                    type="number"
                    value={formData.teamsize}
                    onChange={(e) =>
                      handleFormDataChange({ teamsize: e.target.value })
                    }
                    placeholder="Type here..."
                    required
                  />
                </div>

                <div className="dropdown-container">
                  <div className="dropdown-label">Web Site Link</div>
                  <input
                    className="dropdown-select1"
                    type="url"
                    placeholder="Type here..."
                  />
                </div>

                <div className="notesin">
                  Kindly mention if There is Link ( Leave empty if there is no
                  link )
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "48%" }}>
                    <div className="dropdown-container">
                      <div className="dropdown-label">
                        Start Date and Time<span className="required">*</span>
                      </div>
                      <input
                        className="dropdown-select1"
                        style={{ padding: "7px 5px" }}
                        type="datetime-local"
                        value={formData.startDateTime}
                        min={getCurrentDateTime()}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ width: "48%" }}>
                    <div className="dropdown-container">
                      <div className="dropdown-label">
                        End Date and Time<span className="required">*</span>
                      </div>
                      <input
                        className="dropdown-select1"
                        style={{ padding: "7px 5px" }}
                        type="datetime-local"
                        value={formData.endDateTime}
                        min={getCurrentDateTime()}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "48%" }}>
                    <div className="dropdown-container">
                      <div className="dropdown-label">
                        Scheduling Start Date and Time
                        <span className="required">*</span>
                      </div>
                      <input
                        className="dropdown-select1"
                        style={{ padding: "7px 5px" }}
                        type="datetime-local"
                        value={formData.schedulingStartDateTime}
                        min={getCurrentDateTime()}
                        onChange={(e) =>
                          handleSchedulingStartDateChange(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div style={{ width: "48%" }}>
                    <div className="dropdown-container">
                      <div className="dropdown-label">
                        Scheduling End Date and Time
                        <span className="required">*</span>
                      </div>
                      <input
                        className="dropdown-select1"
                        style={{ padding: "7px 5px" }}
                        type="datetime-local"
                        value={formData.schedulingEndDateTime}
                        min={getCurrentDateTime()}
                        onChange={(e) =>
                          handleSchedulingEndDateChange(e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-imo">
                <div className="dropdown-container">
                  <div className="dropdown-label">
                    Duration (in hours) <span className="required">*</span>{" "}
                  </div>
                  <input
                    className="dropdown-select1"
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      handleFormDataChange({ duration: e.target.value })
                    }
                    placeholder="Type here..."
                    required
                  />
                </div>
                <div className="dropdown-container">
                  <div className="dropdown-label">
                    Number of Students <span className="required">*</span>{" "}
                  </div>
                  <input
                    className="dropdown-select1"
                    type="number"
                    value={formData.noOfStudents}
                    onChange={(e) =>
                      handleFormDataChange({ noOfStudents: e.target.value })
                    }
                    placeholder="Type here..."
                    required
                  />
                </div>
                <div className="dropdown-container">
                  <div className="dropdown-label">
                    Upload Document <span className="required">*</span>{" "}
                  </div>
                  <input
                    className="dropdown-select1"
                    type="file"
                    onChange={handlefile}
                    accept="application/pdf"
                  />
                </div>

                <div className="dropdown-container">
                  <label htmlFor="pslevel" className="dropdown-label">
                    PS - Level Cleared <span className="required">*</span>
                  </label>
                  <select
                    id="pslevel"
                    className="dropdown-select"
                    required
                    onChange={(e) =>
                      handleFormDataChange({ setps: e.target.value })
                    }
                  >
                    <option
                      style={{ color: "#2B3674", fontWeight: "600" }}
                      value=""
                      selected
                      disabled
                      hidden
                    >
                      Select options
                    </option>
                    <option value="c programming 1">
                      C - Programming Level 1
                    </option>
                    <option value="c programming 2">
                      C - Programming Level 2
                    </option>
                    <option value="c programming 3">
                      C - Programming Level 3
                    </option>
                    <option value="c programming 4">
                      C - Programming Level 4
                    </option>
                    <option value="c programming 5">
                      C - Programming Level 5
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="threebuttonintwopage">
              <div>
                <button
                  type="button"
                  className="trashbutinpage"
                  onClick={() => setShowNotifications11(!showNotifications11)}
                >
                  <TbTrashXFilled />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="previouseventbut"
                  onClick={goToPreviousPage}
                >
                  {"<"} Previous Event
                </button>
              </div>
              <div>
                <button type="submit" className="createeventbut">
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNotifications && <Notification />}
      {showNotifications11 && (
        <Trashpopup handDelete={handDelete} darkMode={darkMode} />
      )}
      <EventCreated
        open={showCreated}
        onClose={() => setShowCreated(false)}
        darkMode={darkMode}
      />
    </form>
  );
}

export default Eventform2;
