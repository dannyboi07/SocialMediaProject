import React from 'react';
import Profile from '../Profile/Profile';
import PostContent from '../PostContent/PostContent';
import PostDetails from '../PostDetails/PostDetails';
import "./postbody.css"

function PostBody() {
  return (
        <div className="post-body-ctn">
            <Profile />
            <PostContent />
            <PostDetails />
        </div>
    );
}

export default PostBody;
