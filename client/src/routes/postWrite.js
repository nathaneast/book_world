import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { SEARCH_BOOK_REQUEST } from "../redux/types";

const PostWrite = () => {
  const [form, setValues] = useState({
    bookTitle: "",
    bookImage: "",
    bookCategory: "",
  });

  const dispatch = useDispatch();

  const { searchBookResult, selectedSearchBook } = useSelector(
    (state) => state.post
  );

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const toggle = () => {
  //   setModal(!modal);
  // };

  const searchBookSubmit = (e) => {
    e.preventDefault();
    const { bookTitle } = form;
    toggle();
    if (bookTitle) {
      dispatch({
        type: SEARCH_BOOK_REQUEST,
        payload: bookTitle,
      });
    } else {
      alert("책 제목을 입력 해주세요");
    }
  };

  const searchBook = (
    <Form onSubmit={searchBookSubmit}>
      <FormGroup>
        <Label for="bookTitle">책 제목을 입력 해주세요</Label>
        <Input
          type="bookTitle"
          name="bookTitle"
          id="bookTitle"
          placeholder="책 제목"
          onChange={onChange}
        />
        <Button>책 검색</Button>
      </FormGroup>
    </Form>
  );

  const postWriteForm = (
    <Form>
      <FormGroup></FormGroup>
    </Form>
  );

  return (
    <div>
      {selectedSearchBook ? postWriteForm : searchBook}
      {searchBookResult && <BookCardList />}
    </div>
  );
};

export default PostWrite;
