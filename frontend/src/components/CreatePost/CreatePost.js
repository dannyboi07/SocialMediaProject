import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendPost } from '../../reducers/postblogReducer';
import "./createPost.css"

function CreatePost() {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.user.token);
  const [postText, setPostText] = useState("");
  const [postImages, setPostImages] = useState();
  let tx = null;

  useEffect(() => {
    tx = document.querySelector(".crtPstTxt");
    tx.setAttribute("style", "height:1.8em;overflow-y:hidden;");
    tx.addEventListener("input", OnInput, false);

    return () => tx.removeEventListener("input", OnInput);
  }, []);

  function OnInput() {
    this.style.height = "1.75em";
    this.style.height = this.scrollHeight + "px";
  };

  function handleSubmit(e) {
    e.preventDefault();

    const postContent = new FormData();
    postContent.append("postText", postText);

    Array.from(postImages).forEach(postImage => {
      postContent.append("photos", postImage);
    });

    dispatch(sendPost(postContent, userToken));
  }

  // useEffect(() => {
  //   console.log(tx.scrollHeight);
  // }, [postText]);

  return (
    <div className="crtPst">
     <form id="new-post-form" onSubmit={(e) => handleSubmit(e)}
      encType="multipart/form-data">

      <textarea className="crtPstTxt" type="text" 
          name="post-text" 
          onChange={(e) => setPostText(e.target.value)} 
          value={postText}
          placeholder="What's on your mind?"
          required
        ></textarea>

        <label className="crtPstLbl" htmlFor="upld-pst">
          the photos you want to upload

          <input id="upld-pst" type="file" name="photos" 
            accept=".jpg,.jpeg,.png,.gif" 
            onChange={(e) => setPostImages(e.target.files)} multiple
          /> 
        </label>

        <button type="submit">
          Post
        </button>
     </form>
    </div>
  )
}

export default CreatePost;