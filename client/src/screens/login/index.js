import React, { useState } from "react";

import InputComponent from "../../components/input";
import { LongButtonComponent } from "../../components/button";
import { useNavigate } from "react-router";

const TEST_DATA = [
    {
        id: 1,
        email: 'kandidat@mail.com',
        username: 'kandidat',
        password: 'Enver001.',
        role: []
    },
    {
        id: 2,
        email: 'user@mail.com',
        username: 'user',
        password: 'Enver001.',
        role: ['employee']
    },
    {
        id: 3,
        email: 'admin@mail.com',
        username: 'admin',
        password: 'Enver001.',
        role: ['employee', 'admin']
    },
    {
        id: 4,
        email: 'sys_admin@mail.com',
        username: 'sys_admin',
        password: 'Enver001.',
        role: ['employee', 'admin', 'sys_admin']
    },
]

const Login = () => {
    const navigate = useNavigate()
    const [authData, setAuthData] = useState({
        emailOrUsername: null,
        password: null
    });

    const submitAuthData = () => {
        // TEST DATA
        let user = TEST_DATA.find(user => {
            return (
                (user.email == authData.emailOrUsername || user.username == authData.emailOrUsername) &&
                user.password == authData.password
            );
        });
        //

        if(!user)
            return;
        
        navigate('/admin/dashboard');
    }

    return (
        <div className="screen center-content login-screen">
            <div
                style={{ margin: '40px 0' }}
            >
                <div className="title">Log In</div>
                <div className="title small">Log in and start managing</div>
            </div>
            <div className="login-form">
                <InputComponent
                    setValue={(value) => setAuthData({ ...authData, emailOrUsername: value })}
                    type="text"
                    className="long"
                    placeholder={"Email or Username"}
                    id="input-emailOrUsername"
                    onKeyDown={(evt)=>{
                        switch(evt.key){
                            case 'Enter':
                                document.getElementById('input-password').focus();
                                break;
                        }
                    }}
                />
                <InputComponent
                    setValue={(value) => setAuthData({ ...authData, password: value })}
                    type="password"
                    id="input-password"
                    style={{
                        margin: '10px 0 40px'
                    }}
                    className="long"
                    placeholder="Password"
                    onKeyDown={(evt)=>{
                        switch(evt.key){
                            case 'Enter':
                                document.getElementById('button-submit').focus();
                                break;
                        }
                        
                    }}
                />

                <LongButtonComponent
                    onClick={submitAuthData}
                    id="button-submit"
                    onKeyDown={(evt)=>{
                        switch(evt.key){
                            case 'Enter':
                                evt.target.click();
                                break;
                        }
                        
                    }}
                >Submit</LongButtonComponent>
            </div>

        </div>
    );
};

export default Login;
