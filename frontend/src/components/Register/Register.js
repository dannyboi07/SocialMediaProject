import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { dispatchRegister } from '../../reducers/userReducer';
import "./register.css"

function Register() {
  const [profileimg, setProfileimg] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    const imgFileName = document.getElementById("prof-img").value;
    const dotIdx = imgFileName.lastIndexOf(".") + 1;
    const fileExt = imgFileName.substring(dotIdx, imgFileName.length).toLowerCase();
    if (fileExt !== "jpg" && fileExt !== "jpeg" && fileExt !== "png") {
      console.log(fileExt === "jpeg");
      window.alert("Profile image must be either of type .jpg, .jpeg, or .png");
      return;
    };

    const data = new FormData();
    data.append("profileimg", profileimg);
    console.log(profileimg, "data", data.get("profileimg"));

    const userDetails = { name, username, password, data };
    dispatch(dispatchRegister(userDetails))
  }

  function handleProfChange(e) {
    console.log(e.target.files[0]);
    setProfileimg(e.target.files[0]);
  }

  return (
    <div className="register-ctn">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="img-upload-ctn">
          Upload a profile image:
          <input id="prof-img" type="file" name="profileimg" accept='.jpg,.jpeg,.png' onChange={(e) => handleProfChange(e)}/>
        </label>
        <label>

          Name: <input type="text" name='name' onChange={(e) => setName(e.target.value)}/>
        </label>

        <label>
          Username: <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
        </label>

        <label>
          Password: <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
