import React from 'react';
import { useSelector } from 'react-redux';
import PostBody from '../PostBody/PostBody';
import "./home.css"

function Home() {
  const contentState = useSelector(state => postblog.state);
  
  return (
    <div>
      { contentState.map(content => {
      if (contentgnthnht5ju)}) }
      <PostBody />
    </div>
  );
}

export default Home;
