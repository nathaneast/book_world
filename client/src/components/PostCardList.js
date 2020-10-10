import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PostCardList = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.post);

  useEffect(() => {

  }, []);

  return (
    <div>
      PostCardList
    </div>
  );
}

export default PostCardList;
