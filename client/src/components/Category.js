import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "reactstrap";
import {
  CATEGORY_LOADING_REQUEST,
  CATEGORY_SELECT_REQUEST,
} from "../redux/types";

const Category = () => {
  const { categoryResult, selectedCategory } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORY_LOADING_REQUEST,
    });
  }, [dispatch]);

  // 카테고리 선택하면 해당 글 나오는것 개발 미루기
  const onClick = (e) => {
    const targetCategoryKey = Number(e.currentTarget.dataset.key);
    const targetCategory = categoryResult[targetCategoryKey];
      dispatch({
        type: CATEGORY_SELECT_REQUEST,
        payload: targetCategory,
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
