import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPostLikes, likedOrNot } from '../../services/contentService';
import Profile from '../Profile/Profile';
import "./postdetails.css";

function PostDetails({ postId, likes }) {

  const [likestate, setLikestate] = useState({ display: "none" });
  const [likeResults, setLikeResults] = useState([]);

  const tempUId = useSelector(state => state.user);
  const [uId, setUid] = useState(tempUId ? tempUId.uId : null);

  const [ulikedOrNot, setuLikedOrNot] = useState(false);
  let timer = null;

  useEffect(() => {
    setUid(tempUId.uId);
    async function fetchLiked() {
      const response = await likedOrNot(postId, uId);

      response[0].count === "1" ? setuLikedOrNot(true) : setuLikedOrNot(false);
    };

    if (uId) fetchLiked();
  }, [tempUId, uId, postId]);

  function showLikes(id) {
    getLikes(id)
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

  function showLikesAsBlock(id) {
    const arwBtn = document.getElementById(`tglBtn${id}`);  
    arwBtn.classList.toggle("toggle-btn--active")
    likestate.display === "none" 
    ? showLikes(id)
    : hideLikes();
  }

  return (
    <div className='post-details-ctn'>
      <div className="like-btn-ctn">
        <button className="like-btn"
          onTouchStart={() => showLikes(postId)}
          onTouchEnd={hideLikes}
          onMouseOver={() => showLikes(postId)} 
          onMouseLeave={hideLikes}>
          { likes }
          <svg id={`like-svg${postId}`} 
          className={ ulikedOrNot ? "liked-svg" : "" } 
          fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M35,8c-4.176,0-7.851,2.136-10,5.373C22.851,10.136,19.176,8,15,8C8.373,8,3,13.373,3,20c0,14,16,21,22,26c6-5,22-12,22-26C47,13.373,41.627,8,35,8z"/></svg>
        </button>

        <button id={`tglBtn${postId}`} className="toggle-btn" onClick={() => showLikesAsBlock(postId)}>
          <img src="/icon-arrow-down.svg" alt="toggle-likes"/>
        </button>

      </div>
      <button>Comments: 10</button>

      <div id={`likes${postId}`} className="likes-ctn" style={likestate}>
        { likeResults === [] 
          ? <p>Loading</p> 
          : likeResults.map(like => <Profile key={ like.like_id } name={ like.name } username={ like.username } profImgSrc={ like.imgloc }/>) 
        }
      </div>
    </div>
  );
}

export default PostDetails;


// http://localhost:3500/images/icon-arrow-down.svg