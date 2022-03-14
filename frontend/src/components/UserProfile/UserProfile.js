/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { followUser, getUser, unFollowUser } from '../../services/userService';
import "./userprofile.css";
import UserProfPosts from '../UserProfPosts/UserProfPosts';

function UserProfile() {
    const params = useParams();
    const [userProf, setUserProf] = useState(null);
    const [curView, setCurView] = useState({ posts: true, blogs: false });
    const user = useSelector(state => state.user);
    // console.log(user);

    useEffect(() => {
        async function getUserEff() {
            if (user) {
                setUserProf(await getUser(params.username, user.token));
            } else setUserProf(await getUser(params.username));
        };
        getUserEff();
    }, [user]);

    if (!userProf) return <p>Loading</p>
    console.log(userProf);

    async function handleFollowBtnClick() {
        if (userProf.follows) {
            await unFollowUser(userProf.u_id, user.token);
            document.getElementById("user-flw-btn").textContent = "Follow";
        } else {
            await followUser(userProf.u_id, user.token);
            document.getElementById("user-flw-btn").textContent = "Unfollow";
        };
        userProf.follows = !userProf.follows;
    };

    function handlePostsClick() {
        setCurView({ posts: true, blogs: false });
    };

    function handleBlogsClick() {
        setCurView({ posts: false, blogs: true });
    };

    return (
        <div className="user-prof-ctn">
            <div className="user-prof-details-ctn">

                <div className="user-prof-img-ctn">
                    <img className="user-prof-img" src={ userProf.imgloc } alt="Profile picture"></img>
                </div>            
                    <div className="user-prof-right-ctn">
                        <p>
                            { userProf.name }
                        </p>
                        <p>
                            { userProf.username }
                        </p>
                        <p>
                            { userProf.email }
                        </p>

                        {  

                            user && user.uId !== userProf.u_id 
                            ? <button id="user-flw-btn" onClick={ handleFollowBtnClick }>
                                { userProf.follows ? "Unfollow" : "Follow" }
                            </button>
                            : <button>
                                Edit Profile
                            </button>
                        }
                    </div>
                </div>
            <hr className="user-cntnt-hr-top"/>
            <div className="user-cntnt-switch">
                {
                    userProf.posts && <button onClick={ handlePostsClick }>
                        Posts
                    </button>
                }
                {
                    true && <>
                        <hr />
                        <button onClick={ handleBlogsClick }>
                            Blogs
                        </button>
                    </> 
                }
            </div>
            <hr className="user-cntnt-hr-btm" />
            {
                userProf && userProf.posts && curView.posts && <UserProfPosts posts={ userProf.posts }/>
            }
        </div>
    )
}

export default UserProfile;