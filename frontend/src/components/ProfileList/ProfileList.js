import React from 'react';
// import LoadingComp from '../LoadingComp/LoadingComp';
import Profile from '../Profile/Profile';
import "./ProfileList.css";

function ProfileList({ postId, className, likestate, likeResults, profListRef }) {
    // console.log(postId, likestate, likeResults);

    if (!likeResults) {
        return (
            <div id={`likes${postId}`} className={`${className} likes-ctn--no-likes`} style={ likestate } ref={ profListRef }>
                {/* <LoadingComp /> */}
                <p>Loading...</p>
            </div>
        )
    }
    else if (likeResults.length === 0) {
        // console.log("No one")
        return (
            <div id={`likes${postId}`} className={`${className} likes-ctn--no-likes`} style={ likestate } ref={ profListRef }>
                <p>No one here :(</p>
            </div>
        )
    }

    return (
        <div id={`likes${postId}`} className={ className } style={ likestate } ref={ profListRef }>
            {
                likeResults.map(like => <Profile key={ like.like_id } name={ like.name } username={ like.username } profImgSrc={ like.imgloc }/>)
            }
        </div>
    )
}

export default ProfileList;