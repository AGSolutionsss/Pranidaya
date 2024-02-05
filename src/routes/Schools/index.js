/**
 * Dasboard Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

// async components

import Listing from "./listings";
import View from "./view";

import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListSchools = ({ match }) => (
  <div className="dashboard-wrapper">
  <Helmet>
			<title>FTS | Schools</title>
			<meta name="description" content="FTS Schools" />
		</Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/view`} component={View} />
    
    </Switch>
  </div>
);

export default NewListSchools;
