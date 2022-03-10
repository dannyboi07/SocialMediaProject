import React from 'react';
import { useDispatch } from 'react-redux';
import { getAll } from '../../reducers/postblogReducer';
import PostsCtn from '../PostBodyCtn/PostsCtn';
import CreateToolsCtn from '../createTools/CreateToolsCtn';
import "./home.css"

function Home() {
  const dispatch = useDispatch();
  dispatch(getAll());

  // useEffect(() => {
  //   dispatch(getAll());
  //   console.log("dispatched");
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
