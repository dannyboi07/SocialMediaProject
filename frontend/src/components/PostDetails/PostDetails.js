import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likePostRdx, unLikePostRdx } from '../../reducers/postblogReducer';
import { getPostComms, getPostLikers, postComm } from '../../services/contentService';
import ProfileList from '../ProfileList/ProfileList';
import CommentsList from "../CommentsList/CommentsList";
import "./postdetails.css";

function PostDetails({ postUid, postId, likes, liked, noComments, inFlscrn }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  const [likesCount, setLikesCount] = useState(parseInt(likes));
  const [likestate, setLikestate] = useState({ display: "none" });
  const [likeResults, setLikeResults] = useState(null);
  const [ulikedOrNot, setuLikedOrNot] = useState(liked);
  const arwBtn = useRef(null);
  const profListRef = useRef(null);

  const [comCount, setComCount] = useState(parseInt(noComments));
  const [comsResults, setComsResults] = useState(null);
  const [comsState, setComsState] = useState({ display: "none" });
  const [comInputState, setComInputState] = useState("");
  const commListRef = useRef(null);
  const comInputRef = useRef(null);
  const comSubRef = useRef(null);
  const cmtArwBtn = useRef(null);

  // console.log(comCount, noComments);

  function OnInput() {
    this.style.height = "2.5em";
    this.style.height = this.scrollHeight + "px";
  };

  useEffect(() => {

    comInputRef.current.style = "height: 2.5em; overflow-y: hidden;";
    comInputRef.current.addEventListener("input", OnInput);
    comInputRef.current.addEventListener("keyup", handleEntClick);

    // return () => {
    //   console.log(comInputRef.current);
    //   comInputRef.current.removeEventListener("input", OnInput);
    //   comInputRef.current.removeEventListener("keyup", handleEntClick);
    // };
  }, []);

  let timer = null;
  
  function handleEntClick(e) {
    e.preventDefault();
    if (e.key === "Enter" && comInputState !== "") {
      comSubRef.current.click();
    }
  }

  function showLikes() {
    if (!likeResults) getLikes();

    if (timer) clearTimeout(timer);
    timer = setTimeout(()=> {
      setLikestate({ display: "block" });

      setTimeout(() => {
        profListRef.current.classList.add("show-ctn");
        arwBtn.current.classList.add("toggle-btn--active");
      }, 15);
    }, 0);
  };
  
  function hideLikes() {
    if (timer) clearTimeout(timer);

    profListRef.current.classList.remove("show-ctn");
    arwBtn.current.classList.remove("toggle-btn--active");

    timer = setTimeout(() => {
      setLikestate({ display: "none" });
    }, 150);
  };

  async function getLikes() {
    setLikeResults(await getPostLikers(postId));
  };

  function showLikesAsBlock() {
    arwBtn.current.classList.toggle("toggle-btn--active");
    
    likestate.display === "none" 
    ? showLikes()
    : hideLikes();
  };

  function handlePostLikeClick() {
    if (userData.uId === postUid) {
      window.alert("You cannot like your own post");
      return;
    };
    if (ulikedOrNot) {
      dispatch(unLikePostRdx(postId, userData.token));
      setuLikedOrNot(false);
      setLikesCount(likesCount - 1);
      showLikes();
    } else {
      dispatch(likePostRdx(postId, userData.token));
      setuLikedOrNot(true);
      setLikesCount(likesCount + 1);
      showLikes();
    };
  };

  let commTimer = null;

  async function getComms() {
    setComsResults(await getPostComms(postId));
  };

  function showComms() {
    if (!comsResults) getComms();
    // console.log(comsResults);

    if (commTimer) clearTimeout(commTimer);
    commTimer = setTimeout(() => {
      setComsState({ display: "block" });

      setTimeout(() => {
        commListRef.current.classList.add("show-comm-ctn");
        cmtArwBtn.current.classList.add("toggle-btn--active");
      }, 15);
    }, 0);
  }

  function hideComms() {
    if (commTimer) clearTimeout(commTimer);

    commListRef.current.classList.remove("show-comm-ctn");
    cmtArwBtn.current.classList.remove("toggle-btn--active");

    commTimer = setTimeout(() => {
      setComsState({ display: "none" });
    }, 200);
  };

  function showCmtsAsBlock() {
    cmtArwBtn.current.classList.toggle("toggle-btn--active");

    comsState.display === "none"
    ? showComms()
    : hideComms()
  };

  async function postComment() {
    try {
      const newComResp = await postComm(postId, comInputState, userData.token);
      setComInputState(null);
      comInputRef.current.value = null;
      setComCount(comCount + 1);

      if (comsResults) {
        setComsResults([ ...comsResults, newComResp])
      }
      else getComms();
      
    } catch(err) {
      console.error("Error posting comment");
    }
  };

  return (
    <div className={`post-details-ctn ${inFlscrn ? "pst-det-ctn--mod" : "" }`}>
      <div className="details-ctn">
        <div className="like-btn-ctn">
          <button className="like-btn"
            onClick={handlePostLikeClick}
            onTouchStart={showLikes}
            onTouchEnd={hideLikes}
            onMouseOver={showLikes} 
            onMouseOut={hideLikes}>
            { likesCount }

            <img className={ ulikedOrNot ? "" : "like-icon" } src={ ulikedOrNot ? "/liked-svg.gif" : "/heart.svg" } alt="like-icon"/>
          </button>

          <ProfileList className="likes-ctn" postId={postId} likestate={likestate} likeResults={likeResults} profListRef={profListRef}/>

          <button id={`tglBtn${postId}`} className="toggle-btn" onClick={showLikesAsBlock} ref={arwBtn}>
            <img src="/icon-arrow-down.svg" alt="toggle-likes"/>
          </button>

        </div>

        <div className="comments-btn-ctn">
          <button className="comments-btn"
          onTouchStart={showComms}
          onTouchEnd={hideComms}
          onMouseOver={showComms}
          onMouseOut={hideComms}>
            Comments: { comCount } 
          </button>

          <button className="toggle-btn" onClick={ showCmtsAsBlock } ref={ cmtArwBtn }>
            <img src="/icon-arrow-down.svg" alt="toggle-cmts"/>
          </button>

        </div>

        <CommentsList postId={ postId } comsState={ comsState } commentsData={ comsResults } commListRef={ commListRef } inFlscrn={ inFlscrn }/>
      </div>

      <div className="input-cmt-ctn">
        <textarea
        value={ comInputState }
        onChange={e => setComInputState(e.target.value)}
        placeholder='Comment...'
        ref={comInputRef}/>
        <button className={ comInputState === "" ? "post-cmt-btn-dis" : "" } onClick={ postComment } disabled={ comInputState === "" ? true : false } ref={ comSubRef }>
          Post
        </button>
      </div>
    </div>
  );
}

export default PostDetails;