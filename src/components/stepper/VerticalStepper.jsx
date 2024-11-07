import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  StepConnector,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { grey, blue, green } from "@mui/material/colors";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: green[500], // Use green as the primary color
    },
    secondary: {
      main: blue[500], // Use blue as the secondary color
    },
  },
});
// Custom styled stepper component
const CustomStepper = styled(Stepper)({
  "& .MuiStepIcon-root": {
    color: grey[400], // Default color for step icons
  },
  "& .MuiStepIcon-completed": {
    color: green[500], // Color for completed step icons
  },
  "& .MuiStepIcon-active": {
    color: blue[500], // Color for the active step icon
  },
});
// Custom StepConnector to adjust spacing
const CustomStepConnector = styled(StepConnector)({
  "& .MuiStepConnector-line": {
    borderColor: grey[400], // Line color
    borderTopWidth: 2, // Adjust the line width if needed
  },
  "& .Mui-active .MuiStepConnector-line": {
    borderColor: green[700], // Color for the active step line
  },
  "& .Mui-completed .MuiStepConnector-line": {
    borderColor: green[500], // Color for the completed step line
  },
});

// Custom StepLabel component
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    color: grey[700], // Default color for step labels
  },
  "& .Mui-active .MuiStepConnector-line": {
    color: blue[500], // Color for the active step label
  },
  "& .Mui-completed .MuiStepLabel-label": {
    color: green[500], // Color for completed step labels
  },
}));

const steps = [
  "Event Sumbiteed",
  "Admin Approved",
  "Student Registered",
  "Attendance opened",
  "Attendance Update Pending",
  "Points Update",
  "Rewards Results",
  "Event Completion Pending",
];

const Verticalstepper = ({ status }) => {
  // Start on the third step
  const [activeStep, setActiveStep] = useState(status);

  useEffect(()=>{
setActiveStep(status)
  },[status])

  return (
    <div style={{width:'80%',padding:'0 10%'}}>
      <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", maxWidth: 600, margin: "auto" }}>
        <CustomStepper
          activeStep={activeStep}
          orientation="vertical"
          connector={<CustomStepConnector />}
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              sx={{
                "& .Mui-active": {
                  color: index === activeStep ? blue[500] : grey[700], // Color for the active step label
                },
              }}
            >
              <CustomStepLabel sx={{ padding: "0px" }}>{label}</CustomStepLabel>
            </Step>
          ))}
        </CustomStepper>
      </Box>
    </ThemeProvider>
    </div>
  );
};

export default Verticalstepper;
