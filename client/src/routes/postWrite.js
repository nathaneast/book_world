import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
} from "reactstrap";

import BookCardList from "../components/post/BookCardList";
import { SEARCH_BOOK_REQUEST, POST_UPLOADING_REQUEST } from "../redux/types";

const PostWrite = () => {
  const [form, setValues] = useState({
    bookTitle: "",
    title: "",
    category: "",
    part: "",
    page: "",
    contents: "",
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

  const searchBookSubmit = (e) => {
    e.preventDefault();
    const { bookTitle } = form;
    if (bookTitle) {
      dispatch({
        type: SEARCH_BOOK_REQUEST,
        payload: bookTitle,
      });
    } else {
      alert("책 제목을 입력 해주세요");
    }
  };

  const postWriteSubmit = (e) => {
    e.preventDefault();
    const { title, category, part, page, contents } = form;
    if (!contents || !category) {
      alert("빈 값을 입력 해주세요");
    }
    const token = localStorage.getItem("token");
    const body = {
      token,
      title,
      category,
      part,
      page,
      contents,
      bookTitle: selectedSearchBook.title,
      imageUrl: selectedSearchBook.thumbnail,
      authors: selectedSearchBook.authors,
      publisher: selectedSearchBook.publisher,
    };
    dispatch({
      type: POST_UPLOADING_REQUEST,
      payload: body,
    });
  };

  const searchBook = (
    <Form onSubmit={searchBookSubmit}>
      <FormGroup>
        <Label for="bookTitle">책 제목을 입력 해주세요</Label>
        <Input
          name="bookTitle"
          id="bookTitle"
          placeholder="책 제목"
          onChange={onChange}
        />
        <Button>책 검색</Button>
      </FormGroup>
    </Form>
  );

  // 컨텐츠 길이 줄이기, 이미지 줄이기, 작가 출판사 레이아웃
  const postWriteForm = (
    <>
      <Card>
        <CardTitle>{selectedSearchBook.title}</CardTitle>
        <CardImg
          alt="bookImg"
          src={selectedSearchBook.thumbnail}
          width="300px"
          height="400px"
        />
        <CardSubtitle>
          {selectedSearchBook.authors}
          {selectedSearchBook.publisher}
        </CardSubtitle>
        <CardText>{selectedSearchBook.contents}</CardText>
      </Card>
      <Form onSubmit={postWriteSubmit}>
        <FormGroup>
          <Label for="title">글 제목</Label>
          <Input
            name="title"
            id="title"
            placeholder="글 제목을 입력 하세요"
            onChange={onChange}
          />
          <Label for="category">책 카테고리를 골라 주세요</Label>
          <Input
            type="select"
            name="category"
            id="category"
            onChange={onChange}
          >
            <option></option>
            <option>문학</option>
            <option>경제 경영 자기계발</option>
            <option>인문 사회 과학</option>
            <option>여행 예술 종교</option>
            <option>어린이 청소년 실용</option>
            <option>취업 수험서</option>
            <option>역사 문화</option>
            <option>미분류</option>
          </Input>
          <Label for="part">어떤 파트 인가요 ?</Label>
          <Input name="part" id="part" placeholder="파트" onChange={onChange} />
          <Label for="page">어느 페이지 인가요 ?</Label>
          <Input
            name="page"
            id="page"
            placeholder="페이지"
            onChange={onChange}
          />
          <Label for="contents">느낀점을 입력 하세요</Label>
          <Input
            type="textarea"
            name="contents"
            id="contents"
            placeholder="느낀점"
            onChange={onChange}
            height="120px"
          />
          <Button>글쓰기</Button>
        </FormGroup>
      </Form>
    </>
  );

  return (
    <div>
      {selectedSearchBook ? postWriteForm : searchBook}
      {searchBookResult && <BookCardList />}
    </div>
  );
};

export default PostWrite;
