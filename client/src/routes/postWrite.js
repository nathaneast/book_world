import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { SEARCH_BOOK_REQUEST } from "../redux/types";

const PostWrite = () => {
  const [modal, setModal] = useState(false);
  const [form, setValues] = useState({
    bookTitle: "",
    bookImage: "",
    bookCategory: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const searchBookSubmit = (e) => {
    e.preventDefault();
    const { bookTitle } = form;
    dispatch({
      type: SEARCH_BOOK_REQUEST,
      payload: bookTitle,
    });
  };

  const searchBookTitle = (
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

  const viewBookResult = (
  <>

  </>
  );

  return (
    <div>
      <Form>
        <FormGroup>
          {form.bookTitme ? viewBookResult : searchBookTitle}
        </FormGroup>
      </Form>
    </div>
  );
};

export default PostWrite;
