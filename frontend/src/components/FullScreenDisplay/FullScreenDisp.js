import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { setFSData, removeFSData } from '../../reducers/fullScreenReducer';
import { getPost } from '../../services/contentService';
import "./fullscrndisp.css";

function FullScreenDisp({ children, displayPost }) {
    const storeHasAllFsData = useSelector(state => state.fullscreenData ? true : false);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const location = useLocation()
    // const location = useLocation();

    // const exitBtnRef = useRef(null);

    function handleCloseFullscreen() {
        if (displayPost) history.goBack();
        dispatch(removeFSData());
    };

    function onEscPress(e) {
        if (e.key === "Escape") {
            console.log(history);
            handleCloseFullscreen();
        };
    };

    useEffect(() => {
        // console.log(location);
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onEscPress);
        console.log(storeHasAllFsData);

        if (!storeHasAllFsData && displayPost) {
            console.log("fsd post");
            getPost(params.postId).then(resPost => dispatch(setFSData(resPost)));
        }

        // const exitBtn = exitBtnRef.current;
        // exitBtn.addEventListener("keydown", onEscPress);
        // exitBtn.focus();

        return () => {
            // const link = location.pathname.split("/");
            // console.log(link);
            // history.replace(`${link[1]}/${link[2]}`);
            document.body.style = undefined;
            document.removeEventListener("keydown", onEscPress);
            dispatch(removeFSData());
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