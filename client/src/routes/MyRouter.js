import React from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCardList from "./PostCardList";
import AppNavBar from "../components/AppNavBar";
import Category from "../components/Category";
import PostWrite from "./postWrite";
import PostDetail from "./PostDetail";
import PostEdit from "./PostEdit";
import MyPosts from "./MyPosts";
import Search from "./Search";

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
        <Route path="/post/:id/edit" exact component={PostEdit} />
        <Route path="/myPosts/:id" exact component={MyPosts} />
        <Route path="/search/:searchTerm" exact component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
