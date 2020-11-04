import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCardList from "../components/PostCardList";
import AppNavBar from "../components/AppNavBar";
import PostWrite from "./postWrite";
import PostDetail from "./PostDetail";
import Category from "../components/Category";

const MyRouter = () => (
  <>
    <AppNavBar />
    <Header />
    <Category />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/postWrite" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
