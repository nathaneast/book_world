import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../redux/types";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch({
      type: LOGIN_REQUEST,
    });
  };

  return (
    <>
      <div>
        <Container>
          <Nav>
            <NavItem onClick={handleLogin}>
              <NavLink href="#">google Login</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </div>
    </>
  );
};

export default NavBar;
