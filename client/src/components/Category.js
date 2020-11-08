import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Row } from "reactstrap";
import {
  CATEGORY_LOADING_REQUEST,
  CATEGORY_SELECT_REQUEST,
} from "../redux/types";

const Category = () => {
  const { categoryResult, selectedCategory } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: CATEGORY_LOADING_REQUEST,
    });
  }, [dispatch]);

  const onClick = (e) => {
    const targetCategoryKey = Number(e.currentTarget.dataset.key);
    const targetCategory = categoryResult[targetCategoryKey];
    dispatch({
      type: CATEGORY_SELECT_REQUEST,
      payload: {
        targetCategory,
        path: location.pathname,
      },
    });
  };

  return (
    <Row className="m-1">
      {categoryResult
        && categoryResult.map((category, index) => (
            <div key={category} data-key={index} onClick={onClick}>
              <Button
                color={selectedCategory === category ? "warning" : "info"}
              >
                {category}
              </Button>
            </div>
          ))
        }
    </Row>
  );
};

export default Category;
