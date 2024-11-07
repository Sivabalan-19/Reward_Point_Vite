import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { MdCelebration } from "react-icons/md";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide 
             direction={props.in ? "right" : "left"} 
             ref={ref} 
             {...props} 
           />;
  });

  
  

  export default function Seteventcompleated({props, darkMode }) {
    const [open, setOpen] = React.useState(true);
    const [showCrackers, setShowCrackers] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const triggerCrackers = () => {
      setShowCrackers(true);
      setTimeout(() => {
        setShowCrackers(false);
      }, 3000); 
    };
  
    return (
      <React.Fragment>
        {/* Cracker animation */}
        {showCrackers && (
          <div className="crackers-container">
            {/* Crackers animation code */}
            <MdCelebration size={100} />
            {/* Add more cracker elements or animations */}
          </div>
        )}
  
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
              width: "600px",
              height: "270px",
            },
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <div
              className={`popfac ${darkMode ? "dark-mode" : ""}`}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div className="popupmainbox">
                <div className="eventstat">Event completed</div>
                <div
                  style={{
                    padding: "25px 0px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <div
                    className="eventpopicon-trash"
                    style={{ backgroundColor: "#01B574" }}
                    onClick={triggerCrackers}
                  >
                    <div className="chekckfa">
                      <MdCelebration />
                    </div>
                  </div>
                </div>
                <div className="Reward" style={{ textAlign: "center" }}>
                  The event completed successfully
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
  
