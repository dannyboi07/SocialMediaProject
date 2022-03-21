import React from 'react';
import { Link } from 'react-router-dom';
import "./profile.css";

function Profile({ name, username, profImgSrc }) {
  // const history = useHistory();

  // function handleUsernameClick() {
  //   history.push(`/users/${username}`);
  // };

  return (
    <div className="profile-ctn">
        <div className="prof-img-ctn">
            <img src={profImgSrc} alt="Profile"/>
        </div>
        <div className="prof-details-ctn">
            <p>{ name }</p>
            <Link to={`/users/${username}`}>@{ username }</Link>
            {/* <p className="username" onClick={handleUsernameClick}>@{ username }</p> */}
        </div>
    </div>
  );
};

export default Profile;
