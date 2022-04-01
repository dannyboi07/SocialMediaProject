import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import "./notif.css";
import { removeNotif } from '../../reducers/notificationReducer';

function Notif({ notif, handleNotifToggle }) {
    const history = useHistory();
    const dispatch = useDispatch();

    function handleNotifClick() {
        handleNotifToggle();
        handleReadClick();
        history.push(new URL(notif.url).pathname);
        return;
    }

    function handleReadClick() {
        console.log("read");
        dispatch(removeNotif(notif.primaryKey));
        return;
    }

    return (
        <div className="notif">
            <div className="notif-icon-ctn">
                <img src={ notif.icon } alt="notif-picture" />
            </div>

            <div className="notif-body-ctn" onClick={ handleNotifClick }>
                <h4>
                    {
                        notif.title
                    }
                </h4>
                <p>
                    {
                        notif.body
                    }
                </p>
            </div>
            <button className="mrk-rd-btn" onClick={ handleReadClick } >
                <svg className="mrk-rd-svg" fill="#808080" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="30px" height="30px"><path d="M12,22.5A10.5,10.5,0,1,0,1.5,12,10.5118,10.5118,0,0,0,12,22.5Zm0-20A9.5,9.5,0,1,1,2.5,12,9.51081,9.51081,0,0,1,12,2.5ZM8.64648,12.35352a.5.5,0,0,1,.707-.707L11,13.293l3.64648-3.64649a.5.5,0,0,1,.707.707l-4,4a.49984.49984,0,0,1-.707,0Z"/></svg>
            </button>
        </div>
    )
}

export default Notif