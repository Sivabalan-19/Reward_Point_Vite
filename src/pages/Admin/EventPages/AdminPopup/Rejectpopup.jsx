import * as React from 'react';
import { useState } from 'react'; // Import useState
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RejectPopup(props) {
  const [open, setOpen] = React.useState(true);
  const [rd, srd] = useState(''); // Initialize with an empty string

  const handleClose = () => {
    setOpen(false);
    props.setRejectNotifications(false);
  };

  const dele = () => {
    props.reject();
    props.setRejectNotifications(false);
  };

  const datachange = (e) => {
    srd(e.target.value);
    props.setrejectdetails(e.target.value); // Update rejection details directly
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
          '& .MuiDialogContent-root': {
            padding: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          '& .MuiDialogActions-root': {
            padding: 0,
          },
          '& .MuiPaper-root': {
            width: '600px',
            height: '290px',
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} className={`pop ${props.darkMode ? 'dark-mode' : ''}`}>
            <div className='popupmainbox'>
              <div className='eventstat'>Are you sure to Reject the Event?</div>
              <div style={{ padding: '25px 0px', justifyContent: 'center', display: 'flex' }}>
                <textarea
                  className="multi-rej"
                  style={{ backgroundColor: 'transparent' }}
                  value={rd}
                  onChange={datachange}
                />
              </div>
              <div className='trashbuttondiv'>
                <div className='poptrashdivstyle'>
                  <button className='nocontiuebut' onClick={handleClose}>NO Thanks</button>
                </div>
                <div className='poptrashdivstyle'>
                  <button className='trashreqbut' onClick={dele}>Reject Request</button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
