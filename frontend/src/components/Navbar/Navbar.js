import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { dispatchLogOut } from '../../reducers/userReducer';
import "./navbar.css";

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    function logOut() {
        dispatch(dispatchLogOut());
    };

    return (
        <div className="nav-container">
            <Link to="/" className='logo'>
                Blog<span>!</span><span>T</span>
            </Link>

            <nav className="">
                {/* <div className='home-btn-ctn'>
                    
                </div> */}
                <Link to="/home" className="home-btn">Home</Link>
                <div className={`reg-log-btn-ctn${ user 
                    ? " reg-log-btn-ctn--lgout"
                    : "" }`}>
                    { user 
                        ? <Link to="/login" className="log-button" onClick={logOut}>
                                Logout
                          </Link> 
                        : <>
                            <Link to="/register" className='reg-button'>
                                Join Now
                            </Link>
                            <Link to="/login" className='log-button'>
                                Sign In
                            </Link>
                          </> 
                    }
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
