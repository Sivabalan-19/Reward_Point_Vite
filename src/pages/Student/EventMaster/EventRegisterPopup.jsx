import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { RxCross2 } from "react-icons/rx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventRegisterPopup(props) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { detail, id, onDeleteRow, onc, darkMode, teamSize } = props;

  // Check if the row exists, and provide a fallback
  let row = detail.find((o) => o.id === id) || {};


  const handleClose = () => {
    setOpen(false);
    onc(); // Ensure to call the close function passed as prop
  };

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
                      <div className="value1">{formatDate(row.Date)} to {formatDate(row.endDate)}</div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Ps Level Cleared</div>
                      <div className="valuee"> :</div>
                      <div className="value"></div>
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
                      <div className="value"></div>
                    </div>
                    <div className="info-item">
                      <div className="labele">Team Size</div>
                      <div className="valuee"> :</div>
                      <div className="value"></div>
                    </div>
                  </div>
                </div>
                <div className="myeventdescription">
                  <div className="myeventdesctit">About Event :</div>
                  <div className="myeventtexdescr">{row.descr}</div>
                </div>
                <div className="myeventregis">
                  <button
                    className="myeventregiesbut"
                    onClick={() => {
                      const team_size = teamSize;
                      const event_id = id;
                      if (team_size !== 1) {
                        navigate("/student/teamregistraionform", {
                          state: { team_size, event_id },
                        });
                      } else {
                        onDeleteRow(id);
                      }
                    }}
                  >
                    Register Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
