import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentSidebar from '../Sidebar/StudentSidebar';
import StudentDashboard from '../../pages/Student/StudentDashboard/StudentDashboard';
import PointContainer from '../../pages/Student/PointContainer/PointContainer';
import EventMaster from '../../pages/Student/EventMaster/EventMaster';
import TeamRegistrationForm from '../../pages/Student/EventMaster/TeamRegistrationForm';
import MyEvent from '../../pages/Student/MyEvent/MyEvent';
const StudentLayout = ({ darkMode, toggleDarkMode }) => (
  <div className={`main ${darkMode ? 'dark-mode' : ''}`}>
    <div className="leftside">
      <StudentSidebar darkMode={darkMode} />
    </div>
    <div className="rightside">
      <Routes>
        <Route path="/dashboard" element={<StudentDashboard   darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/points-container" element={<PointContainer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/event-masters" element={<EventMaster darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
         <Route path="/teamregistraionform" element={<TeamRegistrationForm darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/my-events" element={<MyEvent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        {/* <Route path="team-members" element={<StudentFormPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />  */}
      </Routes>
    </div>
  </div>
);

export default StudentLayout;
