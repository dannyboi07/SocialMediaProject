import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clrPosts, getAll } from '../../reducers/postblogReducer';
import PostsCtn from '../PostBodyCtn/PostsCtn';
// import useIsMount from '../../hooks/useIsMount';
// import CreateToolsCtn from '../createTools/CreateToolsCtn';
import "./home.css"

function Home() {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const isFirstRender = useIsMount();

  useEffect(() => {
    const userDetails = JSON.parse(window.localStorage.getItem("socialMediaAppUser"));
    userDetails ? dispatch(getAll(userDetails.token)) : dispatch(getAll());

    return () => dispatch(clrPosts());
  }, []);

  return (
    <div className="home-ctn">
      <PostsCtn/>
    </div>
  )
}

export default Home;
