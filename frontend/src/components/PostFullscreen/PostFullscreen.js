import React, { useEffect } from 'react';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import { useDispatch } from 'react-redux';
import "./postfullscreen.css";
import { removeFSData } from '../../reducers/fullScreenReducer';

function PostFullscreen({ post }) {
    // const [flscrnPostWidth, setFlscrnPostWidth] = useState(null);
    // const [leftCtnWidth, setLeftCtnWidth] = useState(null);
    // const [rightCtnWidth, setRightCtnWidth] = useState(null);

    // useEffect(() => {
    //     console.log("started");
    //     // setFlscrnPostWidth(leftCtnWidth + rightCtnWidth);

    //     window.addEventListener("resize", () => {
    //         const leftCtn = document.querySelector(".flscrn-post-ctn__left-ctn");
    //         const rightCtn = document.querySelector(".flscrn-post-ctn__right-ctn");
    //         setLeftCtnWidth(leftCtn.offsetWidth);
    //         setRightCtnWidth(rightCtn.offsetWidth);
    
    //         console.log(leftCtn.offsetWidth, rightCtn.offsetWidth);
    //         setFlscrnPostWidth(leftCtnWidth + rightCtnWidth);
    //     });

    // }, []);
    const dispatch = useDispatch();

    function handleCloseFullscreen() {
        dispatch(removeFSData());
    };

    useEffect(() => {
        function onEscPress(e) {
            if (e.key === "Escape") {
                handleCloseFullscreen();
            };
        };

        document.addEventListener("keydown", onEscPress);

        return () => {
            document.removeEventListener("keydown", onEscPress);
        };
        
    }, []);

    return (
        <div className="flscrn-post-ctn-bg">
            <div className="flscrn-post-ctn">
                { 
                    post.p_pics && <MediaCarousel className="flscrn-post-ctn__left-ctn" postId={ post.p_id } postImages={ post.p_pics } fullscreen={true}/>
                }

                {
                    post.text && <div className="flscrn-post-ctn__right-ctn">
                        <div className="flscrn-post-ctn__right-ctn__text-ctn">
                            <p className="flscrn-post-ctn__right-ctn__text-ctn__text">
                                { post.text }
                            </p>
                        </div>
                    </div>
                }
            </div>

            <img className="close-post-flscrn" src="/close-icon.svg" alt="Close" onClick={ handleCloseFullscreen } />
        </div>
    )
}

export default PostFullscreen;