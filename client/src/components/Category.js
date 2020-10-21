import React from "react";
import { useSelector } from "react-redux";
import { Badge, Button } from "reactstrap";

const Category = () => {
  // const { posts } = useSelector((state) => state.post);

  return (
    <div>
      <div>
        <Button color="info">
          전체보기 <Badge color="light">뱃지</Badge>
        </Button>
      </div>
    </div>
  );
};

export default Category;
