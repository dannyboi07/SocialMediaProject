import React from "react";
import { useSelector } from "react-redux";
import PostBody from "../PostBody/PostBody";

function PostsCtn() {
  let posts = useSelector(state => state.postblog);
  // console.log("posts", posts);
  
  if (posts === null) {
    // console.log(123)
    return (
      <>
        Loading posts
      </>
    )
  }

  posts = posts.posts;
  console.log(posts);
  return (
    <>
      { 
        posts.map(post => <PostBody key={ post.p_id } post={ post } />) 
      }
    </>
    // <PostBody />
  )
}

export default PostsCtn;