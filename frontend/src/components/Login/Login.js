import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchLogin } from '../../reducers/userReducer';
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    const userDetails = {
      username, password
    };
    dispatch(dispatchLogin(userDetails));
    setUsername(""); setPassword("");
  };

  return (
    <div className="login-ctn">
      <form onSubmit={handleSubmit}>

        <label>
          Username: <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}/>
        </label>

        <label>
          Password: <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

// const afterLoginDetails = store.getState();

// if (afterLoginDetails.token) window.localStorage.setItem("socialMediaAppUser", JSON.stringify(afterLoginDetails.token));
// console.log(afterLoginDetails, afterLoginDetails.token);
