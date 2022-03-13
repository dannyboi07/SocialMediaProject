/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { followUser, getUser, unFollowUser } from '../../services/userService';
import "./userprofile.css";

function UserProfile() {
    const params = useParams();
    const [userProf, setUserProf] = useState(null);
    const user = useSelector(state => state.user);
    console.log(user);

    useEffect(() => {
        async function getUserEff() {
            if (user) {
                console.log("here");
                setUserProf(await getUser(params.username, user.token));
            } else setUserProf(await getUser(params.username));
        };
        getUserEff();
    }, [user]);

    if (!userProf) return <p>Loading</p>
    // console.log(userProf);

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

    return (
        <div className="user-prof">
            <img className="user-prof-img" src={ userProf.imgloc } alt="Profile picture"></img>
            
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
                    user && <button id="user-flw-btn" onClick={ handleFollowBtnClick }>
                                { userProf.follows ? "Unfollow" : "Follow" }
                            </button>
                }
            </div>
        </div>
    )
}

export default UserProfile;