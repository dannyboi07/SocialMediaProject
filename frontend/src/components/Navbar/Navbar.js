import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { dispatchLogOut } from '../../reducers/userReducer';
import { getSearch } from '../../services/searchService';
import Profile from '../Profile/Profile';
import "./navbar.css";

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const search = useRef(null);
    const [searchRes, setSearchRes] = useState(null);
    // console.log(searchRes);

    function logOut() {
        dispatch(dispatchLogOut());
    };

    async function handleSearchChange(e) {
        search.current = e.target.value;
        if (search.current && search.current !== "" && search.current !== " ") setSearchRes(await getSearch(search.current)) 
        else setSearchRes(null);
    }

    return (
        <div className="nav-container">
            <Link to="/" className='logo'>
                Blog<span>!</span><span>T</span>
            </Link>

            <nav className="">
                <Link to="/home" className="home-btn">
                    Home
                </Link>

                <div className="search-ctn">

                    <input type="text" name="search-box" 
                    onChange={e => handleSearchChange(e)} 
                    placeholder="Search..."/>

                    <div className={ search.current 
                        ? searchRes 
                            ? "search-results-ctn" 
                            : "search-results-ctn no-res-ctn" 
                        : "hide-res-ctn" }>
                        {
                            searchRes && searchRes.map(res => 
                                <Profile key={res.u_id} name={ res.name } username={ res.username } profImgSrc={ res.imgloc }
                                />)
                        }
                        {
                            search.current && !searchRes && 
                                <p className="no-res-fnd">
                                    No results found
                                </p>
                        }
                    </div>
                </div>

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
