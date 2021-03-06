import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Row,
} from "reactstrap";

import { POST_DETAIL_REQUEST } from "../../redux/types";
import { GrowingSpinner } from "../Spinner";

const PostCardOne = ({ posts, loading }) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    const targetPostKey = Number(e.currentTarget.dataset.key);
    dispatch({
      type: POST_DETAIL_REQUEST,
      payload: posts[targetPostKey]._id,
    });
  };

  const postCards = (
    <>
    {Array.isArray(posts)
    ? posts.map((post, index) => (
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
      ))
    : ""}
    </>
    );
  
  
  const viewPosts = (posts.length ? postCards : <div>글이 없습니다.</div>);

  return (
    <Row>
      {loading ? GrowingSpinner : viewPosts}
    </Row>
  );
};

export default PostCardOne;
