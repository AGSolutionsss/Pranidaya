/**
 * Dasboard Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

// async components

import Listing from "./listing";
import Edit from "./editReceipt";
import View from "./receiptview";

// import Edit from "./Edit"
import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListDonor = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>FTS | Receipts</title>
      <meta name="description" content="FTS Receipts" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/receiptview`} component={View} />

      <Route path={`${match.url}/editreceipt`} component={Edit} />
    </Switch>
  </div>
);

export default NewListDonor;
