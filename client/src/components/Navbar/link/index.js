import React from "react";
const Link = ({link,children,child,url}) => {
  return (
    <div
      className={`${children ? "link has-children" : child ? url==link.to ? "link active-child child" : "link child" : url==link.to ? "link active" : "link"}`}
      onClick={() => {
        link.onClick && link.onClick();
      }}
    >       
        <div className="main-container">
            <img src={link?.icon} />
            <div className="text">{link.name}</div>
        </div>
      <div className="children-container">

        {children && children.map((child,i)=>{
          return(
            <Link 
                  link={child}
                  key={i} 
                  active={url==child.to ?? true}
                  child={true}
                  />
          )
        })
      }
      </div>
    </div>
  );
}

export default Link