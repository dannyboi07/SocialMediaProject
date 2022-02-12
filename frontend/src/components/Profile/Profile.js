import React from 'react';
import "./profile.css";

function Profile() {
  return (
    <div className="profile-ctn">
        <div className="prof-img-ctn">
            <img src="http://localhost:3500/images/profile-pics/avatar-michelle.jpg" alt="Profile"/>
        </div>
        <div className="prof-details-ctn">
            <p><a href=''>Daniel Chettiar</a></p>
            <p><a href=''>@danny</a></p>
        </div>
    </div>
  );
};

export default Profile;
