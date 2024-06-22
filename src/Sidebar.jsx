import { useEffect, useState } from "react";
import "./reset.css";
import "./Sidebar.css";
import { Inbox, Drafts, Star, Send, Delete, Report } from "@mui/icons-material";
import StartIcon from "@mui/icons-material/Start";
import MessageCategories from "./MessageCategories";
import Profile from "./Profile";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRoleFranchise, setIsRoleFranchise] = useState(
    localStorage.getItem("role") == "franchise" ? true : false
  );

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

  const Message_Categories = [
    { title: "My works", BgColor: "#79d861" },
    { title: "Accountant", BgColor: "#c43c5d" },
    { title: "Works", BgColor: "#ff5050" },
    { title: "Marketing", BgColor: "#42ffdd" },
  ];

  const Recent_chat_Categories = [
    { title: "recent chat1", BgColor: "#79d861" },
    { title: "recent chat2", BgColor: "#c43c5d" },
    { title: "recent chat3", BgColor: "#ff5050" },
  ];

  return (
    <div className="div">
        <Profile/>
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
            <li onClick={toggleSidebar} className="features-item inbox active">
              <Drafts
                style={IconSize()}
                className="bx bxs-inbox features-item-icon inbox-icon"
              />
              <span className="features-item-text">Franchise registration</span>
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
        <MessageCategories
          categorieName={"MESSAGE CATEGORIES"}
          Categories={Message_Categories}
        />
        <MessageCategories
          categorieName={"RECENT CHATS"}
          Categories={Recent_chat_Categories}
        />
      </div>
    </div>
  );
};

export default Sidebar;