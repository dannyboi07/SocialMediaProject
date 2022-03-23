import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAll } from '../../reducers/postblogReducer';
import PostsCtn from '../PostBodyCtn/PostsCtn';
import CreateToolsCtn from '../createTools/CreateToolsCtn';
import "./home.css"

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(getAll());

  useEffect(() => {
    const userDetails = JSON.parse(window.localStorage.getItem("socialMediaAppUser"));
    
    // if (userDetails) {
    //   if (userDetails.notifications === undefined) {
    //     Notification.requestPermission(status => {
    //       // console.log(status);
    //       if (status) {
    //         window.localStorage.setItem("socialMediaAppUser", JSON.stringify({ ...userDetails, notifications: true }))
    //       } else window.localStorage.setItem("socialMediaAppUser", JSON.stringify({ ...userDetails, notifications: false }));
    //     });
    //   }
    //   else if (userDetails.notifications) {
    //     navigator.serviceWorker.getRegistration().then(reg => {
    //       const options = {
    //         body: "Here is a notification body",
    //         icon: "http://localhost:3500/images/profile-pics/profileimg-1644907519746-497892988.jpeg",
    //         vibrate: [100, 50, 100],
    //         data: {
    //           dateOfArrival: Date.now(),
    //           primaryKey: 1
    //         },
    //         // actions: [
    //         //   {
    //         //     action: "close", title: "Close Notification",
    //         //     icon: "/public/close-icon.svg"
    //         //   }
    //         // ]
    //       }
    //       reg.showNotification("Hello World!", options);
    //     });
    //   }
    // }
  }, [])

  // useEffect(() => {
  //   dispatch(getAll());
  //   console.log("dispatched");
  // }, [dispatch]);

  // const contentState = useSelector(state => state.postblog);
  // console.log(contentState);

  return (
    <div className="home-ctn">
      <PostsCtn/>
      {/* <CreateToolsCtn /> */}
    </div>
  );
}

export default Home;
