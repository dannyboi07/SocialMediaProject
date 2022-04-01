import React from "react";
import { useSelector } from "react-redux";
import PostBody from "../PostBody/PostBody";
import LoadingComp from "../LoadingComp/LoadingComp";
import "./postsctn.css";
import FailureComp from "../FailureComp/FailureComp";

function PostsCtn() {
  const allPosts = useSelector(state => state.postblog?.posts);
  const failureState = useSelector(state => state.failure?.type === "CONTENT");

  if (failureState) {
    return(
      <FailureComp />
    )
  }
  
  if (!allPosts) {
    return (
      <LoadingComp />
    )
  }
  else if (allPosts.length === 0) {
    return (
      <p>No posts</p>
    )
  }
  // console.log(posts);
  // posts = posts.posts;
  // console.log(allPosts);
  return (
    <div className="posts-blogs-ctn">
      { 
        allPosts.map(post => <PostBody key={ post.p_id } post={ post } />) 
      }
    </div>
    // <PostBody />
  )
}

export default PostsCtn;