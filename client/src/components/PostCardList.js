import Helmet from "helmet";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import { POST_LOADING_REQUEST } from "../redux/types";

const PostCardList = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  console.log(posts, "posts");

  const postCards = <div>postCards</div>;

  // 로딩 넣어야함
  return (
    <>
      <Helmet title="Home" />
      <Row>{posts ? postCards : ""}</Row>
    </>
  );
};

export default PostCardList;
