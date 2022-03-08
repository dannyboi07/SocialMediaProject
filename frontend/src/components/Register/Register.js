import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { dispatchRegister } from '../../reducers/userReducer';
import "./register.css";

function Register() {
  const [profileimg, setProfileimg] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    URL.revokeObjectURL(profileimg);

    const regForm = document.getElementById("register-form");
    if (profileimg) {regForm.classList.add("form-modify")}
    else {regForm.classList.remove("form-modify")};

  }, [profileimg])

  function handleSubmit(e) {
    e.preventDefault();

    const imgFileName = document.getElementById("prof-img").value;
    const dotIdx = imgFileName.lastIndexOf(".") + 1;
    const fileExt = imgFileName.substring(dotIdx, imgFileName.length).toLowerCase();
    if (fileExt !== "jpg" && fileExt !== "jpeg" && fileExt !== "png") {
      window.alert("Profile image must be either of type .jpg, .jpeg, or .png");
      return;
    };

    const data = new FormData();
    data.append("profileimg", profileimg);
    data.append("name", name);
    data.append("username", username);
    data.append("password", password);
    console.log("data", data);

    // const userDetails = { name, username, password, data };
    dispatch(dispatchRegister(data));
  }

  function handleProfChange(e) {
    // console.log(e.target.files[0]);
    setProfileimg(e.target.files[0]);
  }

  return (
    <div className="register-ctn">
      <form id="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="img-upload-ctn">
          Upload a profile image: { !profileimg && <span>(A default will be chosen if not uploaded)</span> }
          { profileimg && <div className="pre-profimg-ctn">
            <img className="pre-profimg" src={URL.createObjectURL(profileimg)} alt="Profile"/>
          </div> }

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


// const [testing, setTesting] = useState(null);

// function testOnSubmit(e) {
//   e.preventDefault();
//   const data = new FormData();
//   data.append("testimg", testing);

//   fetch("http://localhost:3500/api/register/test", {
//     method: "POST",
//     body: data
//   }).then(res => console.log(res))
//   .catch(err => console.error(err));
// }
/* <form onSubmit={testOnSubmit}>
<input type="file" name="testimg" onChange={(e) => setTesting(e.target.files[0])}/>
<button type="submit">Submit</button>
</form> */