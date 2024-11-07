import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AdminRubicks from "./AdminRubick";
import SoloReport from "./SoloReport";
import { IoEyeSharp } from "react-icons/io5";
import TeamReport from "./TeamReport";
const AdminRpChoose = ({
  darkMode,
  toggleDarkMode,
  nextPage,
  selectedEventId,
  teamsize
}) => {
  
  const [uSe,  setuse] = useState(0);
  const [teamid,  setteamid] = useState(-1);
  const [Data, setData] = useState([]);
  const [Data3, setData3] = useState([]);
  const [Data2, setData2] = useState([]);
  const teampage=(id)=>{
    setteamid(id)
  }
  const Approve = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "admin/PointsApproved",
        {
          id: selectedEventId,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [Task, setTask] = useState([]);
  const [student_id, setstudent_id] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotifications1, setShowNotifications1] = useState(false);
  const columns2 = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "teamName", accessor: "teamname" },
      { Header: "projectName", accessor: "project_namel" },
      { Header: "teamSize", accessor: "team_size" },
      { Header: "projectDesc", accessor: "project_desc" },
      { Header: "viewteamnumbers", accessor: "teamid", 
        Cell:({cell:{value}})=>(<button onClick={()=>{
            teampage(value)
        }} className="view-em"> view</button>),       }
       
    ],
    []
  );
  useEffect(() => {

    const fetchData = async () => {
   
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/teamapproveattendence",
          { id: selectedEventId },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        const reversedData = response.data.message
       
          .reverse()
          .map((row, index) => ({ ...row, sno: index + 1 }));
        setData2(reversedData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teamsize>1?fetchData():console.log();
  }, [teamsize]);
  useEffect(() => {

    const fetchData = async () => {
   
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "admin/pointreportforteam",
          { teamid: teamid,eventid:selectedEventId },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        const reversedData = response.data.message
       
          .reverse()
          .map((row, index) => ({ ...row, sno: index + 1 }));
        setData3(reversedData);
       
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teamid!=-1?fetchData():console.log();
  }, [teamid,uSe]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "admin/pointreport",
          {
            id: selectedEventId,
          },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        const reversedData = response.data.message
          .reverse()
          .map((row, index) => ({ ...row, sno: index + 1 }));
        setData(reversedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    teamsize==1?fetchData():console.log();
  }, [uSe]);

  useEffect(() => {
    const taskData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "faculty/task",
          {
            id: selectedEventId,
          },
          {
            headers: {
              withCredentials: true,
              Authorization: localStorage.getItem("authToken"),
            },
          }
        );
        var task = response.data.message.map((row, index) => ({
          ...row,
          sno: index + 1,
        }));
        task = task.map((row, index) => ({ ...row, obtained_mark: 0 }));
        setTask(task);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    taskData();
  }, []);
  // const taskSumbit = async (points_text) => {
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const response = await axios.post(
  //       import.meta.env.VITE_API_URL + "faculty/sumbittask",
  //       {
  //         text: points_text,
  //       },
  //       {
  //         headers: {
  //           withCredentials: true,
  //           Authorization: localStorage.getItem("authToken"),
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // const sumbit_task = () => {
  //   var points_text = "";
  //   const result = Task.map((item) => {
  //     points_text +=
  //       "(" +
  //       item.user_id +
  //       "," +
  //       item.obtained_mark +
  //       "," +
  //       item.task_id +
  //       "),";
  //   });
  //   points_text = points_text.slice(0, points_text.length - 1);

  //   taskSumbit(points_text);
  // };

  // const [showEventRegister, setShowEventRegister] = useState(false);
  // const [eventData, setEventData] = useState(null);

  // const showRegisterForm = (id, data) => {
  //   setShowEventRegister(true);

  //   let row = data.find((o) => o.id == id);
  //   setEventData(id);
  // };
  // const Student_regestration = async () => {
  //   try {
  //     axios.defaults.withCredentials = true;
  //     const response = await axios.post(
  //       import.meta.env.VITE_API_URL + "faculty/openregistration",
  //       {
  //         id: selectedEventId,
  //       },
  //       {
  //         headers: {
  //           withCredentials: true,
  //           Authorization: localStorage.getItem("authToken"),
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const columns = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "Name", accessor: "username" },
      { Header: "Reg No", accessor: "rollno" },
      { Header: "Department", accessor: "department_name" },
      { Header: "Year", accessor: "year" },
      { Header: "Maxpoint", accessor: "max" },
      { Header: "Obtained", accessor: "obtained" },
      {
        Header: "view",
        accessor: "student_id",
        Cell: ({ cell: { value } }) => (
          <div>
            <div
              style={{ fontSize: "16px" }}
              onClick={async () => {
                await setstudent_id(value);

                setShowNotifications1(true);
              }}
            >
              <IoEyeSharp />
            </div>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="main-body">
      <div className="scrollonly-em">
        { teamsize==1 && <SoloReport
          columns={columns}
          data={Data}
          Task={Task}
          Table_header_name="Attendence table"
        ></SoloReport>}
          { teamsize>1 && teamid!=-1 && <SoloReport
          columns={columns}
          data={Data3}
          Task={Task}
          Table_header_name="Attendence table"
        ></SoloReport>}
          { teamsize>1 && teamid==-1 && <TeamReport
              columns={columns2}
              data={Data2}
              />}
        {/* <SoloReport
          columns={columns}
          data={Data}
          Task={Task}
          Table_header_name="Attendence table"
        ></SoloReport> */}
        <button
          onClick={() => {
            Approve();
          }}
          className="previouseventbut1-cresu"
        >
          Approve
        </button>
      </div>

      {showNotifications1 && (
        <AdminRubicks
          setShowNotifications1={setShowNotifications1}
          Event_id={selectedEventId}
          student_id={student_id}
          setuse={setuse}
        ></AdminRubicks>
      )}
    </div>
  );
};
export default AdminRpChoose;
