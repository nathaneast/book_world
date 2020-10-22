import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "reactstrap";
import {
  CATEGORY_LOADING_REQUEST,
  CATEGORY_SELECT_REQUEST,
} from "../redux/types";

const Category = () => {
  const { categoryResult } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORY_LOADING_REQUEST,
    });
  }, [dispatch]);

  const onClick = (e) => {
    const targetCategoryKey = Number(e.currentTarget.dataset.key);
    dispatch({
      type: CATEGORY_SELECT_REQUEST,
      payload: categoryResult[targetCategoryKey],
    });
  };

  // categoryResult true 값 따로 변수로 선언하면 동작 안함
  return (
    <Row className="m-1">
      {categoryResult
        ? categoryResult.map((category, index) => (
            <div key={category} data-key={index} onClick={onClick}>
              <Button color="info">{category}</Button>
            </div>
          ))
        : ""}
    </Row>
  );
};

export default Category;
