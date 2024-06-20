import React, { useState, useEffect } from "react";
import "./reset.css"; // Import your CSS files
import "./styled.css"; // Adjust paths as per your project structure
import "./App.css"; // Additional CSS if needed

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
      })
        .then((response) => {
          return true;
        })
        .catch((e) => {
          const carbonScript = document.createElement("script");
          carbonScript.src =
            "//cdn.carbonads.com/carbon.js?serve=CE7DC2JW&placement=wwwcssscriptcom";
          carbonScript.id = "_carbonads_js";
          document.getElementById("carbon-block").appendChild(carbonScript);
        });
    } catch (error) {
      console.log(error);
    }

    // Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.google-analytics.com/analytics.js";
    document.head.appendChild(script);

    window.ga =
      window.ga ||
      function () {
        (ga.q = ga.q || []).push(arguments);
      };
    ga("create", "UA-46156385-1", "cssscript.com");
    ga("send", "pageview");

    return () => {
      // Clean up function
      document.head.removeChild(script);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`side-bar ${isCollapsed ? "collapse" : ""}`}>
      <header className="logo-name-wrapper">
        <div className="logo-name">
          <img src="logo.png" className="logo" alt="logo app" />
          <span className="logo-name__name">CSSScript</span>
        </div>
        <button className="logo-name__button" onClick={toggleSidebar}>
          <i className="bx bx-arrow-from-right logo-name__icon"></i>
        </button>
      </header>
      <div className="message">
        <i className="bx bx-message-square-edit message-icon"></i>
        <span className="message-text">New Message</span>
        <span className="tooltip">New Message</span>
      </div>
      <ul className="features-list">
        <li className="features-item inbox active">
          <i className="bx bxs-inbox features-item-icon inbox-icon"></i>
          <span className="features-item-text">Inbox</span>
          <span className="inbox-number">99</span>
          <span className="tooltip">Inbox</span>
        </li>
        <li className="features-item draft">
          <i className="bx bx-file-blank features-item-icon"></i>
          <span className="features-item-text">Draft</span>
          <span className="tooltip">Draft</span>
        </li>
        <li className="features-item star">
          <i className="bx bx-star features-item-icon"></i>
          <span className="features-item-text">Starred</span>
          <span className="tooltip">Starred</span>
        </li>
        <li className="features-item sent">
          <i className="bx bx-send features-item-icon"></i>
          <span className="features-item-text">Sent</span>
          <span className="tooltip">Sent</span>
        </li>
        <li className="features-item trash">
          <i className="bx bx-trash features-item-icon"></i>
          <span className="features-item-text">Trash</span>
          <span className="tooltip">Trash</span>
        </li>
        <li className="features-item spam">
          <i className="bx bx-message-square-error features-item-icon"></i>
          <span className="features-item-text">Spam</span>
          <span className="tooltip">Spam</span>
        </li>
      </ul>
      <ul className="category-list">
        <div className="category-header">Message categories</div>
        <li className="category-item">
          <span
            className="category-item-status"
            style={{ backgroundColor: "#79d861" }}
          ></span>
          <span className="category-item-text">My works</span>
          <span className="category-item-number">9</span>
          <span className="tooltip">My works</span>
        </li>
        <li className="category-item">
          <span
            className="category-item-status"
            style={{ backgroundColor: "#c43c5d" }}
          ></span>
          <span className="category-item-text">Accountant</span>
          <span className="category-item-number">43</span>
          <span className="tooltip">Accountant</span>
        </li>
        <li className="category-item">
          <span
            className="category-item-status"
            style={{ backgroundColor: "#ff5050" }}
          ></span>
          <span className="category-item-text">Works</span>
          <span className="category-item-number">78</span>
          <span className="tooltip">Works</span>
        </li>
        <li className="category-item">
          <span
            className="category-item-status"
            style={{ backgroundColor: "#42ffdd" }}
          ></span>
          <span className="category-item-text">Marketing</span>
          <span className="category-item-number">253</span>
          <span className="tooltip">Marketing</span>
        </li>
      </ul>

      <ul className="chat-list">
        <div className="chat-header">Recent chats</div>
        <button className="chat-new-btn">
          <i className="bx bxs-plus-circle chat-icon"></i>
          <span className="chat-new-btn-text">Start New Chat</span>
          <span className="tooltip">New Chat</span>
        </button>
        <li className="chat-item">
          <span className="chat-item-avatar-wrapper has-message">
            <img
              src="chris-evans.jpg"
              alt="avatar"
              className="chat-item-avatar"
            />
          </span>
          <span className="chat-item-name">Steve Rogers</span>
          <span className="chat-item-number">53</span>
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
          <span
            className="chat-item-status"
            style={{ backgroundColor: "#79d861" }}
          ></span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
