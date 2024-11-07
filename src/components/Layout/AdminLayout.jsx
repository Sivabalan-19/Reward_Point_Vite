import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../Sidebar/AdminSidebar';
import Redemption from '../../pages/Admin/Redemption/Redemption';
import AdminEvent from '../../pages/Admin/EventPages/EventPage';
import AdminReport from '../../pages/Admin/AdminReport/AdminReport';

const Admin_layout= ({ darkMode, toggleDarkMode }) => (
  <div className={`main ${darkMode ? 'dark-mode' : ''}`}>
    <div className="leftside">
  <     AdminSidebar />
    </div>
    <div className="rightside">
      <Routes>
        <Route path="/dashboard" element={<AdminEvent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/Redemption" element={<Redemption darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/Adminreport" element={<AdminReport darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </div>
  </div>
);

export default Admin_layout;
