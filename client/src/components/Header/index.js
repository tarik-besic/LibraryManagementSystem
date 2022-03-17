import React from 'react'

const Header = ({open,setOpen}) => {
  return (
    <div className="header">
        <div className="hamburger" onClick={()=>{
                    setOpen(!open)
                }}>
                <div></div>
      </div>
    </div>
  )
}

export default Header