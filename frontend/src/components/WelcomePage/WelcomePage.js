import React from 'react';
import Register from '../Register/Register';
import { Route, Routes } from "react-router-dom";
import Login from '../Login/Login';

function WelcomePage() {
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </>
    );
}

export default WelcomePage;
