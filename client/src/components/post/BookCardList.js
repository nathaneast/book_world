import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalHeader, Modal, ModalBody, Card, CardImg, CardTitle, Row } from "reactstrap";
import { SELECT_BOOK_REQUEST } from "../../redux/types";

const BookCardList = () => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const { searchBookResult, searchBookTerm } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    toggle();
  }, [searchBookResult]);   

  const toggle = () => {
    setModal(!modal);
  };

  const onClick = (e) => {
    const currentBookKey = Number(e.currentTarget.dataset.key);
    dispatch({
      type: SELECT_BOOK_REQUEST,
      payload: searchBookResult[currentBookKey]
    });
  };

  // Card 정렬, hover effect 작업 필요
  const books = (
    searchBookResult.map((book, index) => (
    <Card key={book.isbn} className="m-2" data-key={index} onClick={onClick}>
      <CardImg src={book.thumbnail} width="150px" height="220px" />
      <CardTitle>
        {book.title.length > 10 ? `${book.title.substr(0,10)}..` : book.title.length}
      </CardTitle>
    </Card>
  )));

  const emptyBook = <h1>책 없다</h1>;

  return (
    <Modal isOpen={modal} toggle={toggle} className="modal-lg">
      <ModalHeader>{searchBookTerm}</ModalHeader>
      <ModalBody>
        <Row>{searchBookResult.length ? books : emptyBook}</Row>
      </ModalBody>
    </Modal>
  );
};

export default BookCardList;
