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

import { } from "../redux/types";

const PostEdit = () => {
  const { postDetail } = useSelector((state) => state.post);
  
  const { 
    bookTitle,
    title,
    part,
    page,
    contents,
    category,
    creator,
    authors,
    publisher,
    imageUrl,
    views,
    date, } = postDetail;

  const [form, setValues] = useState({
    bookTitle,
    title,
    category,
    part,
    page,
    contents,
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const PostEditSubmit = (e) => {
    e.preventDefault();
    const { title, category, part, page, contents } = form;
    if (!contents || !category) {
      alert("빈 값을 입력 해주세요");
      return;
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

  return (
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
    <Form onSubmit={PostEditSubmit}>
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
};

export default PostEdit;
