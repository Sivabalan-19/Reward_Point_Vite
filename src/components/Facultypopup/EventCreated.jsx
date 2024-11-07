import Dialog from "@mui/material/Dialog";
import React from "react";
import { FaCheck } from "react-icons/fa6";

function EventCreated({ open, onClose, darkMode }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: "600px", 
        },
      }}
    >
      <div
        className={`popcr ${darkMode ? "dark-mode" : ""}`}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div className="popupmainbox">
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              Event created Successfully
            </div>
            <div
              style={{
                padding: "25px 0px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div className="eventpopicon">
                <div className="chekck">
                  <FaCheck />
                </div>
              </div>
            </div>
            <div style={{ padding: "20px 0px" }}>
              Don’t forget to check the <br />
              MY EVENTS page for regular Updates
            </div>
          </div>
        </div>
      </div>
      {/* <DialogActions>
        <Button onClick={onClose} color="primary">OK</Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default EventCreated;
