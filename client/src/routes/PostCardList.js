import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { POST_LOADING_REQUEST } from "../redux/types";
import PostCardOne from "../components/PostCardOne";

const PostCardList = () => {
  const dispatch = useDispatch();

  const { posts, selectedCategory } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: selectedCategory,
    });
  }, [dispatch, selectedCategory]);

  return (
    <PostCardOne posts={posts} />
  );
};

export default PostCardList;
