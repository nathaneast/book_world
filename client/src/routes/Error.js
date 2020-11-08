import React from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

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
