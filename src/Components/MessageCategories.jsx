import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { Link } from "react-router-dom";

function MessageCategories({ categorieName, Categories, activeCategory, setActiveCategory }) {
  const [isMessageCategoriesExpanded, setIsMessageCategoriesExpanded] = useState(false);

  const toggleMessageCategories = () => {
    setIsMessageCategoriesExpanded(!isMessageCategoriesExpanded);
  };

  function IconSize() {
    return {
      fontSize: "25px",
      color: "grey",
    };
  }

  return (
    <ul className="category-list">
      <div
        className="category-header"
        onClick={toggleMessageCategories}
        style={{ cursor: "pointer" }}
      >
        {categorieName}
        <KeyboardArrowDownIcon style={IconSize()} />
      </div>
      <ul
        className={`category-items ${
          isMessageCategoriesExpanded ? "expanded" : "collapsed"
        }`}
      >
        {Categories.map((d) => (
          <li
            className={`category-item ${activeCategory === d.title ? "active" : ""}`}
            key={d.title}
          >
            <span
              className="category-item-status"
              style={{ backgroundColor: d.BgColor }}
            ></span>
            <Link className="link" style={{ textDecoration: "none", color: activeCategory === d.title ? "black" : "#b5b5be" }} to={d.link}>
              <span 
               onClick={() => setActiveCategory(d.title)}
               className="category-item-text">{d.title}</span>
            </Link>
            <span className="tooltip">{d.title}</span>
          </li>
        ))}
      </ul>
    </ul>
  );
}

export default MessageCategories;