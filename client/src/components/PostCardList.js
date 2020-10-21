// import Helmet from "helmet";
// import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import { POST_LOADING_REQUEST, POST_DETAIL_REQUEST } from "../redux/types";

const PostCardList = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  const onClick = (e) => {
    const currentPostKey = Number(e.currentTarget.dataset.key);
    dispatch({
      type: POST_DETAIL_REQUEST,
      payload: posts[currentPostKey]._id,
    });
  };

  console.log(posts, "posts");

  const postCards = posts.map((post, index) => (
    <Card key={index} className="m-2" data-key={index} onClick={onClick}>
      <CardImg src={post.imageUrl} width="150px" height="220px" />
      <CardBody>
        <CardTitle>
          {post.bookTitle.length > 10
            ? `${post.bookTitle.substr(0, 10)}..`
            : post.bookTitle}
        </CardTitle>
        <CardSubtitle>{post.title}</CardSubtitle>
      </CardBody>
    </Card>
  ));

  const emptyPostCards = <div>글이 없습니다.</div>;

  // 로딩 넣어야함
  return (
    <>
      <Row>{posts.length ? postCards : emptyPostCards}</Row>
    </>
  );
};

export default PostCardList;
