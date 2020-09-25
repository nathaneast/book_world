import React, { useState } from "react";
import { Container, Nav, NavItem, NavBar, NavbarToggler, Collapse, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { LOGIN_REQUEST } from "../redux/types";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useState((state) => state.auth);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const authLink = (
    <>
      <NavItem>
        {user && user.name ? (
          <Button>{user.name}</Button>
        ) : "no user"}
      </NavItem>
    </>
  );

  return (
    <>
      <NavBar color="dark" expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            BookWorld
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </NavBar>
    </>
  );
};

export default NavBar;
