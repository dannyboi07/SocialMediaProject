/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import "./postcontent.css"

function PostContent({ postId, postText, postImages }) {
  // const [imgCtnWidth, setImgCtnWidth] = useState(null);
  // // const [curImage, setCurImage] = useState(null);
  // const [imgPosInx, setImgPosInx] = useState([]);

  // let imgCtn = null;

  // useEffect(() => {
  //   imgCtn = document.querySelector(".post-images-ctn");
  //   setImgCtnWidth(imgCtn.offsetWidth);
  //   // setCurImage(document.getElementById(`post-img-${postId}-0`));

  //   if (postImages) {
  //     let tempArr = [];
  //     for (let i = 0; i < postImages.length; i++) {
  //       tempArr.push(i);
  //     };
  //     setImgPosInx([...tempArr]);
  //   };

  //   function windowResizeListen() {
  //     // console.log(1);
  //     setImgCtnWidth(imgCtn.offsetWidth);
  //   }

  //   window.addEventListener("resize", windowResizeListen);

  //   return () => window.removeEventListener("resize", windowResizeListen);
  // }, []);

  // function slideRight() {
  //   if (imgPosInx[0] > -1 * (imgPosInx.length - 1)) setImgPosInx(imgPosInx.map(imgPos => imgPos - 1));
  // }

  // function slideLeft() {
  //   if (imgPosInx[0] !== 0) setImgPosInx(imgPosInx.map(imgPos => imgPos + 1));
  // }

  return (
    <div id={`pst-cntnt-ctn-${postId}`} className="post-content-ctn">
        <p>
          { postText }
        </p>
        { postImages && <MediaCarousel postId={postId} postImages={postImages}/> }
    </div>
  );
}

export default PostContent;

// { postImages && <div style={{ height: imgCtnWidth }} className="post-images-ctn">

//             <button style={{ display: imgPosInx[0] !== 0 ? "block" : "none" }} 
//             onClick={slideLeft}>
//               <img src="/left-chevron.svg" alt="View left image"></img>
//             </button>

//             { postImages.map((postImage, i) => <img key={i} id={`post-img-${postId}-${i}`} style={{ left: imgCtnWidth * imgPosInx[i] }} className="post-content-img" src={postImage} alt={`Post image ${i+1}`}/>) 
//             }

//             <button style={{ display: imgPosInx[0] > -1 * (imgPosInx.length - 1) ? "block" : "none" }} 
//             onClick={slideRight}>
//               <img src="/right-chevron.svg" alt="View right image"></img>
//             </button>

//           </div> }