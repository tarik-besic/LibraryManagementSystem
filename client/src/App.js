import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./screens/login";
import AdminDashboard from "./screens/admin/dashboard";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;