import React from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import PostCardOne from "../components/PostCardOne";

const Search = () => {
  const { searchTerm, searchResult, loading } = useSelector((state) => state.post);
  
  return (
    <Container>
      <Row>내가 검색한 책: {searchTerm}</Row>
      <PostCardOne posts={searchResult} loading={loading} />
    </Container>
  );
};

export default Search;