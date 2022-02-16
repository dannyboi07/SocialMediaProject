import React from 'react';
import "./postcontent.css"

function PostContent({ content }) {
  return (
    <div className="post-content-ctn">
        <p>{ content }</p>
    </div>
  );
}

export default PostContent;
