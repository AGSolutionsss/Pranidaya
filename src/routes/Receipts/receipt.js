/**
 * Invoice
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from "axios";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card
import { RctCard } from 'Components/RctCard/index';

export default function Invoice () {
	const [receipt, setReceipt] = useState([]);
	useEffect(() => {
		var url = new URL(window.location.href);
		var id = url.searchParams.get("id");
	
		axios({
			url: " https://ftschamp.trikaradev.xyz/api/fetch-receipt-by-id/" + id,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		}).then((res) =>{
			console.log("Rec",res.data);
			setReceipt(res.data.receipts);
		})
	  }, []);
	
		return (
			<div className="invoice-wrapper">
				
			</div>
		);
}