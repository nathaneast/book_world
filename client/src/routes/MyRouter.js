import React from "react";
import { Container } from "reactstrap";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PostCardList from "../components/PostCardList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const MyRouter = () => (
  <>
    <Container id="main-body">
      <Header />
      <NavBar />
        <Switch>
          <Route path="/" exact component={PostCardList} />
        </Switch>
        <Redirect from="*" to="/" />
      <Footer />
    </Container>
  </>
);

export default MyRouter;
