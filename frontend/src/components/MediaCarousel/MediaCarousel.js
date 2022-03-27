/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react';

import "./mediaCarousel.css";

function MediaCarousel({ postId, postImages, fullscreen = false, className, handleFsClick }) {

    const [imgCtnWidth, setImgCtnWidth] = useState(null);
    const [imgPosInx, setImgPosInx] = useState([]);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    function slideRight(e) {
        if (e) e.stopPropagation();
        if (imgPosInx[0] > -1 * (imgPosInx.length - 1)) { 
            setImgPosInx(imgPosInx.map(imgPos => imgPos - 1))
        } else {
            console.log("else slideright", imgPosInx);
        };
    };

    function slideLeft(e) {
        if (e) e.stopPropagation();
        if (imgPosInx[0] !== 0) { 
            setImgPosInx(imgPosInx.map(imgPos => imgPos + 1))
        } else {
            console.log("else slideleft", imgPosInx);
        };
    };

    function handleSwipe() {
        console.log(touchStartX.current, touchEndX.current);
        if (((touchStartX.current - touchEndX.current) > 75) && (touchEndX.current < touchStartX.current)) slideRight();
        if (((touchEndX.current - touchStartX.current) > 75) && (touchEndX.current > touchStartX.current)) slideLeft();
    };

    useEffect(() => {

        if (postImages) {
            let tempArr = [];
            for (let i = 0; i < postImages.length; i++) {
                tempArr.push(i);
            };
            setImgPosInx([...tempArr]);
        };
                
        const imgCtn = fullscreen 
        ? document.querySelector(".flscrn-post-ctn__left-ctn")
        : document.querySelector(".post-images-ctn");
        setImgCtnWidth(imgCtn.offsetWidth);

        function windowResizeListen() {
            setImgCtnWidth(imgCtn.offsetWidth);
        };
        window.addEventListener("resize", windowResizeListen);

        return () => window.removeEventListener("resize", windowResizeListen);
        
    }, []);

    useEffect(() => {

        if (fullscreen) {
            function goLeftRightKey(e) {
                if (e.key === "ArrowRight") {
                    slideRight(e);
                } else if (e.key === "ArrowLeft") {
                    slideLeft(e);
                };
            };
            document.addEventListener("keydown", goLeftRightKey);
    
            return () => document.removeEventListener("keydown", goLeftRightKey);
        }
    }, [imgPosInx]);

    return (
        <div onClick={ handleFsClick } 
        style={{ height: fullscreen ? null : imgCtnWidth }} 
        className={ fullscreen ? `post-images-ctn ${className}` : "post-images-ctn"} 
        onTouchStart={e => touchStartX.current = e.changedTouches[0].screenX}
        onTouchEnd={e => {
            touchEndX.current = e.changedTouches[0].screenX;
            handleSwipe();
        }}>

            <button className="sld-lft-btn" style={{ display: imgPosInx[0] !== 0 && window.screen.width > 768 ? "block": "none" }}
            onClick={ slideLeft }>
                <img src="/left-chevron.svg" alt="View left image"></img>
            </button>

            { postImages.map((postImage, i) => <img key={i} id={`post-img-${postId}-${i}`} style={{ left: imgCtnWidth * imgPosInx[i] }} className="post-content-img" src={postImage} alt={`Post image ${i+1}`}/>) 
            }

            <button className="sld-rgt-btn" style={{ display: imgPosInx[0] > -1 * (imgPosInx.length - 1) && window.screen.width > 768 ? "block" : "none" }} 
            onClick={slideRight}>
              <img src="/right-chevron.svg" alt="View right image"></img>
            </button>
        </div>
    );
};

export default MediaCarousel;

// const [fullScrn, setFullScrn] = useState(false);
// const [curImageDims, setCurImgDims] = useState([]);

// useEffect(() => {
//     if (fullscreen && postImages) {
//         const listOfImages = document.getElementById(`pst-imgs-ctn-${postId}`).querySelectorAll(`.post-content-img ${className}`);
//         // console.log(listOfImages, imgPosInx.indexOf(0));
//         const curImg = Array.from(listOfImages)[imgPosInx.indexOf(0)];
//         setCurImgDims([curImg.naturalWidth, curImg.naturalHeight]);
//     }
// }, [fullscreen, imgPosInx]);

// function screenSwitch() {
//     const pstCntntCtn = document.getElementById(`pst-cntnt-ctn-${postId}`);
//     const body = document.querySelector("body");

//     if (!fullScrn) {
//         pstCntntCtn.style.position = "static";
//         // body.style.position = "relative";
//     } else {
//         pstCntntCtn.style.position = "relative";
//         // body.style = undefined
//     };
//     setFullScrn(!fullScrn)
// }

// if (fullScrn) {
//     return (
//         <div className="fullscrn-images-ctn">

//             <button onClick={screenSwitch}>
//                 <img src="/close-icon.svg" alt="Close fullscreen"></img>
//             </button>

//             <div id={`pst-imgs-ctn-${postId}`} className="post-images-ctn post-images-ctn--flscrn" style={{ width: curImageDims[0], height: curImageDims[1] }}>
//                 <button style={{ display: imgPosInx[0] !== 0 ? "block": "none" }}
//                 onClick={ slideLeft }>
//                     <img src="/left-chevron.svg" alt="View left image"></img>
//                 </button>

//                 { postImages.map((postImage, i) => <img key={i} id={`post-img-${postId}-${i}`} style={{ left: imgCtnWidth * imgPosInx[i] }} className="post-content-img" src={postImage} alt={`Post image ${i+1}`}/>) 
//                 }

//                 <button style={{ display: imgPosInx[0] > -1 * (imgPosInx.length - 1) ? "block" : "none" }} 
//                 onClick={slideRight}>
//                 <img src="/right-chevron.svg" alt="View right image"></img>
//                 </button>

//             </div>
//         </div>
//     )
// };