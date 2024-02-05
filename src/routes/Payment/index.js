import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listing";

const NewListPayment = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Pranidaya</title>
      <meta name="description" content="Pranidaya" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
    </Switch>
  </div>
);

export default NewListPayment;
