import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addIndiv";
import View from "./View";
import DonorView from "./DonorView";
import Edit from "./DonorEdit";
import Receipt from "../Receipts/createreceipt";
import ReceiptM from "../ReceiptsM/createreceiptM";

const NewListDonor = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
			<title>Pranidaya</title>
			<meta name="description" content="Pranidaya" />
		</Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/addindiv`} component={Add} />
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/donorview`} component={DonorView} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/receipt`} component={Receipt} />
      <Route path={`${match.url}/receiptm`} component={ReceiptM} />
    </Switch>
  </div>
);

export default NewListDonor;
