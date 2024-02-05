import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listing";
import Add from "./addCons";
import Edit from "./editCons";

const NewListCons = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Pranidaya</title>
      <meta name="description" content="Pranidaya" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/edit`} component={Edit} />
    </Switch>
  </div>
);

export default NewListCons;
