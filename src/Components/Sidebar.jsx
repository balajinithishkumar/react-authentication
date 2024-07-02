import { useEffect, useState } from "react";
import "../Styles/reset.css";
import "../Styles/Sidebar.css";
import { Inbox, Drafts, Star, Send, Delete, Report } from "@mui/icons-material";
import StartIcon from "@mui/icons-material/Start";
import MessageCategories from "./MessageCategories";
import Profile from "./Profile";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isRoleFranchise, setIsRoleFranchise] = useState(
    localStorage.getItem("role") == "franchise" ? true : false
  );

  const [activeCategory, setActiveCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/dhl")) {
      setActiveCategory("DHL");
    } else if (path.includes("/aramex")) {
      setActiveCategory("ARAMEX");
    } else if (path.includes("/ups")) {
      setActiveCategory("UPS");
    } else {
      setActiveCategory("");
    }
  }, [location]);

  const Message_Categories = [
    { title: "DHL", BgColor: "#79d861", link: "/dhl" },
    { title: "ARAMEX", BgColor: "#c43c5d", link: "/aramex" },
    { title: "UPS", BgColor: "#ff5050", link: "/ups" },
  ];

  const Recent_chat_Categories = [
    { title: "recent chat1", BgColor: "#79d861" },
    { title: "recent chat2", BgColor: "#c43c5d" },
    { title: "recent chat3", BgColor: "#ff5050" },
  ];

  return (
    <div className="div">
      <Profile />
      <div className={`side-bar`}>
        <header className="logo-name-wrapper">
          <div className="logo-name">
            <img src="logo.svg" className="logo" alt="logo app" />
          </div>
          <button className="logo-name__button">
            <StartIcon
              className="bx bxs-plus-circle chat-icon"
              style={IconSize()}
            />
          </button>
        </header>
        <ul className="features-list">
          <li className="features-item inbox active">
            <Inbox
              style={IconSize()}
              className="bx bxs-inbox features-item-icon inbox-icon"
            />
            <span className="features-item-text">Home</span>
            <span className="tooltip">Home</span>
          </li>
          {isRoleFranchise && (
            <li className="features-item inbox active">
              <Drafts
                style={IconSize()}
                className="bx bxs-inbox features-item-icon inbox-icon"
              />
              <span
                className="features-item-text"
                onClick={() => {
                  navigate("/franchiseregistration");
                }}
              >
                Franchise registration
              </span>
              <span className="tooltip">Franchise registration</span>
            </li>
          )}
          <li className="features-item star">
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
          categorieName={"vendor"}
          Categories={Message_Categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <MessageCategories
          categorieName={"RECENT CHATS"}
          Categories={Recent_chat_Categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </div>
  );
};

export default Sidebar;