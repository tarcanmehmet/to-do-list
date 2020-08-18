import React from "react";
import AddingList from "./containers/AddingList";
import Archive from "./containers/Archive";
import { Switch, Route } from "react-router-dom";
const Layout = () => {
  return (
    <Switch>
      <Route path="/" exact component={AddingList}></Route>
      <Route path="/archive" exact component={Archive}></Route>
    </Switch>
  );
};

export default Layout;
