/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { followUser, getUser, unFollowUser } from '../../services/userService';
import "./userprofile.css";
import UserProfPosts from '../UserProfPosts/UserProfPosts';
import LoadingComp from '../LoadingComp/LoadingComp';
import useIsMount from '../../hooks/useIsMount';
import { setFailure } from '../../reducers/failureReducer';
import FailureComp from '../FailureComp/FailureComp';
import { getUserThunk } from '../../reducers/usersReducer';

function UserProfile() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const failureState = useSelector(state => state.failure?.type === "USER_PROF");
    const userProf = useSelector(state => state.users);
    // const history = useHistory();
    // const isFirstRender = useIsMount();
    // const [userProf, setUserProf] = useState(null);
    const [follows, setFollows] = useState(userProf?.friends);
    const [curView, setCurView] = useState({ posts: true, blogs: false });
    // const urlRef = useRef(null);

    // useEffect(() => {
    //     history.push(`/users/${params.username}`);
    // }, [])
    // console.log(isFirstRender);

    useEffect(() => {
        if (user) {
            // console.log("useef if", user.token);
            dispatch(getUserThunk(params.username, user.token)); 
        }
        else {
            dispatch(getUserThunk(params.username)); 
            // console.log("useef else");
        }
        // async function getUserEff() {
            // console.log("rendering", isFirstRender);
            // if (user) {
            //     console.log("if");
            //     getUser(params.username, user.token)
            //         .then(res => setUserProf(res))
            //         .catch(error => {
            //             console.error(error);
            //             dispatch(setFailure("USER_PROF", { 
            //                 func: getUser, 
            //                 param: {
            //                     ...params.username, 
            //                     ...user.token
            //                 } 
            //             }));
            //         });
            // } else {
            //     console.log("else");
            //     getUser(params.username)
            //         .then(res => setUserProf(res))
            //         .catch(error => {
            //             console.error(error);
            //             dispatch(setFailure("USER_PROF", params.username));
            //         });
            // };
        //};
        // getUserEff();
        // urlRef.current = params.username;
    }, []);

    useEffect(() => {
        setFollows(userProf?.friends);
    }, [userProf]);

    if (failureState) {
        return (
            <div className="user-prof-ctn--loading">
                <FailureComp />
            </div>
        )
    }

    if (!userProf) {
    return (
        <div className="user-prof-ctn--loading">
            <LoadingComp />
        </div>
    )};

    async function handleFollowBtnClick() {
        if (follows) {
            try {
                await unFollowUser(userProf.u_id, user.token);
                setFollows(!follows);
            } catch(err) {
                console.error(err);
                window.alert(`Failed to unfollow ${userProf.name}, try again`);
            };
            // document.getElementById("user-flw-btn").textContent = "Follow";
        } else {
            try {
                await followUser(userProf.u_id, user.token);
                setFollows(!follows);
            } catch(err) {
                console.error(err);
                window.alert(`Failed to follow ${userProf.name}, try again`);
            };
            // document.getElementById("user-flw-btn").textContent = "Unfollow";
        };
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
                    <img className="user-prof-img" src={ userProf.imgloc } alt="Profile picture" />
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
                            ? <button id="user-flw-btn" className={`${follows ? "unfrnd-btn" : "frnd-btn"}`} onClick={ handleFollowBtnClick }>
                                { follows ? "Unfriend" : "Add Friend" }
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
                userProf && userProf.posts && curView.posts && <UserProfPosts name={ userProf.name } imgloc={userProf.imgloc} username={userProf.username} posts={ userProf.posts }/>
            }
        </div>
    )
}

export default UserProfile;