import React from 'react';
import { useDispatch } from 'react-redux';
import { setFSData } from '../../reducers/fullScreenReducer';
import { useHistory } from 'react-router-dom';
import "./userprofposts.css"

function UserProfPosts({ posts, name, username, imgloc }) {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleViewMoreClick(post) {
        history.push(`/users/${username}/post/${post.p_id}`);
        dispatch(setFSData({ ...post, name, username, imgloc }));
    };

    return (
        <div className="user-prof-posts-ctn">
            { 
                posts.map(post => <div key={ post.p_id } className="user-prof-post-ctn" onClick={ () => handleViewMoreClick(post) }>
                        {
                            post.p_pics?.length > 0 && <img className="user-prof-post-img" src={post.p_pics[0]} alt="Post preview"/>
                        }

                        <div 
                        className="user-prof-post-text-ctn" 
                        style={{ 
                            height: post.p_pics?.length > 0 
                                ? "20%" 
                                : "100%" 
                            }}>
                            <p>
                                { post.text }
                            </p>
                            <div className="text-shadow-box"></div>
                        </div>
                    </div>
                )    
            }
        </div>
    )
};

export default UserProfPosts;