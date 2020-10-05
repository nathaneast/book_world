import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";

const postWrite = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [modal, setModal] = useSelector(false);

  const dispatch = useDispatch();

  const handleToogle = () => {};

  return (
    <div>
      <Button onClick={handleToogle}>책 검색</Button>
    </div>
  );
};

export default postWrite;
