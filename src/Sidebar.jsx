import { useEffect, useState } from "react";
import "./reset.css";
import "./Sidebar.css";
import { Inbox, Drafts, Star, Send, Delete, Report } from "@mui/icons-material";
import StartIcon from '@mui/icons-material/Start';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRoleFranchise, setIsRoleFranchise] = useState(localStorage.getItem("role") == "franchise" ?  true :  false);
  const [isMessageCategoriesExpanded, setIsMessageCategoriesExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  function IconSize() {
    return {
      fontSize: "25px",
      color: "grey",
    };
  }

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Franchise") {
      setIsRoleFranchise(true);
    }
  }, []);

  const toggleMessageCategories = () => {
    setIsMessageCategoriesExpanded(!isMessageCategoriesExpanded);
  };

  return (
    <div className="div">
      <div className={`side-bar ${isCollapsed ? "collapse" : ""}`}>
        <header className="logo-name-wrapper">
          <div className="logo-name">
            <img src="logo.svg" className="logo" alt="logo app" />
          </div>
          <button className="logo-name__button" onClick={toggleSidebar}>
            <StartIcon
              className="bx bxs-plus-circle chat-icon"
              style={IconSize()}
            />
          </button>
        </header>
        <ul className="features-list">
          <li onClick={toggleSidebar} className="features-item inbox active">
            <Inbox
              style={IconSize()}
              className="bx bxs-inbox features-item-icon inbox-icon"
            />
            <span className="features-item-text">Home</span>
            <span className="tooltip">Home</span>
          </li>
          {isRoleFranchise && (
            <li
              onClick={toggleSidebar}
              className="features-item inbox active"
            >
              <Drafts
                style={IconSize()}
                className="bx bxs-inbox features-item-icon inbox-icon"
              />
              <span className="features-item-text">
                Franchise registration
              </span>
              <span className="tooltip">Franchise registration</span>
            </li>
          )}
          <li onClick={toggleSidebar} className="features-item star">
            <Star
              style={IconSize()}
              className="bx bx-star features-item-icon"
            />
            <span className="features-item-text">About</span>
            <span className="tooltip">About</span>
          </li>
          <li className="features-item sent">
            <Send
              style={IconSize()}
              className="bx bx-send features-item-icon"
            />
            <span className="features-item-text">Sent</span>
            <span className="tooltip">Sent</span>
          </li>
          <li className="features-item trash">
            <Delete
              style={IconSize()}
              className="bx bx-trash features-item-icon"
            />
            <span className="features-item-text">Trash</span>
            <span className="tooltip">Trash</span>
          </li>
          <li className="features-item spam">
            <Report
              style={IconSize()}
              className="bx bx-message-square-error features-item-icon"
            />
            <span className="features-item-text">Spam</span>
            <span className="tooltip">Spam</span>
          </li>
        </ul>
        <ul className="category-list">
          <div className="category-header" onClick={toggleMessageCategories} style={{ cursor: "pointer" }}>
            Message categories
            <KeyboardArrowDownIcon style={IconSize()} />
          </div>
          <ul className={`category-items ${isMessageCategoriesExpanded ? 'expanded' : 'collapsed'}`}>
            <li className="category-item">
              <span
                className="category-item-status"
                style={{ backgroundColor: "#79d861" }}
              ></span>
              <span className="category-item-text">My works</span>
              <span className="tooltip">My works</span>
            </li>
            <li className="category-item">
              <span
                className="category-item-status"
                style={{ backgroundColor: "#c43c5d" }}
              ></span>
              <span className="category-item-text">Accountant</span>
              <span className="tooltip">Accountant</span>
            </li>
            <li className="category-item">
              <span
                className="category-item-status"
                style={{ backgroundColor: "#ff5050" }}
              ></span>
              <span className="category-item-text">Works</span>
              <span className="tooltip">Works</span>
            </li>
            <li className="category-item">
              <span
                className="category-item-status"
                style={{ backgroundColor: "#42ffdd" }}
              ></span>
              <span className="category-item-text">Marketing</span>
              <span className="tooltip">Marketing</span>
            </li>
          </ul>
        </ul>
        <ul className="chat-list">
          <div className="chat-header">Recent chats</div>
          <li className="chat-item">
            <span className="chat-item-avatar-wrapper has-message">
              <img
                src="chris-evans.jpg"
                alt="avatar"
                className="chat-item-avatar"
              />
            </span>
            <span className="chat-item-name">Steve Rogers</span>
          </li>
          <li className="chat-item">
            <span className="chat-item-avatar-wrapper">
              <img
                src="tony-stark.jpg"
                alt="avatar"
                className="chat-item-avatar"
              />
            </span>
            <span className="chat-item-name">Tony Stark</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;