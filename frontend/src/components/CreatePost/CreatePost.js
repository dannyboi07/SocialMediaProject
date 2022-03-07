import React, { useState, useEffect } from 'react';
import "./createPost.css"

function CreatePost() {
  const [postText, setPostText] = useState("");
  let tx = null;

  useEffect(() => {
    tx = document.querySelector(".crtPstTxt");
    tx.setAttribute("style", "height:1.75em;overflow-y:hidden;");
    tx.addEventListener("input", OnInput, false);
  }, []);

  

  function OnInput() {
    this.style.height = "1.75em";
    this.style.height = this.scrollHeight + "px";
  };

  // useEffect(() => {
  //   console.log(tx.scrollHeight);
  // }, [postText]);

  return (
    <div className="crtPst">
      <textarea className="crtPstTxt" type="text" 
        name="post-text" 
        onChange={(e) => setPostText(e.target.value)} 
        value={postText}
        placeholder="What's on your mind?"
        required
      ></textarea>

      <label className="crtPstLbl" htmlFor="upld-pst">
       the photos you want to upload
      </label>

      <input id="upld-pst" type="file" name="photos"/> 
    </div>
  )
}

export default CreatePost