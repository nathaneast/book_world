import React from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const Error = () => {
  const { error } = useSelector((state) => state.post);

  return (
    <Container>
      <h1>Error !</h1>
      {error && (
        <div>
          <h3>{error.status}</h3>
          <p>{error.message}</p>
        </div>
      )}
    </Container>
  );
};

export default Error;
