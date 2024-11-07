import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Trashpopup(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const dele = () => {
    handDelete();
    h();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md" // Set the maximum width of the dialog
        fullWidth // Make the dialog take up the full width
        sx={{
          "& .MuiDialogContent-root": {
            padding: 0,
            height: "100%", // Make the DialogContent take up full height
            display: "flex", // Add flex display to adjust its content properly
            flexDirection: "column", // Ensure column layout
          },
          "& .MuiDialogActions-root": {
            padding: 0,
          },
          "& .MuiPaper-root": {
            width: "600px", // Set custom width if needed
            height: "290px", // Set custom height if needed
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div
            className={`pop ${darkMode ? "dark-mode" : ""}`}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="popupmainbox">
              <div className="eventstat">Are you sure to cancel request</div>

              <div
                style={{
                  padding: "25px 0px",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <div className="eventpopicon-trash">
                  <div className="chekck">
                    <TbTrashXFilled />
                  </div>
                </div>
              </div>
              <div className="trashbuttondiv">
                <div className="poptrashdivstyle">
                  <button className="nocontiuebut" onClick={h}>
                    NO Continue{" "}
                  </button>
                </div>
                <div className="poptrashdivstyle">
                  <button className="trashreqbut" onClick={dele}>
                    {" "}
                    YES Trash Request
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
