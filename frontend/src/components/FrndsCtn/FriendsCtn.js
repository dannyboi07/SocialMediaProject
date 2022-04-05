import React, { useEffect, useState } from 'react';
import Friend from '../Friend/Friend';
import "./friendsctn.css";

function FriendsCtn({ friends }) {
    const [active, setActive] = useState([]);

    useEffect(() => {

        if (friends) {
            const temp = [];
            for (let i = 0; i < friends.length; i++) {
                temp.push(false);
            }
            setActive([ ...temp ]);
        };
    }, [friends]);

    console.log(active);

    function activeOnClick(ind, frndUid) {
        setActive(active.map((act, i) => ind === i ? true : false));

        
    }

    return (
        <div className="frnds-ctn">

            <div className="new-chat">
                <p>
                    New Chat
                </p>
            </div>
            {
                friends?.map((friend, i) => 
                    <Friend 
                    key={ friend.u_id }
                    active={ active[i] }
                    onClick={ () => activeOnClick(i, friend.u_id) }
                    username={ friend.username }
                    name={ friend.name }
                    imgloc={ friend.imgloc } />
                )
            }
        </div>
    );
};

export default FriendsCtn;