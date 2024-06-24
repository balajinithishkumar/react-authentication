import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
function MessageCategories({ categorieName, Categories }) {
  const [isMessageCategoriesExpanded, setIsMessageCategoriesExpanded] =
    useState(false);
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
          <>
            <li className="category-item">
              <span
                className="category-item-status"
                style={{ backgroundColor: d.BgColor }}
              ></span>
              <span className="category-item-text">{d.title}</span>
              <span className="tooltip">{d.title}</span>
            </li>
          </>
        ))}
      </ul>
    </ul>
  );
}
export default MessageCategories;