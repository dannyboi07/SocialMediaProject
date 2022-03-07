import React, { useState } from 'react';
import { getPostLikes } from '../../services/contentService';
import Profile from '../Profile/Profile';
import "./postdetails.css";

function PostDetails({ postId, likes }) {

  const [likestate, setLikestate] = useState({ display: "none" });
  const [likeResults, setLikeResults] = useState([]);

  let timer = null;

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
    }, 600);
  };

  async function getLikes(id) {
    setLikeResults(await getPostLikes(id));
    // console.log(likeResults);
  };

  function showLikesAsBlock(id) {
    likestate.display === "none" 
    ? showLikes(id)
    : hideLikes();
  }

  return (
    <div className='post-details-ctn'>
      <div>
        <button 
          onTouchStart={() => showLikes(postId)}
          onTouchEnd={hideLikes}
          onMouseOver={() => showLikes(postId)} 
          onMouseLeave={hideLikes}>Likes: { likes }
        </button>
        <button className="toggle-btn" onClick={() => showLikesAsBlock(postId)}><img src="/icon-arrow-down.svg" alt="toggle-likes"/></button>
      </div>
      <button>Comments: 10</button>
      <div id={`likes${postId}`} className="likes-ctn" style={likestate}>
        { likeResults === [] 
          ? <p>Loading</p> 
          : likeResults.map(like => <Profile key={ like.like_id } name={ like.name } username={ like.username } profImgSrc={ like.imgloc }/>) }
      </div>
    </div>
  );
}

export default PostDetails;


// http://localhost:3500/images/icon-arrow-down.svg