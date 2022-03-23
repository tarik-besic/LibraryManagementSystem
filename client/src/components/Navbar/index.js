import React, { useState, useEffect } from "react";

import logoIcon from "../../assets/images/icons/layer-icon.svg";
import dashboardIcon from "../../assets/images/icons/dashboard-icon.svg";
import userIcon from "../../assets/images/icons/user-icon.svg";
import userAddIcon from "../../assets/images/icons/user-add-icon.svg";
import userViewIcon from "../../assets/images/icons/user-view-icon.svg";

import bookIcon from "../../assets/images/icons/book-icon.svg";
import bookAddIcon from "../../assets/images/icons/book-add-icon.svg";
import bookMngIcon from "../../assets/images/icons/book-mng-icon.svg";

import categoryIcon from "../../assets/images/icons/category-icon.svg";

import settingsIcon from "../../assets/images/icons/settings-icon.svg";

import { useLocation, useNavigate } from "react-router";
import SubMenu from "./SubMenu";
import { Link } from "react-router-dom";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname);
  useEffect(() => {
    if (location.pathname !== url) setUrl(location.pathname);
  }, [location]);

  const links = [
    {
      name: "Dashboard",
      icon: dashboardIcon,
      to: "/",
      onClick: () => navigate("/"),
    },
    {
      icon: bookMngIcon,
      name: "Mng Books",
      to: "/books",
      children: [
        {
          icon: bookMngIcon,
          name: "Add Books",
          to: "/books/add",
          onClick: () => navigate("/books/add"),
        },
        {
          icon: bookMngIcon,
          name: "Edit Books",
          to: "/books/edit",
          onClick: () => navigate("/books/edit"),
        },
      ],
    },
    {
      icon: categoryIcon,
      name: "Mng Categories",
      to: "/categories",
      children: [
        {
          icon: categoryIcon,
          name: "Add Category",
          to: "/categories/add",
          onClick: () => navigate("/categories/add"),
        },
        {
          icon: categoryIcon,
          name: "Edit Categories",
          to: "/categories/edit",
          onClick: () => navigate("/categories/edit"),
        },
      ],
    },
    {
      name: "Issue New Book",
      icon: bookAddIcon,
      to: "/issuenew",
      onClick: () => navigate("/issuenew"),
    },
    {
      name: "Issued Books",
      icon: bookIcon,
      to: "/issuedbooks",
      onClick: () => navigate("/issuedbooks"),
    },
    {
      name: "Mng Users",
      icon: userIcon,
      to: "/users",
      children: [
        {
          name: "Add Users",
          icon: userAddIcon,
          to: "/users/add",
          onClick: () => navigate("/users/add"),
        },
        {
          name: "View Users",
          icon: userViewIcon,
          to: "/users/view",
          onClick: () => navigate("/users/view"),
        },
      ],
    },
    {
      name: "Settings",
      icon: settingsIcon,
      to: "/settings",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className={`${open ? "navbar open" : "navbar"}`}>
      <div className="navbar-upper">
        <Link to="/">
          <div className="logo-container">
            <img src={logoIcon} />
            <span>Library</span>
          </div>
        </Link>

        <div className="links-container">
          {links.map((link, key) => {
            return <SubMenu link={link} key={key} to={link.to} url={url} />;
          })}
        </div>
      </div>

      <div className="sign-out-container">sign out</div>
    </div>
  );
};

export default Navbar;
