import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./screens/dashboard";
import Login from "./screens/login";


const App = () => {
    const [open, setOpen] = useState(true)
    
    return (
        <BrowserRouter>
            <Navbar open={open} />
        <div className={open ? "static opened" : "static"}>
            <Header open={open} setOpen={setOpen}/>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
        </div>
        </BrowserRouter>
    );
};

export default App;