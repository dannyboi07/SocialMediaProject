/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import "./mediaCarousel.css";

function MediaCarousel({ postId, postImages }) {
    const [imgCtnWidth, setImgCtnWidth] = useState(null);
    const [fullScrn, setFullScrn] = useState(false);
    const [imgPosInx, setImgPosInx] = useState([]);
    const [curImageDims, setCurImgDims] = useState([]);

    useEffect(() => {
        const imgCtn = document.querySelector(".post-images-ctn");
        setImgCtnWidth(imgCtn.offsetWidth);

        if (postImages) {
            let tempArr = [];
            for (let i = 0; i < postImages.length; i++) {
                tempArr.push(i);
            };
            setImgPosInx([...tempArr]);
        };

        function windowResizeListen() {
            setImgCtnWidth(imgCtn.offsetWidth);
        };

        window.addEventListener("resize", windowResizeListen);
    }, []);

    useEffect(() => {
        if (fullScrn && postImages) {
            const listOfImages = document.getElementById(`pst-imgs-ctn-${postId}`).querySelectorAll(".post-content-img");
            console.log(listOfImages, imgPosInx.indexOf(0));
            const curImg = Array.from(listOfImages)[imgPosInx.indexOf(0)];
            setCurImgDims([curImg.naturalWidth, curImg.naturalHeight]);
        }
    }, [fullScrn, imgPosInx]);

    function slideRight() {
        if (imgPosInx[0] > -1 * (imgPosInx.length - 1)) setImgPosInx(imgPosInx.map(imgPos => imgPos - 1));
    };

    function slideLeft() {
        if (imgPosInx[0] !== 0) setImgPosInx(imgPosInx.map(imgPos => imgPos + 1));
    };

    function screenSwitch() {
        const pstCntntCtn = document.getElementById(`pst-cntnt-ctn-${postId}`);
        const body = document.querySelector("body");

        if (!fullScrn) {
            pstCntntCtn.style.position = "static";
            // body.style.position = "relative";
        } else {
            pstCntntCtn.style.position = "relative";
            // body.style = undefined
        };
        setFullScrn(!fullScrn)
    }

    if (fullScrn) {
        return (
            <div className="fullscrn-images-ctn">

                <button onClick={screenSwitch}>
                    <img src="/close-icon.svg" alt="Close fullscreen"></img>
                </button>

                <div id={`pst-imgs-ctn-${postId}`} className="post-images-ctn post-images-ctn--flscrn" style={{ width: curImageDims[0], height: curImageDims[1] }}>
                    <button style={{ display: imgPosInx[0] !== 0 ? "block": "none" }}
                    onClick={ slideLeft }>
                        <img src="/left-chevron.svg" alt="View left image"></img>
                    </button>

                    { postImages.map((postImage, i) => <img key={i} id={`post-img-${postId}-${i}`} style={{ left: imgCtnWidth * imgPosInx[i] }} className="post-content-img" src={postImage} alt={`Post image ${i+1}`}/>) 
                    }

                    <button style={{ display: imgPosInx[0] > -1 * (imgPosInx.length - 1) ? "block" : "none" }} 
                    onClick={slideRight}>
                    <img src="/right-chevron.svg" alt="View right image"></img>
                    </button>

                </div>
            </div>
        )
    };



    return (
        <div style={{ height: imgCtnWidth }} className="post-images-ctn">

            <button style={{ display: imgPosInx[0] !== 0 ? "block": "none" }}
            onClick={ slideLeft }>
                <img src="/left-chevron.svg" alt="View left image"></img>
            </button>

            { postImages.map((postImage, i) => <img key={i} id={`post-img-${postId}-${i}`} style={{ left: imgCtnWidth * imgPosInx[i] }} className="post-content-img" src={postImage} alt={`Post image ${i+1}`}/>) 
            }

            <button style={{ display: imgPosInx[0] > -1 * (imgPosInx.length - 1) ? "block" : "none" }} 
            onClick={slideRight}>
              <img src="/right-chevron.svg" alt="View right image"></img>
            </button>
        </div>
    )
}

export default MediaCarousel