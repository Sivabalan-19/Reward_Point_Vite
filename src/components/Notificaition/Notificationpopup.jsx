import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Notification from "./Notification";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notificationpopup(props) {
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
            width: "350px",
            height: "650px",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Notification
            h={handleClose}
            rows={props.row}
            setRows={props.setRows}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
