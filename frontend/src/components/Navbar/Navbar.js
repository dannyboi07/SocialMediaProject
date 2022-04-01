import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { dispatchLogOut } from '../../reducers/userReducer';
import { setCrData } from '../../reducers/fullScreenReducer';
import { getSearch } from '../../services/searchService';
import Profile from '../Profile/Profile';
import "./navbar.css";
import Notif from '../Notif/Notif';
import LoadingComp from '../LoadingComp/LoadingComp';
import { removeNotif, getAllNotifs, clearNotifs } from '../../reducers/notificationReducer';
import { getNotifsCount } from '../../services/notifService';

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const search = useRef(null);
    // const searchFocusRef = useRef(null);
    const [searchRes, setSearchRes] = useState(null);

    const notifs = useSelector(state => state.notifs);
    const [notifState, setNotifState] = useState({ display: "none" });
    const [notifCount, setNotifCount] = useState(0);
    const notifsRef = useRef(null);
    const notifRef = useRef(null);
    const notifMobRef = useRef(null);

    useEffect(() => {

        if (user) getNotifsCount(user.token)
        .then(res => setNotifCount(res.count))
        .catch(err => console.error(err));

        // searchFocusRef.current.addEventListener("onfocusout", clrSearchFcs);
        // notifRef.current.addEventListener("onfocus", () => handleNotifToggle());
        // const searchFocusRefCleanUp = searchFocusRef.current;

        return () => {
            // searchFocusRefCleanUp.removeEventListener("blur", clrSearchFcs);
            // notifRef.current.removeEventListener("onfocus", () => handleNotifToggle());
        };
    }, []);

    useEffect(() => {

        if (notifs) {
            getNotifsCount(user.token)
                .then(res => setNotifCount(res.count))
                .catch(err => console.error(err));
        };
    }, [notifs, user]);

    function clrSearchFcs(e) {
        // console.log(e);
        e.target.value = null;
        search.current = null;
        setSearchRes(null);
    };

    function logOut() {
        dispatch(dispatchLogOut());
    };

    function dispatchCrPost() {
        dispatch(setCrData());
    };

    async function handleSearchChange(e) {
        // console.log("search changed");
        search.current = e.target.value;
        if (search.current && search.current !== "" && search.current !== " ") setSearchRes(await getSearch(search.current)) 
        else setSearchRes(null);
    };

    function handleNotifToggle() {
        let timer = null;
        if (notifState.display === "none") {
            console.log("toggled if");
            dispatch(getAllNotifs(user.token));
            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
                setNotifState({ display: "block" })

                setTimeout(() => {
                    notifsRef.current.classList.add("notif-ctn--active");
                    notifMobRef.current.classList.add("notif-ctn--active");
                }, 15);
            }, 0);
        }
        else if (notifState.display === "block") {
            console.log("toggled else");
            if (timer) clearTimeout(timer);

            notifsRef.current.classList.remove("notif-ctn--active");
            notifMobRef.current.classList.remove("notif-ctn--active");

            timer = setTimeout(() => {
                setNotifState({ display: "none" });
                dispatch(clearNotifs());
            }, 150);
        };
    };

    function handleAllRead() {
        notifs.forEach(notif => {
            dispatch(removeNotif(notif.primaryKey));
        });
    };

    return (
        <>
            <div 
            className="nav-container-desktop">
                <Link to="/" 
                className='logo'>
                    <h3>Socio</h3>
                </Link>

                <div 
                className="search-ctn">

                    <input type="text" name="search-box" 
                    onChange={e => handleSearchChange(e)} 
                    placeholder="Search..." 
                    onBlur={e => clrSearchFcs(e)} />

                    <div className={ search.current 
                        ? searchRes 
                            ? "search-results-ctn" 
                            : "search-results-ctn no-res-ctn" 
                        : "hide-res-ctn" }>
                        {
                            searchRes && searchRes.map(res => 
                                <Profile key={res.u_id} 
                                name={ res.name } 
                                username={ res.username } 
                                profImgSrc={ res.imgloc }
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

                                <div className="create-icon" 
                                onClick={dispatchCrPost}/>

                                <div className="noti-icon" 
                                onClick={ handleNotifToggle }
                                ref={ notifRef }>
                                    <div className="no-of-notifs">
                                        <p>
                                            {
                                                notifCount || 0
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div 
                                className={`notifs-ctn ${notifs?.length === 0 ? "no-notifs" : "" }`}
                                ref={ notifsRef }>
                                    {
                                        notifs ?
                                            notifs.length === 0 ?
                                                <p>
                                                    No notifications
                                                </p>
                                            :   <>
                                                    <button 
                                                    className="mrk-all-rd"
                                                    onClick={handleAllRead}>
                                                        Mark all as read
                                                    </button>
                                                    {
                                                        notifs.map(notif => 
                                                            <Notif key={notif.primaryKey} 
                                                            notif={notif} handleNotifToggle={handleNotifToggle}/>
                                                        )
                                                    } 
                                                </>
                                        :   <LoadingComp mini={ true }/>
                                    }
                                </div>
                                
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

                            <div className="noti-icon" 
                                onClick={ handleNotifToggle }
                                ref={ notifRef }>
                                    <div className="no-of-notifs">
                                        <p>
                                            {
                                                notifCount || 0
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div 
                                className={`notifs-mob-ctn ${notifs?.length === 0 ? "no-notifs" : "" }`}
                                ref={ notifMobRef }>
                                    {
                                        notifs ?
                                            notifs.length === 0 ?
                                                <p>
                                                    No notifications
                                                </p>
                                            :   <>
                                                    <button 
                                                    className="mrk-all-rd"
                                                    onClick={handleAllRead}>
                                                        Mark all as read
                                                    </button>
                                                    {
                                                        notifs.map(notif => 
                                                            <Notif key={notif.primaryKey} 
                                                            notif={notif} handleNotifToggle={handleNotifToggle}/>
                                                        )
                                                    } 
                                                </>
                                        :   <LoadingComp mini={ true }/>
                                    }
                                </div>
                            
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
