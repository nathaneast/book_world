import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { SEARCH_BOOK_REQUEST } from "../redux/types";

const PostWrite = () => {
  const [modal, setModal] = useState(false);
  const [form, setValues] = useState({
    bookTitle: "",
    bookImage: "",
    bookCategory: "",
  });

  const dispatch = useDispatch();

  const { searchBookTerm, searchBookResult } = useSelector((state) => state.post);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const modalHandler = () => {
    const { bookTitle } = form;
    if (bookTitle) {
      toggle();
      dispatch({
        type: SEARCH_BOOK_REQUEST,
        payload: bookTitle,
      });
    } else {
      alert("책 제목을 입력 해주세요");
    }
  };

  const searchBookTitle = (
    <div>
      <Label for="bookTitle">책 제목을 입력 해주세요</Label>
      <Input
        type="bookTitle"
        name="bookTitle"
        id="bookTitle"
        placeholder="책 제목"
        onChange={onChange}
      />
      <Button onClick={modalHandler}>책 검색</Button>
    </div>
  );

  const viewBookResult = <div>viewBookResult</div>;

  return (
    <div>
      <Form>
        <FormGroup>
      {searchBookResult ? viewBookResult : searchBookTitle}
        </FormGroup>
      </Form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{form.bookTitle}</ModalHeader>
        <ModalBody>ModalCard</ModalBody>
      </Modal>
    </div>
  );
};

export default PostWrite;
