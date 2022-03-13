import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from './components/Navbar/Navbar';
import "./App.css";
import { initializeUser } from "./reducers/userReducer";
import { getAll } from './reducers/postblogReducer';
import Home from "./components/Home/Home";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Switch, Route, Redirect } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = JSON.parse(window.localStorage.getItem("socialMediaAppUser"));
    dispatch(getAll());

    if (userDetails) dispatch(initializeUser(userDetails));
  }, [dispatch]);
  const user = useSelector(state => state.user);
  // console.log(user);

  // const userUrlObj = useRouteMatch({ path: "/users/:username", 
  //   strict: true,
  //   sensitive: true 
  // });
  // let userName = null;  
  // if (userUrlObj) {
  //   userName = useSelector()
  // }

  return (
    <div>
      <Navbar/>
      {/* <WelcomePage /> */}
      <Switch>
        <Route path="/createPost">
          { user ? <CreatePost /> : <Redirect to="/login" /> }
        </Route>
        <Route path="/register">
          { user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route path="/login">
          { user ? <Redirect to="/home"/> : <Login />}
        </Route>

        <Route path="/users/:username">
          <UserProfile/>
        </Route>

        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <div></div>
        </Route>

        {/* { user && <Route path="/register" element={<Home />}/>}
        { user && <Route path="/login" element={<Home />}/>} */}
      </Switch>
    </div>
  );
}

export default App;
