import React, { useState } from 'react';
import "./postdetails.css";

function PostDetails() {
  const [likestate, setLikestate] = useState({ display: "none" });

  let timer = null;

  function showLikes() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(()=> {
      setLikestate({ display: "block" });
    }, 1)
    function toggle() {
      document.getElementById("likes1").classList.toggle("show-ctn");
      console.log("hi");
    };
    toggle();
  };
  
  function hideLikes() {
    if (timer) clearTimeout(timer);
    document.getElementById("likes1").classList.toggle("show-ctn");
    timer = setTimeout(() => {
      setLikestate({ display: "none" });
    }, 50);
  }

  return (
    <div className='post-details-ctn'>
      <button onMouseOver={showLikes} onMouseLeave={hideLikes}>Likes: 24</button>
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
