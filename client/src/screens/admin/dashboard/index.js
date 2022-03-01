import React, { useState } from "react";

import AdminDashboardNavbar from "./navbar";

import EmployeesSegment from "./employees"; 
import CandidatesSegment from "./candidates";

import Avatar from "../../../assets/images/avatar.png"


const DashboardRoutes = [
    {
        label: "Employees",
        icon: Avatar,
        component: <EmployeesSegment/>
    },
    {
        label: "Candidates",
        icon: Avatar,
        component: <CandidatesSegment/>
    }
]

const AdminDashboard = () => {
    const [activeRoute, setActiveRoute] = useState(0);

    return (
        <div className="screen admin-dashboard-screen">
            <AdminDashboardNavbar 
                routes={DashboardRoutes}
                setActiveRoute={setActiveRoute}
                activeRoute={activeRoute}
            />
            <div className="navbar-mobile">
                <AdminDashboardNavbar 
                    className="content"
                    routes={DashboardRoutes}
                    setActiveRoute={setActiveRoute}
                    activeRoute={activeRoute}
                />
            </div>

            <div className="content">
                {DashboardRoutes[activeRoute].component}
            </div>
        </div>
    );
};

export default AdminDashboard;
