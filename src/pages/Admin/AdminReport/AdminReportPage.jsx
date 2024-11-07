import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { format } from 'date-fns';
import AdminReportTable from "./AdminReportTable";

const AdminReportPage= ({ nextPage, darkMode, toggleDarkMode }) => {
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
      { Header: "EventName", accessor: "Activity_name",},
      { Header: "Event_code", accessor: "Activity_code" },
      { Header: "Eventtype", accessor: "Activity_type",},
      { Header: "Event Category", accessor: "Activity_category" },
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
      { Header: "", accessor: "status" ,filter: 'custom',Cell: ({ cell: { value } }) => {
    
          
        return (
        
            <span >
            </span>
           
        );
      } },
      {
        Header: "view",
        accessor: "Event_id",
        Cell: ({ cell: { row } }) => (
          <div>
            <button className="view-em" onClick={() =>{nextPage(row.original.Event_id,row.original.team_size)
           
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
        const response = await axios.get(import.meta.env.VITE_API_URL+"admin/report",{
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
    <div className= "con ">
        <AdminReportTable columns={columns} data={data} Table_header_name="admin"></AdminReportTable>
    </div>
  );
};
export default AdminReportPage;
