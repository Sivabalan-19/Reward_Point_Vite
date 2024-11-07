import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Function to format date as yyyy-mm-dd
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function SingleEventDet(props) {
  const [open, setOpen] = React.useState(true);
  const [documenttype, setdocumenttype] = useState("");
  const [file, setFile] = useState(null);
  const [document_list, setDocumentList] = useState([]);

  const navigate = useNavigate();
  const { detail, id, onDeleteRow, onc, darkMode, teamSize } = props;
  
  let row = detail.find((o) => o.id === id) || {};

  const handleClose = async () => {
    setOpen(false);
    onc();
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleupload = async () => {
    const formDatA = new FormData();
    formDatA.append("pdf", file);
    formDatA.append("title", documenttype);
    formDatA.append("event_id", id);
    await axios.post(
      "http://localhost:5000/upload2/studentinsert",
      formDatA,
      {
        headers: {
          withCredentials: true,
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialogContent-root": {
            padding: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          "& .MuiDialogActions-root": {
            padding: 0,
          },
          "& .MuiPaper-root": {
            width: "850px",
            height: "650px",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className={`container-er ${darkMode ? "dark-mode" : ""}`}>
            <div className="eventinfobox">
              <div className="myeventtitle">
                <div className="myeventtit">Event Details :</div>
                <button className="cross" onClick={handleClose}>
                  <RxCross2 />
                </button>
              </div>
              <div className="activity-info">
                <div className="info-row">
                  <div className="info-column">
                    <div className="info-item">
                      <div className="labele">Activity Name</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.Activity_name}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Activity Category</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.Activity_type}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Available</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.seat}</div>
                    </div>
                    <div className="info-item1">
                      <div className="labe">Date &ensp; : &ensp;</div>
                      <div className="value1">
                        {formatDate(row.Date)} to {formatDate(row.endDate)}
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Ps Level Cleared</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.psSkillName} : {row.psSkilllevel}</div>
                    </div>
                  </div>
                  <div className="info-column">
                    <div className="info-item">
                      <div className="labele">Activity Type</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.Activity_type}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Points(Max)</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.points}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Organizer</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.Organier}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Duration</div>
                      <div className="valuee"> :</div>
                      <div className="value">{row.duration}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Team Size</div>
                      <div className="valuee"> :</div>
                      <div className="value">1</div>
                    </div>
                  </div>
                </div>
                <div className="myeventdescription">
                  <div className="myeventdesctit">About Event :</div>
                  <div className="myeventtexdescr">{row.descr}</div>
                </div>
                <div className="geotagcer">
                  <div className="Reward" style={{ fontSize: "24px" }}>
                    Certificate Upload
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>Add Geo Tag Image:</h3>
                    <div className="dropdown-container">
                      <select
                        className="dropdown-select"
                        value={documenttype}
                        onChange={(e) => setdocumenttype(e.target.value)}
                      >
                        <option
                          style={{ color: "#2B3674", fontWeight: "600" }}
                          value=""
                          selected
                          disabled
                          hidden
                        >
                          Select Geo Tag
                        </option>
                        <option value="geoTag">Geo Tag</option>
                        <option value="document">Document</option>
                        <option value="certificate">Certificate</option>
                      </select>
                    </div>
                    <label htmlFor="file-upload">Choose File</label>
                    <input id="file-upload" type="file" onChange={onChange} />
                    <div
                      style={{
                        backgroundColor: "red",
                        width: "100%",
                        height: "50%",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    ></div>
                  </div>
                  <div>
                    <button
                      onClick={handleupload}
                      className="view-em"
                      style={{ padding: "1.2%  4%", marginBottom: "50px" }}
                    >
                      Submit
                    </button>
                    <div>
                      {document_list.map((item, index) => (
                        <div key={index}>
                          {item.file && (
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Uploaded File
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
