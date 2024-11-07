import * as React from "react";
import { useState, useEffect } from "react"; // Ensure useState and useEffect are imported
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import axios from "axios"; // Ensure axios is imported

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminRubicks(props) {
  const [tAsk, settAsk] = useState([]);
  const [open, setOpen] = useState(true);

  const handleSubmit = async () => {
    let maRk = "UPDATE points_students SET point = CASE";
    let task = "(";

    tAsk.forEach((mark) => {
      maRk += ` WHEN task_id = ${mark.task_id} THEN ${mark.point}`;
      task += `${mark.task_id},`;
    });

    task = task.slice(0, -1) + ")";
    maRk += ` END WHERE student_id = ${props.student_id} AND task_id IN ${task};`;

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/adminRubricUpdate`,
        { Text: maRk },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      props.setuse((prevUSe) => (prevUSe ? 0 : 1));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    const taskData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}admin/adminRubricApprove`,
          {
            student_id: props.student_id,
            Event_id: props.Event_id,
          },
          {
            headers: {
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );

        const task = response.data.message.map((row, index) => ({
          ...row,
          sno: index + 1,
        }));

        settAsk(task);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    taskData();
  }, [props.student_id, props.Event_id]);

  const handleMarksChange = (sno, newMarks) => {
    const updatedMarks = tAsk.map((mark) =>
      mark.sno === sno ? { ...mark, point: newMarks } : mark
    );
    settAsk(updatedMarks);
  };

  const totalPoints = tAsk.reduce(
    (total, mark) => total + (parseInt(mark.point, 10) || 0),
    0
  );

  const handleClose = () => {
    props.setShowNotifications1(false);
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
            height: "300px",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="rupop">
            <div className="Reward" style={{ margin: "10px 0px" }}>
              Rubrics Mark Sheet
            </div>
            <div className='table-layout'>
              <table className="rubictable">
                <thead>
                  <tr>
                    <th className="thofrubic">S.No</th>
                    <th className="thofrubic">Name</th>
                    <th className="thofrubic">Max marks</th>
                    <th className="thofrubic">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {tAsk.map((mark, index) => (
                    <tr key={mark.sno}>
                      <td className='ru-inp-so'>{index + 1}</td>
                      <td className='ru-inp-inp'>{mark.point_Name}</td>
                      <td>
                        <input
                          type="number"
                          value={mark.point || ""}
                          onChange={(e) => handleMarksChange(mark.sno, e.target.value)}
                          className="ru-inp"
                        />{" "}
                        / {mark.max_point}
                      </td>
                      <td className='ru-inp-inp'>{mark.level}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className='total-ru'>
                    <td colSpan="2">Total</td>
                    <td>{totalPoints}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="button-group-bot">
              <button
                className="trash-button-bot"
                onClick={handleClose}
              >
                Trash
              </button>
              <button
                className="save-button-bot"
                onClick={() => {
                  handleSubmit();
                  props.setShowNotifications1(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
