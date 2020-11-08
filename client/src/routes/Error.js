import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import PostCardOne from "../components/PostCardOne";
import { MYPOSTS_LOADING_REQUEST } from "../redux/types";

const MyPosts = (req) => {
  const { error } = useSelector((state) => state.post);

  return (
    <Container>
      <h2>Error !</h2>
      {error ? (
        <>
        <div>{error.status}</div>
        <div>{error.message}</div>
        </>
      ) : ""}
    </Container>
  );
};

export default MyPosts;
