import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalHeader, ModalBody, Card, CardImg } from "reactstrap";

const BookCardList = () => {
  const [modal, setModal] = useState(true);

  const dispatch = useDispatch();

  const { searchBookResult, searchBookTerm } = useSelector(
    (state) => state.post
  );

  const toggle = () => {
    setModal(!modal);
  };

  const books = searchBookResult.map((book) => (
    <Card key={book.isbn}>
      <CardImg alt="카드이미지" src={book.thumbnail} />
    </Card>
  ));

  const emptyBook = <div>책 없다</div>;

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>{searchBookTerm}</ModalHeader>
      <ModalBody>{searchBookResult.length ? books : emptyBook}</ModalBody>
    </Modal>
  );
};

export default BookCardList;
