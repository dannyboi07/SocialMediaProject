import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import PostContent from '../PostContent/PostContent';
import PostDetails from '../PostDetails/PostDetails';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFSData } from '../../reducers/fullScreenReducer';

import "./postbody.css"

function PostBody({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const userDetails = useSelector(state => state.user);
    // const [ friend, setFriend ] = useState(post.friends);

    console.log(post);
    function handleFsClick() {
        dispatch(setFSData(post));
        history.push(`/home/post/${post.p_id}`);
    };

    // async function friendClickHandle() {
    //     try {
    //       if (!userDetails) {
    //         history.push("/login");
    //       } 
    //       else if ( friend ) {
    //         await unFollowUser(post.p_id, userDetails.token);
    //         setFriend(!friend);
    //       } else if ( !friend ) {
    //         await followUser( post.p_id, userDetails.token );
    //         setFriend( !friend );
    //       };
    //     } catch(err) {
    //       console.error(err);
    //     }
    //   };

    return (
            <div className="post-body-ctn">
                <Profile name={ post.name } username={ post.username } profImgSrc={ post.imgloc } postUid={ post.u_id } friends={ post.friends } inMain={ true }/>
                <PostContent handleFsClick={ handleFsClick } postId={ post.p_id } postText={ post.text } postImages={ post.p_pics } />
                <PostDetails postUid={ post.u_id } postId={ post.p_id } likes={ post.likes } liked={ post.liked } noComments={ post.no_comments } />
            </div>
    );
}

export default PostBody;
