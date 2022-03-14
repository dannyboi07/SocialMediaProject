import React from 'react';
import { useDispatch } from 'react-redux';
import { setFSData } from '../../reducers/fullScreenReducer';
import "./userprofposts.css"

function UserProfPosts({ posts }) {
    const dispatch = useDispatch();

    function handleViewMoreClick(post) {
        dispatch(setFSData(post));
    };

    return (
        <div className="user-prof-posts-ctn">
            { 
                posts.map(post => <div key={ post.p_id } className="user-prof-post-ctn" onClick={ () => handleViewMoreClick(post) }>
                        {
                            post.p_pics[0] && <img className="user-prof-post-img" src={post.p_pics[0]} alt="Post preview"/>
                        }

                        <div className="user-prof-post-text-ctn">
                            <p>
                                { post.text }
                                hi hello this is some more text for testing the css area coverageasdfsaf jsahf kjhasdjkfhjakshfjkhfdjklhfsdjkf
                            </p>
                            <div className="text-shadow-box"></div>
                        </div>
                    </div>
                )    
            }
            
        </div>
    );
};

export default UserProfPosts;