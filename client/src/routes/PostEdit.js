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
  CardImg,
} from "reactstrap";

import { POST_EDIT_REQUEST } from "../redux/types";

const PostEdit = () => {
  const { postDetail } = useSelector((state) => state.post);

  const {
    bookTitle,
    title,
    part,
    page,
    contents,
    category: { categoryName },
    authors,
    publisher,
    imageUrl,
  } = postDetail;

  const [form, setValues] = useState({
    bookTitle,
    title,
    category: categoryName,
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

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { bookTitle, title, category, part, page, contents } = form;

    if (!contents || !category) {
      alert("빈 값을 입력 해주세요");
      return;
    }

    const token = localStorage.getItem("token");
    const id = postDetail._id;
    const body = {
      bookTitle,
      title,
      category,
      part,
      page,
      contents,
      token,
      id,
    };

    dispatch({
      type: POST_EDIT_REQUEST,
      payload: body,
    });
  };

  console.log(form, 'form')

  return (
    <>
      <Card>
        <CardTitle>{bookTitle}</CardTitle>
        <CardImg alt="bookImg" src={imageUrl} width="300px" height="400px" />
        <CardSubtitle>
          {authors}
          {publisher}
        </CardSubtitle>
      </Card>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="title">글 제목</Label>
          <Input
            defaultValue={title}
            name="title"
            id="title"
            onChange={onChange}
          />
          <Label for="category">책 카테고리를 골라 주세요</Label>
          <Input
            type="select"
            value={categoryName}
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
          <Input
            defaultValue={part}
            name="part"
            id="part"
            onChange={onChange}
          />
          <Label for="page">어느 페이지 인가요 ?</Label>
          <Input
            defaultValue={page}
            name="page"
            id="page"
            onChange={onChange}
          />
          <Label for="contents">느낀점을 입력 하세요</Label>
          <Input
            defaultValue={contents}
            type="textarea"
            name="contents"
            id="contents"
            onChange={onChange}
            height="120px"
          />
          <Button>수정하기</Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default PostEdit;
