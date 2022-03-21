import React from 'react';
import { Link } from 'react-router-dom';
import "./createToolsCtn.css"

function CreateToolsCtn() {
  return (
    <div className="createToolsCtn">
      <Link className="crtPstLnk" to="/createPost">Create your post</Link>
      <Link className="crtBlgLnk" to="/createBlog">Create your blog</Link>
    </div>
  )
}

export default CreateToolsCtn;