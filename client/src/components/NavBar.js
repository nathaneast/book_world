import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

const NavBar = () => {
  return (
    <>
      <div>
        <Container>
          <Nav>
            <NavItem>
              <NavLink href="/api/google">google login</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </div>
    </>
  );
};

export default NavBar;
