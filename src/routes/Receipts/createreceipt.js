import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Moment from 'moment';
import { NotificationManager,} from "react-notifications";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

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

const pay_mode = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Others",
    label: "Others",
  },
];

const pay_mode_2 = [
  {
    value: "Cheque",
    label: "Cheque",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Others",
    label: "Others",
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

const donation_type_2 = [
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

export default function Createreceipt() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [userdata, setUserdata] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [loader, setLoader]= useState(true);

  

  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;
  var d = document.getElementById("datefield");
  if (d) {
    document.getElementById("datefield").setAttribute("max", todayback);
  }

  var todayyear = new Date().getFullYear();
  var twoDigitYear = todayyear.toString().substr(-2);
  var preyear = todayyear;
  var finyear = (+twoDigitYear) + 1;
  var finalyear = preyear+'-'+finyear;

  const [donor, setDonor] = React.useState({
    donor_fts_id: "",
    receipt_financial_year: "",
    receipt_date: todayback,
    receipt_exemption_type: "",
    receipt_total_amount: "",
    receipt_donation_type: "",
    receipt_tran_pay_mode: "",
    receipt_tran_pay_details: "",
    receipt_occasional: "",
    receipt_email_count: "",
    receipt_remarks: "",
    receipt_reason: "",
  });


  const validateOnlyDigits = (inputtxt) => {

    
     var phoneno = /^\d+$/;
     if(inputtxt.match(phoneno) || inputtxt.length==0){
         return true;
           }
         else
           {
           
           return false;
           }
   }
   const onInputChange = (e) => {

    if(e.target.name=="receipt_total_amount"){

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
   }
    else{

    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      donor_fts_id: userdata.donor_fts_id,
      receipt_financial_year:'2023-24',
      receipt_date: todayback,
      receipt_exemption_type: donor.receipt_exemption_type,
      receipt_total_amount: donor.receipt_total_amount,
      receipt_donation_type: donor.receipt_donation_type,
      receipt_tran_pay_mode: donor.receipt_tran_pay_mode,
      receipt_tran_pay_details: donor.receipt_tran_pay_details,
      receipt_occasional: donor.receipt_occasional,
      receipt_remarks: donor.receipt_remarks,
      receipt_reason: donor.receipt_reason,
      receipt_email_count: donor.receipt_email_count,
    };
    var v = document.getElementById("createrec").checkValidity();
    var v = document.getElementById("createrec").reportValidity();
    e.preventDefault();
    if (v) {

      setIsButtonDisabled(true)
      
      axios({
        url: baseURL+"/create-receipt",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        } ,
      }).then((res) => {
        NotificationManager.success("Receipt Created Sucessfully");
        history.push("/app/receipts");
      });
    }
  };


  useEffect(() => {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    axios({
      url: baseURL+"/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setUserdata(res.data.donor);
      setLoader(false)
    });
  }, []);

  const pan = userdata.donor_pan_no == "" ? "NA" : userdata.donor_pan_no;
  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      
      <RctCollapsibleCard heading="Cash Receipt">
     
        <div className="receiptDetails">
          <h4>Name : {userdata.donor_full_name}</h4>
          <h4>PDS Id : {userdata.donor_fts_id}</h4>
          <h4>Pan No : {pan}</h4>
          <h4>Receipt Date : {Moment(donor.receipt_date).format('DD-MM-YYYY')}</h4>
          <h4>Year : {finalyear}</h4>
        </div>
        {donor.receipt_total_amount > 2000 &&
        donor.receipt_exemption_type == "80G" &&
        pan == "NA" ? (
          <span className="amounterror">
            Max amount allowedwithout Pan card is 2000
          </span>
        ) : (
          ""
        )}
        <form id="createrec" autoComplete="off">
          <div className="row">
          
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-exemption"
                  select
                  label="Category"
                 
                  name="receipt_exemption_type"
                  value={donor.receipt_exemption_type}
                  onChange={(e) => onInputChange(e)}
                  required
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Exemption Type"
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
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="text"
                  fullWidth
                  type="text"
                  label="Total Amount"
                  name="receipt_total_amount"
                  inputProps={{ maxLength: 8 }}
                  value={donor.receipt_total_amount}
                  required
                  onChange={(e) => onInputChange(e)}
                  autoComplete="Total Amount"
                  
                />
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-pay_mode"
                  select
                  label="Transaction Type"
               
                  name="receipt_tran_pay_mode"
                  required
                  value={donor.receipt_tran_pay_mode}
                  onChange={(e) => onInputChange(e)}
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Transaction Type"
                  fullWidth
                >
                  {donor.receipt_exemption_type == "80G" &&
                  donor.receipt_total_amount > 2000
                    ? pay_mode_2.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    : pay_mode.map((option) => (
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
                  id="select-donation_type"
                  select
                  label="Purpose"
                  
                  name="receipt_donation_type"
                  required
                  value={donor.receipt_donation_type}
                  onChange={(e) => onInputChange(e)}
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Donation Type"
                  fullWidth
                >
                  {donor.receipt_exemption_type == "80G"
                    ? donation_type_2.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    : donation_type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                </TextField>
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="text"
                  fullWidth
                  label="Transaction Pay Details"
                  helperText="Cheque No / Bank Name / UTR / Any Other Details"
                  name="receipt_tran_pay_details"
                  value={donor.receipt_tran_pay_details}
                  onChange={(e) => onInputChange(e)}
                  autoComplete="Transaction Pay Details"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="text"
                  name="receipt_occasional"
                  value={donor.receipt_occasional}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  label="On Occasion"
                  autoComplete="On Occasion"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="text"
                  name="receipt_remarks"
                  value={donor.receipt_remarks}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  label="Remarks"
                  autoComplete="Remarks"
                />
              </div>
            </div>
          </div>
          <div className="receiptbuttons">
            <Button
              type="submit"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
              className="mr-10 mb-10"
              color="primary"
            >
              Submit
            </Button>

            
            <Link to="listing">
              <Button className="mr-10 mb-10" color="danger">
                Back
              </Button>
            </Link>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      </>}
    </div>
  );
}
