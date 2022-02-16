import React, { useState } from 'react';
import { getPostLikes } from '../../services/contentService';
import "./postdetails.css";

function PostDetails({ postId, likes }) {

  const [likestate, setLikestate] = useState({ display: "none" });

  let timer = null;

  function showLikes() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(()=> {
      setLikestate({ display: "block" });
    }, 1)
    function toggle() {
      document.getElementById("likes1").classList.add("show-ctn");
      console.log("hi");
    };
    toggle();
  };
  
  function hideLikes() {
    if (timer) clearTimeout(timer);
    document.getElementById("likes1").classList.remove("show-ctn");
    timer = setTimeout(() => {
      setLikestate({ display: "block" });
    }, 50);
  };

  async function getLikes(id) {
    console.log(await getPostLikes(id));
  }

  return (
    <div className='post-details-ctn'>
      <div>
        <button onMouseOver={showLikes} onMouseLeave={hideLikes}>Likes: { likes }</button>
        <button className="toggle-btn" onClick={() => getLikes(postId)}><img src="http://localhost:3500/images/icon-arrow-down.svg" alt="toggle-likes"/></button>
      </div>
      <button>Comments: 10</button>
      <div id='likes1' className="likes-ctn" style={likestate}>
        <p>hihihihihi</p>
        <p>hihihihihi</p>
        <p>hihihihihi</p>
      </div>
    </div>
  );
}

export default PostDetails;
