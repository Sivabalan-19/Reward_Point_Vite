import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Departmentpopup({
  setdAta,
  setRows,
  setSelected,
  selected,
  saved,
  setsaved,
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeptChoose = (selectedData) => {
    // Pass the selected data back to the parent component
    setdAta(selectedData);
    handleClose();
  };

  // Initial state for selected checkboxes

  const handleTrash = () => {
    setSelected({});
  };
  // Handle checkbox change
  const handleCheckboxChange = (year, dept) => {
    setSelected((prevSelected) => {
      // Toggle the selection status
      const isSelected = prevSelected[year]?.includes(dept);
      const updatedSelection = isSelected
        ? prevSelected[year].filter((d) => d !== dept)
        : [...(prevSelected[year] || []), dept];

      return {
        ...prevSelected,
        [year]: updatedSelection,
      };
    });
  };

  // Prepare data to send to the backend
  const prepareData = () => {
    // Flatten the selected state into an array of objects
    const data = Object.entries(selected).reduce((acc, [year, depts]) => {
      depts.forEach((dept) => acc.push({ year, department: dept }));
      return acc;
    }, []);

    return data;
  };

  // Submit handler
  const handleSubmit = () => {
    setdAta(prepareData());
    setsaved(1);
    handleClose();
    const data = prepareData();

    // Send the data to the backend using fetch or any other method
    // fetch('your-backend-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
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
            width: "650px",
            height: "400px",
          },
        }}
      >
        <DialogContent>
          <div style={{ height: "100%", width: "100%", display: "flex" }}>
            <div className="departmecont">
              <div className="headerdept">
                <div
                  style={{
                    width: "94%",
                    justifyContent: "end",
                    display: "flex",
                    padding: "0px 20px",
                  }}
                >
                  {/* <div style={{ padding: '0% 5%' }}>
              <input className="deptconttool" placeholder="Search" />
            </div> */}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "88%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    border: "1px green",
                    width: "95%",
                    height: "95%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="depttablhead">
                    <div>Year</div>
                    <div>Department</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      height: "60%",
                      flexDirection: "column",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    {[
                      {
                        year: "01",
                        departments: [
                          "CSE",
                          "IT",
                          "ECE",
                          "EEE",
                          "MECH",
                          "FD",
                          "BM",
                          "CIVIL",
                          "CSD",
                          "EI",
                          "ISC",
                          "MTRS",
                          "AG",
                          "AIDS",
                          "AIML",
                          "BT",
                          "FT",
                          "TT",
                        ],
                      },
                      {
                        year: "02",
                        departments: [
                          "CSE",
                          "IT",
                          "ECE",
                          "EEE",
                          "MECH",
                          "FD",
                          "BM",
                          "CIVIL",
                          "CSD",
                          "EI",
                          "ISC",
                          "MTRS",
                          "AG",
                          "AIDS",
                          "AIML",
                          "BT",
                          "FT",
                          "TT",
                        ],
                      },
                      {
                        year: "03",
                        departments: [
                          "CSE",
                          "IT",
                          "ECE",
                          "EEE",
                          "MECH",
                          "FD",
                          "BM",
                          "CIVIL",
                          "CSD",
                          "EI",
                          "ISC",
                          "MTRS",
                          "AG",
                          "AIDS",
                          "AIML",
                          "BT",
                          "FT",
                          "TT",
                        ],
                      },
                      {
                        year: "04",
                        departments: [
                          "CSE",
                          "IT",
                          "ECE",
                          "EEE",
                          "MECH",
                          "FD",
                          "BM",
                          "CIVIL",
                          "CSD",
                          "EI",
                          "ISC",
                          "MTRS",
                          "AG",
                          "AIDS",
                          "AIML",
                          "BT",
                          "FT",
                          "TT",
                        ],
                      },
                    ].map(({ year, departments }) => (
                      <div className="deptrow" key={year}>
                        <div className="checkboxcont">
                          <div>{year}</div>
                        </div>
                        {departments.map((dept) => (
                          <div className="checkboxcont" key={dept}>
                            <input
                              type="checkbox"
                              className="large-checkbox"
                              checked={selected[year]?.includes(dept) || false}
                              onChange={() => handleCheckboxChange(year, dept)}
                            />
                            <div>{dept}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      borderRadius: "0px 0px 5px 5px",
                      display: "flex",
                      height: "13%",
                      backgroundColor: "#dfdfdf",
                      justifyContent: "end",
                    }}
                  >
                    <div className="depttablsel">
                      <div>
                        Total Selected : {Object.values(selected).flat().length}
                      </div>
                    </div>
                  </div>
                  <div className="derptbuton">
                    <div>
                      <button className="derptbutontrash" onClick={handleTrash}>
                        Trash
                      </button>
                    </div>
                    <div>
                      <button className="derptbutonsave" onClick={handleSubmit}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
