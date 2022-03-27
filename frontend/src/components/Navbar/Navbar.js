import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { dispatchLogOut } from '../../reducers/userReducer';
import { setCrData } from '../../reducers/fullScreenReducer';
import { getSearch } from '../../services/searchService';
import Profile from '../Profile/Profile';
import "./navbar.css";

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const search = useRef(null);
    const searchFocusRef = useRef(null);
    const [searchRes, setSearchRes] = useState(null);
    const [hamToggled, setHamToggled] = useState(false);
    
    useEffect(() => {
        function clrSearchFcs() {
            search.current = "";
            this.value = null;
            setSearchRes(null);
        };

        searchFocusRef.current.addEventListener("blur", clrSearchFcs);

        return () => searchFocusRef.current.removeEventListener("blur", clrSearchFcs);
    }, []);

    function logOut() {
        dispatch(dispatchLogOut());
    };

    function dispatchCrPost() {
        dispatch(setCrData());
    };

    async function handleSearchChange(e) {
        search.current = e.target.value;
        if (search.current && search.current !== "" && search.current !== " ") setSearchRes(await getSearch(search.current)) 
        else setSearchRes(null);
    };

    return (
        <>
            <div className="nav-container-desktop">
                <Link to="/" className='logo'>
                    <h3>Socio</h3>
                </Link>

                <div className="search-ctn">

                    <input type="text" name="search-box" 
                    onChange={e => handleSearchChange(e)} 
                    placeholder="Search..." ref={ searchFocusRef }/>

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

                <nav className="desktop-nav">

                    <div className={`reg-log-btn-ctn${ user 
                        ? " reg-log-btn-ctn--lgout"
                        : "" }`}>
                        { user 
                            ? 
                            <>
                                <Link to="/home">
                                    <img src="/icon-home.svg" alt="Home" />
                                </Link>

                                <div className="noti-icon"></div>
                                
                                <div className="create-icon" onClick={dispatchCrPost}></div>
                                
                                <Link to="/login" onClick={logOut}>
                                    <div className="logout-icon"></div>
                                </Link>
                            </> 
                            : <>
                                <Link to="/home">
                                    <img src="/icon-home.svg" alt="Home" />
                                </Link>

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

            <div className="nav-container-mobile">
                <Link to="/" className='logo'>
                    {/* Blog<span>!</span><span>T</span> */}
                    {/* <img src="/logo1.png" alt="logo" /> */}
                    <h3>Socio</h3>
                </Link>

                <div className="search-ctn">

                    <input type="text" name="search-box" 
                    onChange={e => handleSearchChange(e)} 
                    placeholder="Search..." ref={ searchFocusRef }/>

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
            </div>

            <nav className="mobile-nav">

                <div className={`reg-log-btn-ctn${ user 
                    ? " reg-log-btn-ctn--lgout"
                    : "" }`}>
                    { user 
                        ? 
                          <>
                            <Link to="/home">
                                <img src="/icon-home.svg" alt="Home" />
                            </Link>

                            <div className="noti-icon"></div>
                            
                            <div className="create-icon" onClick={dispatchCrPost}></div>
                            
                            <Link to="/login" onClick={logOut}>
                                <div className="logout-icon"></div>
                            </Link>
                          </> 
                        : <>
                            <Link to="/home">
                                <img src="/icon-home.svg" alt="Home" />
                            </Link>

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
        </>
    );
}

export default Navbar;
