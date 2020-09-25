import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../redux/types";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useState((state) => state.auth);

  return (
    <>
      <div>
        <Container>
          <Nav>
            <NavItem onClick={handleLogin}></NavItem>
          </Nav>
        </Container>
      </div>
    </>
  );
};

export default NavBar;
