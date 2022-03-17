import React, { useState } from 'react'
import userIcon from  '../../assets/images/icons/user-icon.svg';
import logoIcon from '../../assets/images/icons/layer-icon.svg';
import { useNavigate } from 'react-router';
const Navbar = ({open,setOpen}) => {

  const navigate=useNavigate();

  const links = [
    {
      icon: userIcon,
      name: "/",
      onClick: () => navigate("/")
    },
    {
      icon: "",
      name: "Dashboard",
      onClick: () => navigate("/dashboard")
    },
    {
      icon: "",
      name: "Bez Klika",
      onClick: () => console.log("Radi")
    }
  ]

  return (

    <div className={`${open ? "navbar open" : "navbar"}`}>

      <div className="navbar-upper">
        <div className="logo-container">
          <img src={logoIcon} alt="" srcset="" />
          <span>Library</span>
        </div>

        <div className="links-container">

          {links.map((link) => {
            return (
              <div className='link'
                onClick={() => {
                  link.onClick && link.onClick();
                }}
              >
                  <img src={userIcon} />
                <div className="text">
                  {link.name}
                </div>
              </div>
            )
          })}

        </div>
      </div>

      <div className="sign-out-container">
        sign out
      </div>

    </div>

  )
}

export default Navbar