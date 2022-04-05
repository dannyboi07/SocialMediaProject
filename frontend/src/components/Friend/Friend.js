import React from 'react';
import "./friend.css";

function Friend({ username, name, imgloc, active, onClick }) {

    return (
        <div 
        className={`frnd-ctn ${active ? "frnd-ctn--active" : "" }`}
        onClick={ onClick }>

            <div className="frnd-left-ctn">
                <img src={ imgloc } alt="contact-img" />
            </div>

            <div className="frnd-rgt-ctn">
                <h5>
                    {
                        name
                    }
                </h5>

                <p>
                    @{
                        username
                    }
                </p>
            </div>
        </div>
    );
};

export default Friend;