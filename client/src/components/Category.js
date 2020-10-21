import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Row } from "reactstrap";
import { CATEGORY_LOADING_REQUEST } from "../redux/types";

const Category = () => {
  const { categoryResult } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORY_LOADING_REQUEST,
    });
  }, []);

  const viewCategory = categoryResult.map((category, index) => (
    <div key={category} data-key={index}>
      <Button color="info">{category}</Button>
    </div>
  ));

  return <div>{categoryResult ? viewCategory : ""}</div>;
};

export default Category;
