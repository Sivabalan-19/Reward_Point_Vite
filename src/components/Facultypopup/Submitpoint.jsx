import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";import { FaMarker } from "react-icons/fa6";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide 
             direction={props.in ? "right" : "left"} 
             ref={ref} 
             {...props} 
           />;
  });
  

export default function Submitpoint({props,darkMode}) {
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
        
        <div className={`popfac ${darkMode ? 'dark-mode' : ''}`}>
      
      <div className='popupmainbox'>
          <div className='eventstat'>Point Submitted</div>

          <div style={{padding:'25px 0px', justifyContent:'center',display:'flex'}}>
            <div className='eventpopicon-trash' style={{backgroundColor:'#01B574'}}>
              <div className='chekckfa' >
                  <FaMarker  />
              </div>
            </div>
            
          </div>
              <div className='Reward' style={{textAlign:'center'}}>The point are added to Students</div>
          
    </div>
  </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
