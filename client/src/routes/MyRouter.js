import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCardList from "../components/PostCardList";
import AppNavBar from "../components/AppNavBar";
import PostWrite from "./PostWrite";
import PostDetail from "./PostDetail";

const MyRouter = () => (
  <>
    <AppNavBar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/postWrite" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </Container>
  </>
);

export default MyRouter;
