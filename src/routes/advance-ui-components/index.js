/**
 * Advance UI Components Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async routes
import {
	AsyncAdvanceUITabsComponent,
	AsyncAdvanceUIDateAndTimePickerComponent,
	AsyncAdvanceUIStepperComponent,
	AsyncAdvanceUINotificationComponent,
	AsyncAdvanceUISweetAlertComponent,
	AsyncAdvanceUIAutoCompleteComponent
} from '../../components/AsyncComponent/AsyncComponent';

const AdvanceUIComponents = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>FTS | Notification</title>
			<meta name="description" content="FTS Notification" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/dateTime-picker`} />
			<Route path={`${match.url}/dateTime-picker`} component={AsyncAdvanceUIDateAndTimePickerComponent} />
			<Route path={`${match.url}/tabs`} component={AsyncAdvanceUITabsComponent} />
			<Route path={`${match.url}/stepper`} component={AsyncAdvanceUIStepperComponent} />
			<Route path={`${match.url}/notification`} component={AsyncAdvanceUINotificationComponent} />
			<Route path={`${match.url}/sweet-alert`} component={AsyncAdvanceUISweetAlertComponent} />
			<Route path={`${match.url}/auto-complete`} component={AsyncAdvanceUIAutoCompleteComponent} />
		</Switch>
	</div>
);

export default AdvanceUIComponents;
