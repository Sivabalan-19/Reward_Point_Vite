import React, { useState,useEffect } from 'react';
import { MdNotificationsNone, MdLightMode } from "react-icons/md";
import Notificationpopup from '../../../../components/Notificaition/Notificationpopup';
import axios from 'axios';
import { IoMoon } from "react-icons/io5";
import { format, parseISO, isValid } from 'date-fns';
import { TbTrashXFilled } from 'react-icons/tb';
const initialFormData = {
  Activity_type: '',
  selectedType: '',
  Activity_category: "",
  category: "",
  Activity_name: '',
  onlinemode: true,
  offinemode: false,
  rewardmode: true,
  honourmode: false,
  description: '',
  points: '',
  departmentAndYear: '',
  StartDate: '',
  EndDate: '',
  start_bigintscheduling: '',
  end_bigintscheduling: '',
  duration: '',
  No_of_students_expected: '',
  document: '',
  event_review:''
};
function Rejected({ selectedEventId,prevPage,darkMode,toggleDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);


  const [Data, setData] = useState(initialFormData);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(import.meta.env.VITE_API_URL+ "admin/pending", {
          id: selectedEventId
        }, {
          headers: {
            withCredentials: true,
            'Authorization': localStorage.getItem("authToken")
          }
        });

   
        setData(response.data.message[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedEventId) {
      fetchData();
    }
  }, [selectedEventId]);

  useEffect(() => {
  
  }, [Data]);

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'yyyy-MM-dd\'T\'HH:mm') : '';
  };

  return (
    <div className={`con ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header1">
          <div className="Dash">Dashboard</div>
          <div className="theme">
            <div className="noti"
            onClick={() => setShowNotifications(!showNotifications)} 
            >
              <MdNotificationsNone />
            </div>
            <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
          </div>
        </div>

        <div className='allbody' >
          <div className='main-body--1'>
          <div className='Reward'>EVENT DETAILS</div>
            <div className='reason-rep' style={{marginTop:'1%',marginBottom:'5px',fontSize:'14px',fontWeight:'600'}}>Reason for Rejection</div>
            <div style={{height:'10%',width:'50%'}}>
            <textarea
                    style={{width:'100%',height:'98%',borderRadius:'5px' }}
                    className='rejectetextar'
                    readOnly
                    value={Data.event_review}/>
            </div>
            <div style={{height:'1%',width:'100%',backgroundColor:'red',marginTop:'1%',marginBottom:'1%',borderRadius:'10px'}}></div>
            <div className="row-imo--1">
            <div className="col-imo-1">
              <div className="dropdown-label-rep">
                Type of Event
              </div>
              <div className='dropdown-select-1'>
                <input
                style={{backgroundColor:'transparent'}}
                  className="text-input--rep"
                  type="text"
                  value={Data.Activity_type}
                />
              </div>
              <div className="dropdown-label-rep">
                Sub Category
              </div>
              <div className='dropdown-select-1'>
                <input
                  className="text-input--rep"
                  style={{backgroundColor:'transparent'}}
                  type="text"
                  value={Data.selectedType}
                />
              </div>

              <div className="form-options">
                <div style={{ width: '48%' }}>
                  <div className="dropdown-label-rep">Activity Category</div>
                  <label className="form-row" style={{ width: '100%' }}>
                    <div className='click--box'>
                      <input
                        type="checkbox"
                        name="honorPoints"
                        checked={true}
                      />
                    </div>
                    {Data.Activity_category}
                  </label>
                </div>
                <div style={{ width: '48%' }}>
                  <div className="dropdown-label-rep">Mode of the Event</div>
                  <label className="form-row" style={{ width: '100%' }}>
                    <div className='click--box'>
                      <input
                        type="checkbox"
                        name="honorPoints"
                        checked={true}
                      />
                    </div>
                    {Data.onlinemode ? "online mode" : "offline mode"}
                  </label>
                </div>
              </div>

              <label htmlFor="department-year" className="dropdown-label-rep">
                Departments and Years
              </label>
              <div className='dropdown-select-1'>
                <input
                  className="text-input--rep"
                  style={{backgroundColor:'transparent'}}
                  type="text"
                  value="auto"
                />
              </div>

              <label htmlFor="department-year" className="dropdown-label-rep">
                Duration
              </label>
              <div className='dropdown-select-1'>
                <input
                  className="text-input--rep"
                  style={{backgroundColor:'transparent'}}
                  type="text"
                  value={Data.duration}
                  disabled
                />
              </div>

              <label htmlFor="department-year" className="dropdown-label-rep">
                Total Student Expected
              </label>
              <div className='dropdown-select-1'>
                <input
                  className="text-input--rep"
                  style={{backgroundColor:'transparent'}}
                  type="text"
                  value={Data.No_of_students_expected}
                  disabled
                />
              </div>
              <label htmlFor="department-year" className="dropdown-label-rep">
                Document Attached
              </label>
              <div className='dropdown-select-1'>
                <div className="text-input--rep" style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}> <a href={import.meta.env.VITE_API_URL+Data.document} target="_blank" rel="noopener noreferrer">view Sheet</a></div>
              </div>

            </div>
            <div className="col-imo-1">
              <label className="dropdown-label-rep">
                Name of the Event
              </label>
              <div className='dropdown-select-1'>
                <input
                style={{backgroundColor:'transparent'}}
                  className="text-input--rep"
                  type="text"
                  value={Data.Activity_name}
                  disabled
                />
              </div>
              <div className="dropdown-container-rep">
                <label htmlFor="event-details" className="dropdown-label-rep">
                  Details About the Event
                </label>
                <textarea
                  className="multiline-input-1"
                  style={{ backgroundColor: 'transparent' }}
                  value={Data.description}
                  disabled
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '49%' }}>
                  <label className="dropdown-label-rep">
                    Maximum Reward Points per Student
                  </label>
                  <div className='dropdown-select-1'>
                    <input
                    style={{backgroundColor:'transparent'}}
                      className="text-input--rep"
                      type="text"
                      value={Data.points}
                      disabled
                    />
                  </div>
                </div>
                <div style={{ width: '49%' }}>
                  <label className="dropdown-label-rep">
                    Rubics Sheet
                  </label>
                  <div className="rubics-main-1">view sheet</div>
                </div>
              </div>
              <div className="dropdown-label-rep">Start Date and Time</div>
              <input
                className="text-input-1"
                type='datetime-local'
                style={{ backgroundColor: 'transparent' }}
                value={formatDate(Data.StartDate)}
                disabled
              />
              <div className="dropdown-label-rep">End Date and Time</div>
              <input
                className="text-input-1"
                type='datetime-local'
                style={{ backgroundColor: 'transparent' }}
                value={formatDate(Data.EndDate)}
                disabled
              />
              <div className="dropdown-label-rep">Scheduling Start Date and Time</div>
              <input
                className="text-input-1"
                type='datetime-local'
                style={{ backgroundColor: 'transparent' }}
                value={formatDate(Data.start_bigintscheduling)}
                disabled
              />
              <div className="dropdown-label-rep">Scheduling End Date and Time</div>
              <input
                className="text-input-1"
                type='datetime-local'
                style={{ backgroundColor: 'transparent' }}
                value={formatDate(Data.end_bigintscheduling)}
                disabled
              />

            </div>
          </div>
            </div>
            </div>
        {showNotifications && (<Notificationpopup ></Notificationpopup>)}
    </div>
  )
}

export default Rejected