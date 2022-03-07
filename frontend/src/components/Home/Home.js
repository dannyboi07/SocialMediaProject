import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../reducers/postblogReducer';
import PostsCtn from '../PostBodyCtn/PostsCtn';
import CreateToolsCtn from '../createTools/CreateToolsCtn';
import "./home.css"

function Home() {
  const dispatch = useDispatch();
  dispatch(getAll());
  // console.log("dispatched");
  // useEffect(() => {
  //   dispatch(getAll());
  // }, [dispatch]);

  // const contentState = useSelector(state => state.postblog);
  // console.log(contentState);

  return (
    <div className="home-ctn">
      <PostsCtn/>
      <CreateToolsCtn />
    </div>
  );
}

export default Home;
