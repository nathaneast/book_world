import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import PostCardOne from "../components/PostCardOne";
import { MYPOSTS_LOADING_REQUEST } from "../redux/types";

const MyPosts = (req) => {
  const { myPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
      type: MYPOSTS_LOADING_REQUEST,
      payload: req.match.params.id,
    });
  }, [dispatch]);

  return (
    <Container>
      <h2>내가 쓴 글</h2>
      {myPosts.length ? <PostCardOne posts={myPosts} /> : <div>글이 없습니다</div>}
    </Container>
  );
};

export default MyPosts;
