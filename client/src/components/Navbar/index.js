import React, { useState, useEffect } from "react";
import userIcon from "../../assets/images/icons/user-icon.svg";
import logoIcon from "../../assets/images/icons/layer-icon.svg";
import arrowIconDown from "../../assets/images/icons/arrow-down.svg";
import arrowIconUp from "../../assets/images/icons/arrow-up.svg";
import dashboardIcon from "../../assets/images/icons/dashboard-icon.svg";
import { useLocation, useNavigate } from "react-router";
// import Link from './link';
import { Link } from "react-router-dom";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);
  const [url, setUrl] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
    console.log(url);
  }, [location]);

  const links = [
    {
      icon: dashboardIcon,
      name: "Dashboard",
      to: "/",
      onClick: () => navigate("/"),
    },
    {
      icon: dashboardIcon,
      name: "Mng Books",
      drop: true,
      children: [
        {
          icon: dashboardIcon,
          name: "Add Book",
          to: "/add",
          onClick: () => navigate("/add"),
        },
        {
          icon: dashboardIcon,
          name: "Issue new Book",
          to: "/issuenewbook",
          onClick: () => navigate("/issuenewbook"),
        },
        {
          icon: dashboardIcon,
          name: "Issued Book",
          to: "/issuedbooks",
          onClick: () => navigate("/issuedbooks"),
        },
      ],
      onClick: () => console.log("otori ih"),
    },
    {
      icon: dashboardIcon,
      name: "Bez Klika",
      to: "",
      onClick: () => console.log("Radi"),
    },
  ];

  return (
    <div className={`${open ? "navbar open" : "navbar"}`}>
      <div className="navbar-upper">
        <div className="logo-container">
          <img src={logoIcon} alt="" />
          <span>Library</span>
        </div>

        <div className="links-container">
          {links.map((link, key) => {
            return (
              <>
                {link.children ?
                  <div className={`${drop ? "link menu drop" : "link menu"}`}
                    onClick={() => setDrop(!drop)}
                  >
                    <div className="main-container">
                      <img src={link.icon} />
                      <span>{link.name}</span>
                      {/* <span className="arrow"> &gt; </span> */}
                      <img src={arrowIconDown} className="arrow" />

                    </div>
                    <div className="menu-link-container">
                      {link.children.map((child, key) => {
                        return <div className="link">
                          <div className="main-container">
                            <img src={child.icon} />
                            <span>{child.name}</span>
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                  :
                  <Link
                    to={link.to}
                    key={key}
                    className="link"
                  >
                    <div className="main-container">
                      <img src={link.icon} alt="icon" />
                      <span>{link.name}</span>
                    </div>
                  </Link>
                }
              </>
              // <Link
              //   link={link}
              //   key={value}
              //   url={url}
              //   />
            );
          })}
        </div>
      </div>

      <div className="sign-out-container">sign out</div>
    </div>
  );
};

export default Navbar;