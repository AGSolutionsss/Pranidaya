/**
 * Dasboard Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

// async components

import Listing from "./listings";
// import Add from './addUser'
import Add from "./AddComp";
import View from "./View";
import Edit from "./Edit";
import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListChapter = ({ match }) => (
  <div className="dashboard-wrapper">
  <Helmet>
			<title>FTS | Chapter</title>
			<meta name="description" content="FTS Chapter" />
		</Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/addchapter`} component={Add} />
      {/* <Route path={`${match.url}/adduser`} component={AddUser} /> */}
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/edit`} component={Edit} />
    </Switch>
  </div>
);

export default NewListChapter;
