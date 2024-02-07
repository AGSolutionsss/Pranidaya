import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';

const StockSummaryForm = (props) => {
  let history = useHistory();
  const [downloadStock, setStockDownload] = useState({
    receipt_from_date: "", 
    receipt_to_date:"",
  });
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{}
  });

  const onInputChange = (e) => {
   setStockDownload({
      ...downloadStock,
      [e.target.name]: e.target.value,
    });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      receipt_from_date: downloadStock.receipt_from_date,
      receipt_to_date: downloadStock.receipt_to_date,
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();

    if(v){
      setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-stock-summary",
     method: "POST",
     data,
     headers: {
       Authorization: `Bearer ${localStorage.getItem("login")}`,
     },
   }).then((res) => {
     
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'stock_summary.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Stock Summary is Downloaded Successfully");
       setIsButtonDisabled(false)
     //history.push('listing');
   }).catch((err) =>{
    NotificationManager.error("Stock Summary is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

  const onReportView = (e) => {
    e.preventDefault();
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    if(v){
      localStorage.setItem('receipt_from_date',downloadStock.receipt_from_date);
      localStorage.setItem('receipt_to_date',downloadStock.receipt_to_date);
      history.push("stockReport");
    }
  }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Stock Summary" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
          <div className="row">
          <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="date"
                  required
                  label="Please select From Date"
                  autoComplete="Name"
                  name="receipt_from_date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={downloadStock.receipt_from_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="date"
                  required
                  label="Please select To Date"
                  autoComplete="Name"
                  name="receipt_to_date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={downloadStock.receipt_to_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-2 col-md-2 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              style={{height:"40px"}}
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            <div className="col-sm-2 col-md-2 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              style={{height:"40px"}}
              onClick={(e) => onReportView(e)}
              
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default StockSummaryForm;
