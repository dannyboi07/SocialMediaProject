import React from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    return (
        <div className="nav-container">
            <Link to="/" className='logo'>Blog<span>!</span><span>T</span></Link>
            <nav className="">
                {/* <div className='home-btn-ctn'>
                    
                </div> */}
                <Link to="/home" className="home-btn">Home</Link>
                <div className='reg-log-btn-ctn'>
                    <Link to="/register" className='reg-button'>Join Now</Link>
                    <Link to="/login" className='log-button'>Sign In</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
