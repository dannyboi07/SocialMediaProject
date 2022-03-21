import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from './components/Navbar/Navbar';
import "./App.css";
import { initializeUser } from "./reducers/userReducer";
import { getAll } from './reducers/postblogReducer';
import Home from "./components/Home/Home";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import UserProfile from "./components/UserProfile/UserProfile";
import PostFullscreen from "./components/PostFullscreen/PostFullscreen";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = JSON.parse(window.localStorage.getItem("socialMediaAppUser"));
    dispatch(getAll());

    if (userDetails) dispatch(initializeUser(userDetails));
  }, [dispatch]);
  const user = useSelector(state => state.user);

  const fullscreenData = useSelector(state => state.fullscreenData);
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
      { fullscreenData && <PostFullscreen post={ fullscreenData }/> }
      <Switch>
        <Route path="/users/:username">
          <UserProfile/>
        </Route>

        <Route exact path="/post/:postId">
          <PostFullscreen onlyPost={true} />
        </Route>
        
        <Route path="/createPost">
          { user ? <CreatePost /> : <Redirect to="/login" /> }
        </Route>
        <Route path="/register">
          { user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route path="/login">
          { user ? <Redirect to="/home"/> : <Login />}
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
