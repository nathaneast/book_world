import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { POST_LOADING_REQUEST } from "../redux/types";
import PostCardOne from "../components/PostCardOne";

const PostCardList = () => {
  const dispatch = useDispatch();

  const { posts, selectedCategory, loading } = useSelector((state) => state.post);

  // useEffect selectedCategory 넣으면 렌더링이 2번 됨
  // selectedCategory 바뀌면 posts 바꿔서 자동 리렌더링되게 바꿔야함
  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: selectedCategory,
    });
  }, [dispatch, selectedCategory]);

  console.log(posts, selectedCategory, 'PostCardList')

  return (
    <PostCardOne posts={posts} loading={loading} />
  );
};

export default PostCardList;
