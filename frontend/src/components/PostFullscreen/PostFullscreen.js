import React, { useEffect, useState } from 'react';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import "./postfullscreen.css";
import { removeFSData } from '../../reducers/fullScreenReducer';
import { getPost } from '../../services/contentService';
import LoadingComp from '../LoadingComp/LoadingComp';
import Profile from '../Profile/Profile';
import PostDetails from "../PostDetails/PostDetails";
import FailureComp from "../FailureComp/FailureComp";
import { setFailure } from '../../reducers/failureReducer';

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
    const failure = useSelector(state => state.failure?.type === "ONLY_POST");
    // console.log(failure);

    function handleCloseFullscreen() {
        history.goBack();
        dispatch(removeFSData());
    };

    useEffect(() => {

        if (onlyPost) {
            const postId = params.postId;
            console.log("Param PostId", postId);
            getPost(postId)
                .then(resPost => setSinglePost(resPost))
                .catch(err => {
                    console.error(err);
                    dispatch(setFailure("ONLY_POST"));
                });
        }
    }, []);
    // console.log(post, singlePost == '');

    if (onlyPost) {

        if (failure) return (
            <div className="only-post-ctn">
                <FailureComp />
            </div>
        )
        
        if (!singlePost) return (
            <div className="only-post-ctn">
                <LoadingComp />
            </div>
        );

        return (
            <div className="only-post-ctn">
                <div className="flscrn-post-ctn flscrn-post-ctn__dsk-ctn">
                { 
                    singlePost.p_pics
                    && <MediaCarousel 
                        style={{ margin: "0 auto" }} 
                        className="flscrn-post-ctn__left-ctn" 
                        postId={ singlePost.p_id } 
                        postImages={ singlePost.p_pics } 
                        fullscreen={true}/>
                }

                    <div className="flscrn-post-ctn__right-ctn">
                        <Profile name={ singlePost.name } 
                        username={ singlePost.username } 
                        profImgSrc={ singlePost.imgloc } 
                        singlePostUid={ singlePost.u_id } 
                        friends={ singlePost.friends } />

                        <div className="flscrn-post-ctn__right-ctn__text-ctn">
                            <p className="flscrn-post-ctn__right-ctn__text-ctn__text">
                                { singlePost.text }
                            </p>
                        </div>

                        <PostDetails 
                        postUid={ singlePost.u_id } 
                        postId={ singlePost.p_id } 
                        likes={ singlePost.likes } 
                        liked={ singlePost.liked } 
                        noComments={ singlePost.no_comments } 
                        inFlscrn={ true }/>
                    </div>
                </div>

                <div className="flscrn-post-ctn flscrn-post-ctn__mob-ctn">
                    <Profile name={ singlePost.name } 
                        username={ singlePost.username } 
                        profImgSrc={ singlePost.imgloc } 
                        singlePostUid={ singlePost.u_id } 
                        friends={ singlePost.friends } />

                    <div className="flscrn-post-ctn__right-ctn__text-ctn">
                        <p className="flscrn-post-ctn__right-ctn__text-ctn__text">
                            { singlePost.text }
                        </p>
                    </div>

                { 
                    singlePost.p_pics.length > 0
                    && <MediaCarousel 
                        style={{ margin: "0 auto" }} 
                        className="flscrn-post-ctn__left-ctn" 
                        postId={ singlePost.p_id } 
                        postImages={ singlePost.p_pics } 
                        fullscreen={true}
                        inMob={true}/>
                }

                    <div className="flscrn-post-ctn__right-ctn">
                    
                        <PostDetails 
                        postUid={ singlePost.u_id } 
                        postId={ singlePost.p_id } 
                        likes={ singlePost.likes } 
                        liked={ singlePost.liked } 
                        noComments={ singlePost.no_comments } 
                        inFlscrn={ true }/>
                    </div>
                </div>
            </div>
        )
    }

    if (!post) {
        // console.log("in !post");
        // if (failure) {
        //     return (
        //         <div className="flscrn-post-ctn">
        //         <FailureComp />
        //     </div>
        //     )  
        // }

        return (

            <div className="flscrn-post-ctn">
                <div className="flscrn-post-ctn__left-ctn">
                    <LoadingComp />
                </div>

                <div className="flscrn-post-ctn__right-ctn">

                    <div className="flscrn-post-ctn__right-ctn__text-ctn">
                            <LoadingComp mini={ true }/>
                    </div>
                </div>
                
            </div>
        )
    };

    return (
            <div className="flscrn-post-ctn">
                { 
                    post.p_pics 
                    && <MediaCarousel 
                        className="flscrn-post-ctn__left-ctn" 
                        postId={ post.p_id } 
                        postImages={ post.p_pics } 
                        fullscreen={true}/>
                }

                <div className="flscrn-post-ctn__right-ctn">
                    <Profile 
                    name={ post.name } 
                    username={ post.username } 
                    profImgSrc={ post.imgloc } 
                    postUid={ post.u_id } 
                    friends={ post.friends } />

                    <div className="flscrn-post-ctn__right-ctn__text-ctn">
                        <p className="flscrn-post-ctn__right-ctn__text-ctn__text">
                            { post.text }
                        </p>
                    </div>

                    <PostDetails 
                    postUid={ post.u_id } 
                    postId={ post.p_id } 
                    likes={ post.likes } 
                    liked={ post.liked } 
                    noComments={ post.no_comments } 
                    inFlscrn={ true }/>
                </div>
                
            </div>
    )
}

export default PostFullscreen;