import React from 'react';
import Profile from '../Profile/Profile';
import "./comment.css";

function Comment({ commentData }) {
    return (
        <div className="comment-ctn">
            <Profile name={ commentData.name } username={ commentData.username } profImgSrc={ commentData.imgloc } inCmt={ true }/>
            <hr/>
            <p>
                { commentData.comment }
            </p>
        </div>
    );
};

export default Comment;