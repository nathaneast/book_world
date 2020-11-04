import React, { useCallback, useState } from "react";
import {
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarToggler,
  Collapse,
  Button,
  Form,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LoginModal from "../components/auth/loginModal";
import RegisterModal from "../components/auth/RegisterModal";
import SearchInput from "./search/SearchInput";
import { LOGOUT_REQUEST } from "../redux/types";

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const authLink = (
    <>
      <NavItem>
        <Form className="col mt-2">
          <Link to="postWrite">
            <Button outline color="light" className="px-3" block>
              <strong>글쓰기</strong>
            </Button>
          </Link>
        </Form>
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Button outline color="light" className="px-3" block>
              <strong>{user.name}</strong>
            </Button>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col mt-2">
          <Link to="#" onClick={onLogout}>
            <Button outline color="light" className="px-3" block>
              <strong>Logout</strong>
            </Button>
          </Link>
        </Form>
      </NavItem>
    </>
  );

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem> 
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Book World
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <SearchInput isOpen={isOpen} />
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavBar;
