import React, { useState, useEffect, useRef } from 'react';
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { TbLogin2 } from "react-icons/tb";
import '../../Styles/Global.css'
import { MdOutlineEditCalendar, MdOutlineBarChart } from "react-icons/md";
import photo from '../../assets/photo1.png';
import { useAuth } from '../../utils/Authcontext';
import axios from 'axios';
const StudentSidebar = ({ darkMode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [linePosition, setLinePosition] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const itemRefs = useRef([]);

  useEffect(() => {
    const savedLinePosition = parseFloat(localStorage.getItem('linePosition'));
    const savedActiveItem = localStorage.getItem('activeItem');
    const savedDropdownVisible = localStorage.getItem('dropdownVisible') === 'true';

    if (savedLinePosition && savedActiveItem) {
      setLinePosition(savedLinePosition);
      setActiveItem(savedActiveItem);
    } else {
      setLinePosition(itemRefs.current[0]?.offsetTop || 0);
    }
    
    setDropdownVisible(savedDropdownVisible);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('activeItem');
    localStorage.removeItem('linePosition');
    localStorage.removeItem('dropdownVisible');
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.get(`${import.meta.env.VITE_API_URL}logout`, {
          headers: { withCredentials: true }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    logout();
  };

  const handleItemClick = (item, index) => {
    setActiveItem(item);
    const itemOffsetTop = itemRefs.current[index].offsetTop;
    setLinePosition(itemOffsetTop);

    localStorage.setItem('activeItem', item);
    localStorage.setItem('linePosition', itemOffsetTop);

    if (item === 'Event Register') {
      const newDropdownVisible = !dropdownVisible; 
      setDropdownVisible(newDropdownVisible);
      localStorage.setItem('dropdownVisible', newDropdownVisible);
    } else {
      setDropdownVisible(item === 'Event Masters' || item === 'My Events');
      localStorage.setItem('dropdownVisible', item === 'Event Masters' || item === 'My Events');
    }

    switch (item) {
      case 'Dashboard':
        navigate('dashboard');
        break;
      case 'Points Container':
        navigate('points-container');
        break;
      case 'Event Register':
        break;
      case 'My Events':
        navigate('my-events');
        break;
      case 'Event Masters':
        navigate('event-masters');
        break;
      case 'Sign-Out':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`Sidebar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="Sidehead">
        <div className="Reward">REWARD&nbsp;</div>
        <div className="points">POINTS</div>
      </div>
      <div className="line" style={{ top: linePosition }}></div>
      <div
        ref={el => itemRefs.current[0] = el}
        className={`Home ${activeItem === 'Dashboard' ? 'active' : ''}`}
        style={{ marginTop: '15%' }}
        onClick={() => handleItemClick('Dashboard', 0)}
      >
        <IoMdHome className="icon" />&ensp;Dashboard
      </div>
      <div
        ref={el => itemRefs.current[1] = el}
        className={`Home ${activeItem === 'Points Container' ? 'active' : ''}`}
        onClick={() => handleItemClick('Points Container', 1)}
      >
        <MdOutlineBarChart className="icon" />&ensp;Points Container  
      </div>
      <div
        ref={el => itemRefs.current[2] = el}
        className={`Home ${activeItem === 'Event Register' ? 'active' : ''}`}
        onClick={() => handleItemClick('Event Register', 2)}
      >
        <MdOutlineEditCalendar className="icon" />&ensp;Event Register
      </div>
      
      {dropdownVisible && (
        <div className="dropdown-show">
          <div
            ref={el => itemRefs.current[3] = el}
            className={`Home-drop ${activeItem === 'Event Masters' ? 'active' : ''}`}
            onClick={() => handleItemClick('Event Masters', 3)}
          >
            Event Masters
          </div>
          <div
            ref={el => itemRefs.current[4] = el}
            className={`Home-drop ${activeItem === 'My Events' ? 'active' : ''}`}
            onClick={() => handleItemClick('My Events', 4)}
          >
            My Events
          </div>
        </div>
      )}
      
      <div className="photo1">
        <img src={photo} alt="photo1" style={{ maxWidth: '82.7%', maxHeight: '20.3%' }} />
      </div>
      <div className="Home" style={{ marginTop: '20%' }} onClick={handleLogout}>
        <TbLogin2 className="icon" />&ensp;Sign-Out
      </div>
    </div>
  );
};

export default StudentSidebar;