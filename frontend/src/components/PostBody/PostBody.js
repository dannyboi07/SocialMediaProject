import React from 'react';
import Profile from '../Profile/Profile';
import PostContent from '../PostContent/PostContent';
import PostDetails from '../PostDetails/PostDetails';
import "./postbody.css"

function PostBody({ post }) {

  return (
        <div className="post-body-ctn">
            <Profile name={ post.name } username={ post.username } profImgSrc={ post.imgloc }/>
            <PostContent content={ post.text }/>
            <PostDetails postId={ post.p_id } likes={ post.likes }/>
        </div>
    );
}

export default PostBody;
