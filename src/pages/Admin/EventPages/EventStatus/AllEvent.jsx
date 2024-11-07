import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { IoMoon } from "react-icons/io5";
import { MdLightMode, MdNotificationsNone } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { format } from 'date-fns';
import AdminAll from "../AdminAll";

const AllStatus = ({ nextPage, darkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEventRegister, setShowEventRegister] = useState(false);
  const [data, setData] = useState([]);
  const [eventData, setEventData] = useState(null);
  
  const showRegisterForm = (id,data) => {
   
    setShowEventRegister(true);
    
    let row = data.find(o => o.id == id);
    setEventData(id);
  
  };

  const columns = useMemo(
    () => [
      { Header: "SNO", accessor: "sno" },
      { Header: "EventName", accessor: "Activity_name",
        
      },

      { Header: "Eventtype", accessor: "Activity_type",
        
         },
      { Header: "Event Category", accessor: "Activity_category" },
      { Header: "Event_code", accessor: "Activity_code" },
      { Header: "start date", accessor: "StartDate",
        Cell: ({ cell: { value } }) => (
            <span>{format(new Date(value), 'dd-MM-yy')}</span>
          )
      },
      { Header: "end date", accessor: "EndDate",
        Cell: ({ cell: { value } }) => (
            <span>{format(new Date(value), 'dd-MM-yy')}</span>
          )
       },
      { Header: "action", accessor: "status" ,filter: 'custom',Cell: ({ cell: { value } }) => {
    
          
        return (
        
            <span >{value ==1 ?<div style={{color:'orange'}}>PENDING</div>:value==9?<div style={{color:'red'}}>REJECTED</div>:value>1  &&value<9 ?<div style={{color:'green'}}>APPROVED</div>:""}</span>
           
        );
      } },
      {
        Header: "view",
        accessor: "Event_id",
        Cell: ({ cell: { row } }) => (
          <div>
            <button className="view-em" onClick={() =>{nextPage(row.original.Event_id,row.original.status)
           
            }}>
              view
            </button>
          </div>
        )
      }
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(import.meta.env.VITE_API_URL+"admin/approve",{
          headers:{
                   withCredentials:true,
                   'Authorization': localStorage.getItem("authToken")

                  }
 });
        const reversedData = response.data.message.reverse().map((row, index) => ({ ...row, sno: index + 1 }));
        setData(reversedData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);




  return (
    <div className={`con ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header11">
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', height: '100%' }}>
          <div className="Dash-em">Dashboard</div>
        </div>
        <div className="theme">
          <div className="noti" onClick={() => setShowNotifications(!showNotifications)}>
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
        </div>
      </div>
      <div className="allbody">
 
        <AdminAll columns={columns} data={data} Table_header_name="admin"></AdminAll>
      </div>
    </div>
  );
};
export default AllStatus;
