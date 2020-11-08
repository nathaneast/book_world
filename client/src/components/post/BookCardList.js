import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ModalHeader,
  Modal,
  ModalBody,
  Card,
  CardImg,
  CardTitle,
  Row,
} from "reactstrap";
import { SELECT_BOOK_REQUEST } from "../../redux/types";

const BookCardList = ({ bookName, books, selectedBook }) => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    toggle();
  }, [books, selectedBook]);

  const toggle = () => {
    setModal(!modal);
  };

  const onClick = (e) => {
    const targetBookKey = Number(e.currentTarget.dataset.key);
    dispatch({
      type: SELECT_BOOK_REQUEST,
      payload: books[targetBookKey],
    });
  };

  // Card 레이아웃 , hover 작업 필요
  const viewBooks = books.map((book, index) => (
    <Card key={book.isbn} className="m-2" data-key={index} onClick={onClick}>
      <CardImg src={book.thumbnail} width="150px" height="220px" />
      <CardTitle>
        {book.title.length > 10
          ? `${book.title.substr(0, 10)}..`
          : book.title.length}
      </CardTitle>
    </Card>
  ));

  // 모달 꾸미기
  return (
    <Modal isOpen={modal} toggle={toggle} className="modal-lg">
      <ModalHeader>{bookName}</ModalHeader>
      <ModalBody>
        <Row>{books ? viewBooks : <h1>검색된 책이 없습니다.</h1>}</Row>
      </ModalBody>
    </Modal>
  );
};

export default BookCardList;
