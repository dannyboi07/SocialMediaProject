import React from 'react';
import Profile from '../Profile/Profile';
import PostContent from '../PostContent/PostContent';
import PostDetails from '../PostDetails/PostDetails';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFSData } from '../../reducers/fullScreenReducer';
import "./postbody.css"

function PostBody({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFsClick() {
        dispatch(setFSData(post));
        history.push(`/home/post/${post.p_id}`);
    };

    return (
        <div className="post-body-ctn">
            <Profile name={ post.name } username={ post.username } profImgSrc={ post.imgloc }/>
            <PostContent handleFsClick={ handleFsClick } postId={ post.p_id } postText={ post.text } postImages={ post.p_pics } />
            <PostDetails postId={ post.p_id } likes={ post.likes }/>
        </div>
    );
}

export default PostBody;
