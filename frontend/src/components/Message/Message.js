import React, { useEffect, memo } from 'react';
// import { useSelector } from 'react-redux';
import "./message.css";



function Message({ message, uId }) {
    return (
        <div 
        className={`msg-ctn ${ message.u_id_from === uId ? 
        "sent-msg" : "rcvd-msg" }`}>
            <p>
                {
                    message.msg_text
                }
            </p>
            <p>
                {
                    message.time
                }
            </p>
        </div>
    )
}

export default memo(Message);


    //const msgTimeDetails = new Date(message.date).toLocaleString("default", { dateStyle: "full" }); // msgTimeDetails format is Saturday, 12 April, 2022
    //console.log("msgTimeDetails", msgTimeDetails);
    //console.log(msgTimeDetails.split(" ").slice(1)); //extracting time as 12 April, 2022
    
    // let date;
    // let msgTime = new Date(message.date).toUTCString().split(" ")[4]

    // date = msgTime.split(":")
    // // if (parseInt(date[0]) > 12) {
    // //     date[0] = (parseInt(date[0]) - 12).toString();
    // //     date = (date[0] + ":" + date[1])
    // // };
    // //const msgDate = new Date(message.date).toUTCString().split(" ").slice(1, 4)
    // //console.log(msgDate.join(" "));

    // const msgDate = msgTimeDetails.split(" ").slice(1);
    
    // useEffect(() => {
    //     if (chatSectionDateRef.current !== msgDate.join("  ")) {
    //         setChatSectionDate({ date: msgDate.join(" "), display: 
    //         true });
    //         chatSectionDateRef.current = msgDate.join(" ");
    //         //chatSectionDate.current = { date: msgDate.join(" "), display: true }
    //         //console.log("true", chatSectionDate, msgDate.join(" "));
    //     }
    //     else {
    //         setChatSectionDate({ ...chatSectionDate.date, display: false });
    //         //chatSectionDate.current = { ...chatSectionDate.current, display: false }
    //         console.log("false");
    //     }
    //     // console.log(new Date(message.date).toLocaleDateString("default", { dateStyle: "full"}).split(" "));
    // }, []);
