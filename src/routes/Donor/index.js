/**
 * Dasboard Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

// async components

import Listing from "./listings";
import Addcomp from './addComp'
import Add from "./addIndiv";
import View from "./View";
import Edit from "./Edit";
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
			<title>FTS | Donor</title>
			<meta name="description" content="FTS Donor" />
		</Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/addcomp`} component={Addcomp} />
      <Route path={`${match.url}/addindiv`} component={Add} />
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/edit`} component={Edit} />
    </Switch>
  </div>
);

export default NewListDonor;