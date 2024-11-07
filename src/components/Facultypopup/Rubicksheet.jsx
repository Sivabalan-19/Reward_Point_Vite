import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Rubicssheet({rows,setRows}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const totalPoints = rows.reduce((total, row) => total + row.maxMarks, 0) || 0;

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, name: "Abcd", maxMarks: 20 };
    setRows([...rows, newRow]);
  };

  const handleSave = () => {
    handleClose();
  };

  const handleTrash = () => {
    setRows(rows.slice(0, -1));
  };

  const handleEditRow = (id, newName, newMarks, level) => {
    setRows(
      rows.map((row) =>
        row.id === id
          ? { ...row, name: newName, maxMarks: newMarks, level: level }
          : row
      )
    );
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
            height: "320px", // Set custom height if needed
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="rubicsheet">
            <div className="button-out">
              <button className="add-button" onClick={handleAddRow}>
                Add +
              </button>
            </div>
            <div className="table-layout">
              <table className="rubictable">
                <thead>
                  <tr>
                    <th className="thofrubic">S.No </th>
                    <th className="thofrubic">Name</th>
                    <th className="thofrubic">Max marks</th>
                    <th className="thofrubic">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id < 10 ? `0${row.id}` : row.id}</td>
                      <td>
                        <input
                          className="name-rubic"
                          type="text"
                          value={row.name}
                          onChange={(e) =>
                            handleEditRow(
                              row.id,
                              e.target.value,
                              row.maxMarks,
                              row.level
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="name-rubic"
                          type="number"
                          value={row.maxMarks}
                          onChange={(e) =>
                            handleEditRow(
                              row.id,
                              row.name,
                              Number(e.target.value),
                              row.level
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="name-rubic"
                          type="number"
                          value={row.level}
                          onChange={(e) =>
                            handleEditRow(
                              row.id,
                              row.name,
                              row.maxMarks,
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="total-ru">
                  <tr>
                    <td colSpan="2">Total points</td>
                    <td>{totalPoints}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="button-group-bot">
              <button className="trash-button-bot" onClick={handleTrash}>
                Trash
              </button>
              <button className="save-button-bot" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
