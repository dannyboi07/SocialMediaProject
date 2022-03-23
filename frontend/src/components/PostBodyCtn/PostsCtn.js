import React from "react";
import { useSelector } from "react-redux";
import PostBody from "../PostBody/PostBody";
import LoadingComp from "../LoadingComp/LoadingComp";

function PostsCtn() {
  let posts = useSelector(state => state.postblog);
  
  if (posts === null) {
    // console.log(123)
    return (
      <LoadingComp />
    )
  }
  // console.log(posts);
  posts = posts.posts;
  // console.log(posts);
  return (
    <div className="posts-blogs-ctn">
      { 
        posts.map(post => <PostBody key={ post.p_id } post={ post } />) 
      }
    </div>
    // <PostBody />
  )
}

export default PostsCtn;