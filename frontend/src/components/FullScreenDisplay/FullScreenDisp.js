import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { removeFSData } from '../../reducers/fullScreenReducer';
import "./fullscrndisp.css";

function FullScreenDisp({ children, post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // const exitBtnRef = useRef(null);

    function handleCloseFullscreen() {
        if (post) history.goBack();
        dispatch(removeFSData());
    };

    function onEscPress(e) {
        if (e.key === "Escape") {
            handleCloseFullscreen();
        };
    };

    useEffect(() => {
        // console.log(location);
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onEscPress);

        // const exitBtn = exitBtnRef.current;
        // exitBtn.addEventListener("keydown", onEscPress);
        // exitBtn.focus();

        return () => {
            console.log(location.pathname)
            history.replace(`${location.pathname}`);
            document.body.style = undefined;
            document.removeEventListener("keydown", onEscPress);

            // exitBtn.removeEventListener("keydown", onEscPress);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="pos-abs-wrapper">
            <div className="flscrn-post-ctn-bg">
                {
                    children
                }

                <img className="close-post-flscrn" src="/close-icon.svg" alt="Close" onClick={ handleCloseFullscreen } />

            </div>
        </div>
    )
}

export default FullScreenDisp;

// ref={exitBtnRef} tabIndex={0}