import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";

const Team = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Pranidaya</title>
      <meta name="description" content="FTS Donor" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
    </Switch>
  </div>
);

export default Team;
