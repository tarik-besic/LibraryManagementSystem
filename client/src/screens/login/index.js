import React, { useState } from "react";
import { useNavigate } from "react-router";

    const Login=()=>{
        const navigate=useNavigate();
        
        return (
            <div className="screen login-screen">
                <button onClick={()=>navigate("/admin")}>Login</button>
            </div>
        );
    }

export default Login;
