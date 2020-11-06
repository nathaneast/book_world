import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Button, Form, FormGroup, Input, Container } from "reactstrap";

import { COMMENT_LOADING_REQUEST, COMMENT_UPLOADING_REQUEST } from "../../redux/types";

const Comment = ({ userId, userName, postId }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({ contents: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Comment Uploading Submit 실행됨")
    const { contents } = form;
    const body = { contents, postId, userId, userName };
    console.log(body , "Comment Uploading Submit 바디")

    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body,
    });
    resetValue.current.value = "";
    setValues("");
  };

  const resetValue = useRef(null);

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: postId,
    });
  }, [dispatch, postId]);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Row className="p-2">
            <div className="font-weight-bold m-1">Make Comment </div>
            <div className="my-1" />
            <Input
              innerRef={resetValue}
              type="textarea"
              name="contents"
              id="contents"
              onChange={onChange}
              placeholder="Comment"
            />
            <Button
              color="primary"
              block
              className="mt-2 offset-md-10 col-md-2"
            >
              작성
            </Button>
          </Row>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default Comment;
