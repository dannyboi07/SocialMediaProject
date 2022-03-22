import React, { useEffect, useState } from 'react';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import "./postfullscreen.css";
import { removeFSData } from '../../reducers/fullScreenReducer';
import { getPost } from '../../services/contentService';

function PostFullscreen({ post, onlyPost }) {
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
    const history = useHistory();
    const params = useParams();
    const [singlePost, setSinglePost] = useState(null);

    function handleCloseFullscreen() {
        history.goBack();
        dispatch(removeFSData());
    };

    useEffect(() => {

        if (onlyPost) {
            const postId = params.postId;
            console.log("Param PostId", postId);
            getPost(postId).then(resPost => setSinglePost(resPost));
        }
    }, []);

    if (onlyPost) {
        if (!singlePost) return <p>Loading</p>
        return (
            <div className="only-post-ctn">
                <div className="flscrn-post-ctn">
                { 
                    singlePost.p_pics && <MediaCarousel style={{ margin: "0 auto" }} className="flscrn-post-ctn__left-ctn" postId={ singlePost.p_id } postImages={ singlePost.p_pics } fullscreen={true}/>
                }

                {
                    singlePost.text && <div className="flscrn-post-ctn__right-ctn">
                        <div className="flscrn-post-ctn__right-ctn__text-ctn">
                            <p className="flscrn-post-ctn__right-ctn__text-ctn__text">
                                { singlePost.text }
                            </p>
                        </div>
                    </div>
                }
                </div>
            </div>
        )
    }

    return (
        // <div className="flscrn-post-ctn-bg">
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

            //<img className="close-post-flscrn" src="/close-icon.svg" alt="Close" onClick={ handleCloseFullscreen } />
        //</div>
    )
}

export default PostFullscreen;