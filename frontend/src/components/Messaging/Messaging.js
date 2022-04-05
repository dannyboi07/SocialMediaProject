import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { getContacted, getMsgs } from '../../services/messageService';
import { clrMsging, getContactedRdx, getMsgsRdx, postMsgRdx } from '../../reducers/messagingReducer';
// import FriendsCtn from '../FrndsCtn/FriendsCtn';
import Friend from '../Friend/Friend';
import Profile from '../Profile/Profile';
import Message from '../Message/Message';
import "./messaging.css";

function Messaging() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const user = useSelector(state => state.user);

    const messagingState = useSelector(state => state.messaging);
    const [active, setActive] = useState([]);
    const [curChat, setCurChat] = useState(null);
    const [msgInput, setMsgInput] = useState("");

    //console.log(params);
    useEffect(() => {

        dispatch(getContactedRdx(user.token));
        // getContacted(user.token)
        //     .then(res => setContacted(res))
        //     .catch(err => console.error(err));
        return () => dispatch(clrMsging());
    }, []);

    useEffect(() => {

        if (messagingState?.contacted) {
            const temp = [];
            for (let i = 0; i < messagingState?.contacted.length; i++) {
                temp.push(false);
            }
            setActive([ ...temp ]);
        };
    }, [messagingState?.contacted]);

    useEffect(() => {

        if (params.username && curChat?.username !== params.username) {
            if (messagingState?.contacted) {
                // console.log("triggered");
                // activeOnClick(params.username);
                setActive(messagingState?.contacted.map((act, i) => {
                    if (params.username === messagingState?.contacted[i].username) {
                        setCurChat(messagingState?.contacted[i]);
                        dispatch(getMsgsRdx(user.token, messagingState?.contacted[i].u_id));
                        return true;
                    } else {
                        return false;
                    };
                }));
                // if (curChat && curChat !== curChat) {
                    // getMsgs(user.token, curChat.u_id)
                    // .then(res => console.log(res))
                    // .catch(err => console.error(err));
                //};
            }
        } 
        else if (!params.username) {
            setCurChat(null);
        }
    }, [params, messagingState?.contacted, curChat]);

    function handleMsgSubmit() {
        if (msgInput !== "") {
            dispatch(postMsgRdx(user.token, curChat.u_id, msgInput));
            setMsgInput("");
        }
    }

    return (
        <div className="dming-ctn">

            <div className="frnds-ctn">

                <div className="new-chat">
                    <p>
                        New Chat
                    </p>
                </div>
            {
                messagingState?.contacted.map((friend, i) => 
                    <Friend 
                    key={ friend.u_id }
                    active={ active[i] }
                    onClick={ active[i] 
                        ? null
                        : () => history.push(`/messages/${friend.username}`)
                    }
                    username={ friend.username }
                    name={ friend.name }
                    imgloc={ friend.imgloc } />
                )
            }
            </div>

            <div className="dm-ctn">
                {
                    curChat && 
                    <Profile 
                    name={ curChat.name }
                    username={ curChat.username }
                    profImgSrc={ curChat.imgloc }/>
                }
                <div className="dms-ctn">
                    {
                        curChat ? 
                            
                            <>
                                {
                                    messagingState?.messages.map((message, i) => 
                                        i === 0 ? 
                                            <React.Fragment key={message.msg_id}>
                                            {            
                                                <p className="dm-sction-date">
                                                    { message.date }
                                                </p>
                                            }
                                                <Message                                  
                                                uId={ user.uId } 
                                                message={ message }
                                                />
                                            </React.Fragment>

                                        :   messagingState.messages[i-1].date === message.date ?
                                            
                                                <Message 
                                                key={ message.msg_id } 
                                                uId={ user.uId } 
                                                message={ message }
                                                />
                                            
                                            :   <React.Fragment key={message.msg_id}>
                                                {            
                                                    <p className="dm-sction-date">
                                                        { message.date }
                                                    </p>
                                                }
                                                    <Message                                            
                                                    uId={ user.uId } 
                                                    message={ message }
                                                    />
                                                </React.Fragment>
                                    )
                                }
                            </>
                
                        :   <p>Select a chat</p>
                    }
                </div>

                {
                    curChat && 
                    <div className="dm-inpt-ctn">
                        <input 
                        type="text" 
                        name="msg-input"
                        value={ msgInput }
                        onChange={e => setMsgInput(e.target.value)}
                        placeholder="Message..."
                        />
                        <button 
                        className={`send-dm-btn ${msgInput === "" ? "dm-btn-disb" : "" }`}
                        onClick={ handleMsgSubmit }>
                            <img src="/send.svg" alt="send" />
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Messaging;

//const contacted = useSelector(state => state.messaging?.contacted);
//const messages = useSelector(state => state.messaging?.messages);
// const [contacted, setContacted] = useState(null);
// const [chatSectionDate, setChatSectionDate] = useState({ date: null, display: false });
// const chatSectionDate = useRef({ date: null, display: false })
// const [chatDateState, setChatDateState] = useState([]);
// const chatSectionDateRef = useRef(null);

// useEffect(() => {
//     const temp = [];
//     if (messagingState?.messages) {
//         let dateCheck = null;
//         for (let i = 0; i < messagingState.messages.length; i++) {
//             let tempDate = new Date(messagingState.messages[i].date).toLocaleString("default", {
//                 dateStyle: "full"
//             }).split(" ").slice(1).join(" ");
//             if (tempDate !== dateCheck) {
//                 temp.push(tempDate);
//                 dateCheck = tempDate;
//             };
//             //console.log(tempDate, dateCheck);
//         }
//         //console.log(temp);
//         setChatDateState([ ...temp ]);
//     };
    
// }, [messagingState?.messages]);


// messagingState.messages[i].date === message.date ?
                                    
//                                         <Message 
//                                         key={ message.msg_id } 
//                                         uId={ user.uId } 
//                                         message={ message }
//                                         />
                                    
//                                     :   <>
//                                         {            
//                                             <p 
//                                             key={ message.msg_id+1 } 
//                                             className="dm-sction-date">
//                                                 { message.date }
//                                             </p>
//                                         }
//                                             <Message 
//                                             key={ message.msg_id } 
//                                             uId={ user.uId } 
//                                             message={ message }
//                                             />
//                                         </>

/* messagingState?.messages.map((message, i) => 
    <>
        {            
            chatSectionDate.display && 
                <p key={i} className="dm-sction-date">
                    { chatSectionDateRef.current }
                </p>
        }
        <Message 
        key={ message.msg_id } 
        uId={ user.uId } 
        message={ message }
        chatSectionDate={ chatSectionDate }
        setChatSectionDate={ setChatSectionDate }
        chatSectionDateRef={ chatSectionDateRef }
        />
    </>
) */

// chatDateState.map((chatDate, i) => 
//                                 <>
//                                     {             
//                                         <p key={i} className="dm-sction-date">
//                                             { chatDate }
//                                         </p>
//                                     }
//                                     {
//                                         messagingState?.messages.map(message => 
//                                             <Message 
//                                             key={ message.msg_id } 
//                                             uId={ user.uId } 
//                                             message={ message }
//                                             chatSectionDate={ chatSectionDate }
//                                             setChatSectionDate={ setChatSectionDate }
//                                             chatSectionDateRef={ chatSectionDateRef }
//                                             />)
//                                     }
//                                 </>
//                             )

// function activeOnClick(fndUname) {
//     setActive(messagingState?.contacted.map((act, i) => {
//         if (fndUname === messagingState?.contacted[i].username) {
//             setCurChat(messagingState?.contacted[i]);
//             return true;
//         } else {
//             return false;
//         };
//     }));
// };
//console.log(messagingState);

//console.log(messagingState?.messages);