import React from 'react';
import "./profile.css";

function Profile({ name, username, profImgSrc }) {
  return (
    <div className="profile-ctn">
        <div className="prof-img-ctn">
            <img src={profImgSrc} alt="Profile"/>
        </div>
        <div className="prof-details-ctn">
            <p><a href=''>{ name }</a></p>
            <p><a href=''>{ username }</a></p>
        </div>
    </div>
  );
};

export default Profile;
