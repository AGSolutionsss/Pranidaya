import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';

const WebsiteDonationDownload = (props) => {
  let history = useHistory();
  var today = new Date(),

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [receiptsdwn, setWebsiteDonationDownload] = useState({
   payment_from_date: "2023-04-01",
   payment_to_date: date,
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("user_type_id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

  const onInputChange = (e) => {
   setWebsiteDonationDownload({
      ...receiptsdwn,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
       payment_from_date: receiptsdwn.payment_from_date,
       payment_to_date: receiptsdwn.payment_to_date,
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();

if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/download-website-donation",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'website_donation_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Website Donation is Downloaded Successfully");
        setIsButtonDisabled(false)
    
    }).catch((err) =>{
     NotificationManager.error("Website Donation is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Website Donation" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
            <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="date"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Please select From Date"
                  autoComplete="Name"
                  name="payment_from_date"
                  value={receiptsdwn.payment_from_date}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="payment_to_date"
                  value={receiptsdwn.payment_to_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            
            </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default WebsiteDonationDownload;
