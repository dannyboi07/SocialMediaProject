import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { setFSData, removeFSData } from '../../reducers/fullScreenReducer';
import { getPost } from '../../services/contentService';
import { setStatusNotif } from '../../reducers/statusNotifReducer';
// import { setFailure } from '../../reducers/failureReducer';
import "./fullscrndisp.css";
import { setFailure } from '../../reducers/failureReducer';

function FullScreenDisp({ children, displayPost }) {
    const storeHasAllFsData = useSelector(state => state.fullscreenData ? true : false);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    function handleCloseFullscreen() {
        if (displayPost) history.goBack();
        dispatch(removeFSData());
    };

    function onEscPress(e) {
        if (e.key === "Escape") {
            handleCloseFullscreen();
        };
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onEscPress);
        // console.log(storeHasAllFsData);
        // window.addEventListener("beforeunload", () => history.push("/home"));

        if (!storeHasAllFsData && displayPost) {
            console.log("fsd post");
            // history.goBack();
            getPost(params.postId)
            .then(resPost => dispatch(setFSData(resPost)))
            .catch(err => {
                console.error(err);
                const newPath = location.pathname.split("/");
                dispatch(setStatusNotif("SET_ERR_NOTIF", "Failed to retrieve post or resource doesn't exist", 3));
                history.replace(`/${newPath[1]}/${newPath[2]}`, null);
                // dispatch(setFailure("POST", null));
                // window.alert("Failed to retrieve post or resource doesn't exist");
            });
        }

        return () => {
            // const link = location.pathname.split("/");
            // console.log(link);
            // history.replace(`${link[1]}/${link[2]}`);
            document.body.style = undefined;
            document.removeEventListener("keydown", onEscPress);
            // window.removeEventListener("beforeunload", () => history.push("/home"));
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