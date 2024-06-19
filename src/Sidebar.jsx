import React, { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import './App.css';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="App">
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-content">
          <div className="sidebar-item">
            <div style={{width:"100px", height:"40px"}}  className="logo-container">
              <div className={`logo ${isOpen ? 'show' : ''}`}>
                <img  style={{width:"100px", height:"40px"}}  src="logo.svg" alt="" />
              </div>
              <button className="togglebtn" onClick={toggleSidebar}>
                <img src={isOpen ? 'Close.svg' : 'Open.png'} alt="Toggle Sidebar" />
              </button>
            </div>
          </div>
          <div className="sidebar-item">
            <HomeOutlinedIcon className="icon" />
            <span className={`sidebar-text ${isOpen ? 'show' : ''}`}>Home</span>
          </div>
          <div className="sidebar-item">
            <InfoOutlinedIcon className="icon" />
            <span className={`sidebar-text ${isOpen ? 'show' : ''}`}>About</span>
          </div>
          <div className="sidebar-item">
            <BusinessCenterOutlinedIcon className="icon" />
            <span className={`sidebar-text ${isOpen ? 'show' : ''}`}>Services</span>
          </div>
          <div className="sidebar-item">
            <PhoneOutlinedIcon className="icon" />
            <span className={`sidebar-text ${isOpen ? 'show' : ''}`}>Contact</span>
          </div>
        </div>
      </div>
      <div className={`main-content ${isOpen ? 'active' : ''}`}>
        <h2>Collapsible Sidebar Example</h2>
      </div>
    </div>
  );
}
export default App;