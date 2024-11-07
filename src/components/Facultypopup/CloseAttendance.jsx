import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { RiFileCloseLine } from "react-icons/ri";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide 
             direction={props.in ? "right" : "left"} 
             ref={ref} 
             {...props} 
           />;
  });
  

export default function Closeattendance({props,darkMode}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
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
            width: "600px", 
            height: "270px", 
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
        
    <div className={`pop ${darkMode ? 'dark-mode' : ''}`}style={{display:'flex', justifyContent:'flex-end' }}>
        <div className='popupmainbox' >
            <div className='eventstat'>Attendance Closed</div>
            <div style={{padding:'25px 0px', justifyContent:'center',display:'flex'}}>
              <div className='eventpopicon-trash' >
                <div className='chekckfa' >
                <RiFileCloseLine />
                </div>
              </div>
            </div>
          <div className='Reward' style={{textAlign:'center'}}>Reward points need to be given</div>
      </div>
    </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
