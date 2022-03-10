/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import "./mediaCarousel.css";

function MediaCarousel({ postId, postImages }) {
    const [imgCtnWidth, setImgCtnWidth] = useState(null);
    const [fullScrn, setFullScrn] = useState(false);
    const [imgPosInx, setImgPosInx] = useState([]);

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

    function slideRight() {
        if (imgPosInx[0] > -1 * (imgPosInx.length - 1)) setImgPosInx(imgPosInx.map(imgPos => imgPos - 1));
    };

    function slideLeft() {
        if (imgPosInx[0] !== 0) setImgPosInx(imgPosInx.map(imgPos => imgPos + 1));
    };

    function screenSwitch() {
        const pstCntntCtn = document.getElementById(`pst-cntnt-ctn-${postId}`);

        if (fullScrn) {
            pstCntntCtn.style.position = "static";
        } else {
            pstCntntCtn.style.position = "relative";
        };
        setFullScrn(!fullScrn)
    }

    if (fullScrn) {
        return (
            <div className="fullscrn-images-ctn">

                <button onClick={screenSwitch}>
                    <img src="/close-icon.svg" alt="Close fullscreen"></img>
                </button>

                <div className="post-images-ctn">
                    <button style={{ display: imgPosInx[0] !== 0 ? "block": "none" }}
                    onClick={ slideLeft }>
                        <img src="/left-chevon.svg" alt="View left image"></img>
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
        <div onClick={screenSwitch} style={{ height: imgCtnWidth }} className="post-images-ctn">

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