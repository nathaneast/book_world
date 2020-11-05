import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button } from "reactstrap";
import { POST_DELETE_REQUEST } from "../redux/types";

const PostDetail = () => {
  const { userId } = useSelector((state) => state.auth);
  const { postDetail } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const {
    authors,
    bookTitle,
    category,
    comments,
    contents,
    creator,
    date,
    imageUrl,
    page,
    part,
    publisher,
    title,
    views,
    _id: postId
  } = postDetail;

  const onDeleteClick = () => {
    console.log(postDetail._id, 'postDetail id')
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: postId,
        token: localStorage.getItem("token"),
      },
    });
  };

  const creatorMenu = (
    <Row>
      <Link to={`/post/${postId}/edit`} className="btn btn-success">
        수정
      </Link>
      <Button onClick={onDeleteClick}>삭제</Button>
    </Row>
  );

  /* 
  다른 사용자 => 댓글 가능
  게스트 => 댓글 불가
  */
  return (
    <Container>
      <Row>
        <Link to="/" className="btn btn-danger">
          홈으로
        </Link>
      </Row>
      <Row>
        <Col>책 제목: {bookTitle}</Col>
      </Row>
      <Row>
        <img width="300px" src={imageUrl} alt="Book Image" />
      </Row>
      <Row>
        <Col>
          작가:
          {authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>카테고리: {category.categoryName}</Col>
      </Row>
      <Row>
        <Col>출판사: {publisher}</Col>
      </Row>

      <Row>
        <Col>제목: {title}</Col>
      </Row>
      <Row>
        <Col>조회수: {views}</Col>
      </Row>
      <Row>
        <Col>
          글쓴이:
          <span>이름: {creator.name}</span>
          <span>이메일: {creator.email}</span>
        </Col>
      </Row>
      <Row>
        <Col>날짜: {date}</Col>
      </Row>
      <Row>
        <Col>파트: {part}</Col>
      </Row>
      <Row>
        <Col>페이지: {page}</Col>
      </Row>
      <Row>
        <Col>내용: {contents}</Col>
      </Row>
      {userId === creator._id ? creatorMenu : ""}
      <Row>
        <Col>
          댓글:
          {comments.map((comment, i) => (
            <span key={i}>{comment}</span>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
