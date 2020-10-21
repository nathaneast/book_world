import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button } from "reactstrap";
import { CATEGORY_LOADING_REQUEST } from "../redux/types";

const Category = () => {
  const { categoryResult } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CATEGORY_LOADING_REQUEST,
    });
  }, [categoryResult]);

  const viewCategory = (
    <div>
      <Button color="info">
        전체보기 <Badge color="light">뱃지</Badge>
      </Button>
    </div>
  );

  return (
    <div>
      {categoryResult ? viewCategory : "" }
    </div>
  );
};

export default Category;
