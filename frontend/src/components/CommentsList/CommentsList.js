import React from 'react';
import Comment from '../Comment/Comment';
import LoadingComp from "../LoadingComp/LoadingComp";
import "./commentslist.css"

function CommentsList({ postId, commentsData, comsState, commListRef, inFlscrn }) {
    
    if (!commentsData) {
        return (
            <div id={`comms${postId}`} className={`comments-list-ctn ${inFlscrn ? "cmt-lst-ctn--mdfy" : "" }`} style={ comsState } ref={ commListRef }>
                <LoadingComp mini={true}/>
            </div>
        )
    }

    if (commentsData.length === 0) {
        return (
            <div id={`comms${postId}`} className={`comments-list-ctn ${inFlscrn ? "cmt-lst-ctn--mdfy" : "" }`} style={ comsState } ref={ commListRef }>
                <div className="no-cms-ctn">
                    <p>
                        No Comments
                    </p>
                </div>
            </div>
        )
    };

    return (
        <div id={`comms${postId}`} className={`comments-list-ctn ${inFlscrn ? "cmt-lst-ctn--mdfy" : "" }`} style={ comsState } ref={ commListRef }>
            {
                commentsData.map(commentData => <Comment key={ commentData.comment_id } commentData={ commentData }/>)
            }
        </div>
    )
}

export default CommentsList