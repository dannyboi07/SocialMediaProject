import React, { useState, useEffect } from 'react';
import "./postcontent.css"

function PostContent({ postId, postText, postImages }) {
  const [imgCtnWidth, setImgCtnWidth] = useState(null);
  // const [curImage, setCurImage] = useState(null);
  const [imgPosInx, setImgPosInx] = useState([]);

  let imgCtn = null;

  useEffect(() => {
    imgCtn = document.querySelector(".post-images-ctn");
    setImgCtnWidth(imgCtn.offsetWidth);
    // setCurImage(document.getElementById(`post-img-${postId}-0`));

    if (postImages) {
      let tempArr = [];
      for (let i = 0; i < postImages.length; i++) {
        tempArr.push(i);
      };
      setImgPosInx([...tempArr]);
    };

    window.addEventListener("resize", () => {
      setImgCtnWidth(imgCtn.offsetWidth);
    })
  }, []);

  function slideRight() {
    if (imgPosInx[0] > -1 * (imgPosInx.length - 1)) setImgPosInx(imgPosInx.map(imgPos => imgPos - 1));
  }

  function slideLeft() {
    if (imgPosInx[0] !== 0) setImgPosInx(imgPosInx.map(imgPos => imgPos + 1));
  }

  return (
    <div className="post-content-ctn">
        <p>
          { postText }
        </p>
        { postImages && <div style={{ height: imgCtnWidth }} className="post-images-ctn">

            <button style={{ display: imgPosInx[0] !== 0 ? "block" : "none" }} 
            onClick={slideLeft}>
              <img src="/left-chevron.svg" alt="View left image"></img>
            </button>

            { postImages.map((postImage, i) => <img key={i} id={`post-img-${postId}-${i}`} style={{ left: imgCtnWidth * imgPosInx[i] }} className="post-content-img" src={postImage} alt={`Post image ${i+1}`}/>) 
            }

            <button style={{ display: imgPosInx[0] > -1 * (imgPosInx.length - 1) ? "block" : "none" }} 
            onClick={slideRight}>
              <img src="/right-chevron.svg" alt="View right image"></img>
            </button>

          </div> }
    </div>
  );
}

export default PostContent;
