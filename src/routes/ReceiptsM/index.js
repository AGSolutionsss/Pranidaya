import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listing";
import Edit from "./editReceiptM";
import View from "./receiptviewM";

const NewListReceiptsM = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Pranidaya</title>
      <meta name="description" content="Pranidaya" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/receiptview`} component={View} />
      <Route path={`${match.url}/editreceipt`} component={Edit} />
      
    </Switch>
  </div>
);

export default NewListReceiptsM;
