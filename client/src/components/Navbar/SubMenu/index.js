import React, { useState } from 'react'
import arrowIcon from "../../../assets/images/icons/arrow-nav.svg";
const SubMenu = ({ link, url }) => {
  const [drop, setDrop] = useState(false);
  return (
    <div className={`${link.children ? drop ? "menu link drop" : "menu link" : "link"} ${link.children ? ("/" + url?.split("/")[1]) === link.to ? "active" : "" : url === link.to && "active"}`}
      onClick={() => {
        link.children?.length > 0 ? setDrop(!drop) : link.onClick(link.to);
      }}>
      <div className="main-container">
        <img src={link.icon} alt="icon" />
        <span>{link.name}</span>
        {link.children?.length > 0 && <img src={arrowIcon} className="arrow" alt="" />}
      </div>
      {link.children && (
        <div className="menu-link-container">
          {link.children.map((child, key) => {
            
            return (
              <div className={`link ${url === child.to ? "active-sub-link" : ""}`}
                key={key}
                onClick={() => { child.onClick(link.to) }}
              >
                <div className="main-container">
                  <img src={child.icon} alt="" />
                  <span>{child.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default SubMenu