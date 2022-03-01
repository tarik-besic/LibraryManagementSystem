import React from "react";

import Avatar from "../../../../assets/images/avatar.png"


const AdminDashboardNavbar = ({ className, setActiveRoute, 
    routes, activeRoute}) => {
    return (
        <div className={`navbar ${className ?? ''}`}>
            <div className="profile-description">
                <img className="avatar" src={Avatar} />
                <div className="name">Prabhatsinh Rathod</div>
                <div className="roles">
                    <span className="role">Admin</span>
                    <span className="role">Admin</span>
                    <span className="role">Admin</span>
                </div>
            </div>
            <div className="items">
                {
                    routes && routes.map((route, index) => {
                        return (
                                <div 
                                    className={`item ${index == activeRoute ? 'active' : ''}`}
                                    onClick={()=>{
                                        if(setActiveRoute)
                                            setActiveRoute(index);
                                    }}
                                >
                                    <img src={route.icon} className="icon"/>
                                    {route.label}
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminDashboardNavbar;
