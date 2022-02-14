import React from 'react';
import "./postcontent.css"

function PostContent() {
  return (
    <div className="post-content-ctn">
        { true && <p>This is a test post. Filled with dummy text. This is a test post. Filled with dummy text.</p> }
    </div>
  );
}

export default PostContent;
