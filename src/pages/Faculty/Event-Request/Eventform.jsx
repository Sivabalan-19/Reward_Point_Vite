import React, { useState } from "react";

import axios from "axios";
import Eventform1 from "./EventformPage1";
import Eventform2 from "./EventformPage2";
function EventForm({ darkMode, toggleDarkMode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setfile] = useState();
  const [selected, setSelected] = useState({});
  const [dAta, setdAta] = useState([]);
  const [saved, setsaved] = useState(0);
  const [rows, setRows] = useState([
    { id: 1, name: "Abcd", maxMarks: 20, level: 1 },
    { id: 2, name: "Abcd", maxMarks: 20, level: 1 },
    { id: 3, name: "Abcd", maxMarks: 20, level: 1 },
  ]);

  let currentTime = new Date();
  const initialFormData = {
    EventType: "",
    selectedType: "",
    mode: "",
    category: "",
    eventName: "",
    onlinemode: true,
    offinemode: false,
    rewardmode: true,
    honourmode: false,
    eventDetails: "",
    maxPoints: "",
    departmentAndYear: "",
    startDateTime: currentTime,
    endDateTime: "",
    schedulingStartDateTime: currentTime,
    schedulingEndDateTime: "",
    duration: "",
    noOfStudents: "",
    teamsize: "0",
    round: "0",
    setps: "cpl1",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [filE, setfilE] = useState();

  const handlefile = (e) => {
    setfilE(e.target.files[0]);
  };
  // const handleUpload=()=>{

  //   formdata.append('image',filE)
  //   formdata.append('eventId', formData.eventName);

  //   console.log(formData)
  //   if(formData){
  //     console.log(formData)
  //     console.log("image upload start")
  //     const response=axios.post(import.meta.env.VITE_API_URL+'upload', formdata,{
  //       headers:{
  //                withCredentials:true,

  //               }
  // })
  //   }

  // }
  const handleUpload = async () => {
    console.log("uploaded");
    if (!filE) {
      alert("Please select a file first!");
      return;
    }

    const formDatA = new FormData();
    formDatA.append("pdf", filE);
    formDatA.append("eventId", formData.eventName);

    Response = await axios.post("http://localhost:5000/upload", formDatA);
  };
  const handleDelete = () => {
    setFormData(initialFormData);
    setCurrentPage(1);
  };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFormDataChange = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = async (event) => {
    axios.defaults.withCredentials = true;

    const response = await axios.post(
      import.meta.env.VITE_API_URL + "addevents",
      {
        eventdata: formData,
        departmentdata: dAta,
        points: rows,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
  };

  return (
    <div
      style={{ height: "100%" }}
      className={`eventrequesteve ${darkMode ? "dark-mode" : ""}`}
    >
      {currentPage === 1 && (
        <Eventform1
          goToNextPage={goToNextPage}
          formData={formData}
          handleFormDataChange={handleFormDataChange}
          handDelete={handleDelete}
          rows={rows}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setRows={setRows}
          setdAta={setdAta}
          setSelected={setSelected}
          selected={selected}
          setsaved={setsaved}
          saved={saved}
        />
      )}
      {currentPage === 2 && (
        <Eventform2
          goToPreviousPage={goToPreviousPage}
          formData={formData}
          handleFormDataChange={handleFormDataChange}
          handleSubmit={handleSubmit}
          handDelete={handleDelete}
          filE={filE}
          handlefile={handlefile}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleUpload={handleUpload}
        />
      )}
    </div>
  );
}

export default EventForm;
