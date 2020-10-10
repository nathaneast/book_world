import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

const PostDetail = () => {
  const { postDetail } = useSelector((state) => state.post);
  const { authors, bookTitle, category, comments, contents, creator, date, imageUrl, page, part, publisher, title, views } = postDetail;

  console.log(postDetail)

  /* 
  마크업 하기, map key값들 수정

  나 => 수정, 삭제 버튼
  다른 사용자 => 댓글 가능
  게스트 => 댓글 불가
  */
  return (
    <Container>
      <Row>
        <Col>책 제목: {bookTitle}</Col>
      </Row>
      <Row>
        <img width="300px" src={imageUrl} alt="Book Image" />
      </Row>
      <Row>
        <Col>
          작가:
          {Array.isArray(authors)}
          {authors.map((author) => (
            <span key={author}>{author}</span>
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
