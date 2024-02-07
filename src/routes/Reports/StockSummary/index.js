import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import StockSummaryForm from "./StockSummaryForm";
import StockSummaryReport from './StockSummaryReport';

const StockSummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/stockForm`} />
            <Route path={`${match.url}/stockForm`} component={StockSummaryForm} />
            <Route path={`${match.url}/stockReport`} component={StockSummaryReport} />
        </Switch>
    </div>
);

export default StockSummary;