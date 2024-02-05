import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';

const Add = (props) => {

    let history = useHistory();
    const [vendor, setVendor] = useState({
        vendor_name: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_gst: "",
        vendor_address: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyNumber = (inputtxt) => {
      var phoneno = /^\d*\.?\d*$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
          return false;
      }
    }

    const validateOnlyDigits = (inputtxt) => {
      var phoneno = /^\d+$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
      }else{
          return false;
      }
    }
    
    const onInputChange = (e) => {
      if(e.target.name=="vendor_mobile"){
        if(validateOnlyNumber(e.target.value)){
            setVendor({
              ...vendor,
              [e.target.name]: e.target.value,
            });
        }
      }else{
        setVendor({
          ...vendor,
          [e.target.name]: e.target.value,
        });
      }
        
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            vendor_name : vendor.vendor_name,
            vendor_mobile : vendor.vendor_mobile,
            vendor_email: vendor.vendor_email,
            vendor_gst: vendor.vendor_gst,
            vendor_address: vendor.vendor_address,
            
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-vendor",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Vendor is Created Sucessfully");
                history.push("listing");
            }else if(res.data.code == '401'){
                NotificationManager.error("Mobile No Duplicate Entry");
            }else if(res.data.code == '402'){
                NotificationManager.error("Email Id Duplicate Entry");
            }else if(res.data.code == '403'){
                NotificationManager.error("Vendor Name Duplicate Entry");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Vendor" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Vendor Name"
                  autoComplete="Name"
                  name="vendor_name"
                  value={vendor.vendor_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Mobile"
                  autoComplete="Name"
                  name="vendor_mobile"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  value={vendor.vendor_mobile}
                  onChange={(e) => onInputChange(e)}
                  
                  />
                  
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  
                  autoComplete="Name"
                  name="vendor_email"
                  value={vendor.vendor_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                fullWidth
                label="GST No"
                inputProps={{ maxLength: 15, minLength: 15 }}
                autoComplete="Name"
                name="vendor_gst"
                value={vendor.vendor_gst}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Address"
                  autoComplete="Name"
                  name="vendor_address"
                  value={vendor.vendor_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            
            <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
            <Link to="listing">
              <Button className="mr-10 mb-10" color="success">
                Back
              </Button>
            </Link>
          </div>
            </div>
            </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;