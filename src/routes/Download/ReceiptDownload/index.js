import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';

const exemption = [
   {
     value: "80G",
     label: "80G",
   },
   {
     value: "Non 80G",
     label: "Non 80G",
   },
   {
     value: "FCRA",
     label: "FCRA",
   },
 ];

 const donation_type = [
    {
        value: "Gopalak",
        label: "Gopalak",
      },
      {
        value: "Wet/Dry-Grass",
        label: "Wet/Dry-Grass",
      },
      {
        value: "FIne/Rough Bran",
        label: "FIne/Rough Bran",
      },
      {
        value: "Gou-Daan",
        label: "Gou-Daan",
      },
      {
        value: "Building Fund",
        label: "Building Fund",
      },
      {
        value: "Pigeon Feeds",
        label: "Pigeon Feeds",
      },
      {
        value: "General Fund/Others",
        label: "General Fund/Others",
      },
 ];

const ReceiptDownload = (props) => {
  let history = useHistory();
  var today = new Date(),

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [receiptsdwn, setReceiptDownload] = useState({
   receipt_from_date: "2023-04-01",
   receipt_to_date: date,
   receipt_donation_type: "",
   receipt_exemption_type: "",
   indicomp_source: "",
    
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
   setReceiptDownload({
      ...receiptsdwn,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
       receipt_from_date: receiptsdwn.receipt_from_date,
       receipt_to_date: receiptsdwn.receipt_to_date,
       receipt_donation_type: receiptsdwn.receipt_donation_type,
       receipt_exemption_type: receiptsdwn.receipt_exemption_type,
      
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();

if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/download-receipt",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'receipt_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Receipt is Downloaded Successfully");
        setIsButtonDisabled(false)
    
    }).catch((err) =>{
     NotificationManager.error("Receipt is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Cash Receipts" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
            <h3 style={{color: 'red'}}>Leave blank if you want all records.</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="date"
                  required
                  autoComplete="Name"
                  name="receipt_from_date"
                  helperText="Please select From Date"
                  value={receiptsdwn.receipt_from_date}
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
                  autoComplete="Name"
                  name="receipt_to_date"
                  helperText="Please select To Date"
                  value={receiptsdwn.receipt_to_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 id="select-donation_type"
                 select
                 label="Purpose"
                 name="receipt_donation_type"
                 value={receiptsdwn.receipt_donation_type}
                 onChange={(e) => onInputChange(e)}
                 SelectProps={{
                   MenuProps: {},
                 }}
                 helperText="Please select Donation Type"
                 fullWidth
               >
                  {donation_type.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                         {option.label}
                       </MenuItem>
                     ))}
               </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 id="select-exemption"
                 select
                 label="Category"
                 name="receipt_exemption_type"
                 value={receiptsdwn.receipt_exemption_type}
                 onChange={(e) => onInputChange(e)}
                 SelectProps={{
                   MenuProps: {},
                 }}
                 helperText="Please select Exemption Type"
                 fullWidth
               >
                 {exemption.map((option) => (
                   <MenuItem key={option.value} value={option.value}>
                     {option.label}
                   </MenuItem>
                 ))}
               </TextField>
              </div>
            </div>
            
            </div>
            <div class="row" style={{marginTop:"20px"}}>
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

export default ReceiptDownload;
