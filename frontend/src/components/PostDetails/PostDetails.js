import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likePostRdx, unLikePostRdx } from '../../reducers/postblogReducer';
import { getPostLikes, likedOrNot } from '../../services/contentService';
// import Profile from '../Profile/Profile';
import useIsMount from "../../hooks/useIsMount";
import "./postdetails.css";
import ProfileList from '../ProfileList/ProfileList';

function PostDetails({ postId, likes }) {

  const dispatch = useDispatch();
  const isFirstRender = useIsMount();
  const [likestate, setLikestate] = useState({ display: "none" });
  const [likeResults, setLikeResults] = useState(null);
  const [ulikedOrNot, setuLikedOrNot] = useState(undefined);

  const userData = useSelector(state => state.user);
  const [uId, setUid] = useState(userData ? userData.uId : null);

  let timer = null;

  useEffect(() => {
    if (userData) setUid(userData.uId);
    async function fetchLiked() {
      const response = await likedOrNot(postId, uId);

      response[0].count === "1" ? setuLikedOrNot(true) : setuLikedOrNot(false);
    };
    if (uId) fetchLiked();

    if (!isFirstRender) getLikes(postId);
  }, [uId, ulikedOrNot]);

  // useEffect(() => {
  //   if (!isFirstRender) getLikes(postId);
  // }, [ulikedOrNot])
  // userData, postId, 

  // useEffect(() => {
  //   if (!isFirstRender && likestate.display === "block") {
  //     console.log("useeffect");
  //     getLikes(postId);
  //     // showLikes();
  //   };
  // }, [likestate]);

  function showLikes() {
    // if (dontGet !== "dont") getLikes(postId);
    getLikes(postId);

    if (timer) clearTimeout(timer);
    timer = setTimeout(()=> {
      setLikestate({ display: "block" });

      setTimeout(() => {
        toggle();
      }, 15);
    }, 0)
    function toggle() {
      document.getElementById(`likes${postId}`).classList.add("show-ctn");
    };
  };
  
  function hideLikes() {
    if (timer) clearTimeout(timer);
    document.getElementById(`likes${postId}`).classList.remove("show-ctn");
    timer = setTimeout(() => {
      setLikestate({ display: "none" });
    }, 150);
  };

  async function getLikes(id) {
    setLikeResults(await getPostLikes(id));
  };

  function showLikesAsBlock() {
    const arwBtn = document.getElementById(`tglBtn${postId}`);  
    arwBtn.classList.toggle("toggle-btn--active");
    
    likestate.display === "none" 
    ? showLikes()
    : hideLikes();
  };

  function handlePostLikeClick() {
    if (ulikedOrNot) {
      dispatch(unLikePostRdx(postId, userData.token));
      setuLikedOrNot(false);
      // getLikes(postId);
      showLikes();
    } else {
      dispatch(likePostRdx(postId, userData.token));
      setuLikedOrNot(true);
      // getLikes(postId);
      showLikes();
    };
  };

  return (
    <div className='post-details-ctn'>
      <div className="like-btn-ctn">
        <button className="like-btn"
          onClick={handlePostLikeClick}
          onTouchStart={showLikes}
          onTouchEnd={hideLikes}
          onMouseOver={showLikes} 
          onMouseOut={hideLikes}>
          { likes }
          
          <svg id={`like-svg${postId}`} 
          className={ ulikedOrNot ? "like-btn-svg-path liked-svg" : "like-btn-svg-path" } 
          fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M35,8c-4.176,0-7.851,2.136-10,5.373C22.851,10.136,19.176,8,15,8C8.373,8,3,13.373,3,20c0,14,16,21,22,26c6-5,22-12,22-26C47,13.373,41.627,8,35,8z"/></svg>
        </button>

        <ProfileList className="likes-ctn" postId={postId} likestate={likestate} likeResults={likeResults}/>

        <button id={`tglBtn${postId}`} className="toggle-btn" onClick={showLikesAsBlock}>
          <img src="/icon-arrow-down.svg" alt="toggle-likes"/>
        </button>

      </div>
      <button>Comments: 10</button>
    </div>
  );
}

export default PostDetails;


// http://localhost:3500/images/icon-arrow-down.svg
// () => { getLikes(postId); showLikes()}

/* <div id={`likes${postId}`} className="likes-ctn" style={likestate}>
  { likeResults === [] 
    ? <p>Loading</p> 
    : likeResults.map(like => <Profile key={ like.like_id } name={ like.name } username={ like.username } profImgSrc={ like.imgloc }/>) 
  }
</div> */