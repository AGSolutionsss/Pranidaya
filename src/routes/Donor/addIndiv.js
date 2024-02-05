import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import Pagedonor_titleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import InputMask from "react-input-mask";
import {  NotificationManager,} from "react-notifications";
import company_type from "../company_type";

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const title = [
  {
    value: "Shri",
    label: "Shri",
  },
  {
    value: "Smt.",
    label: "Smt.",
  },
  {
    value: "Kum",
    label: "Kum",
  },
  {
    value: "Dr.",
    label: "Dr.",
  },
];

const title1 = [
  {
    value: "M/s",
    label: "M/s",
  },
];

import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';

const Add = (props) => {

  let history = useHistory();
  const [donor, setDonor] = useState({
    donor_full_name: "",
    donor_title: "",
    donor_gender: "",
    donor_contact_name: "",
    donor_contact_designation: "",
    donor_father_name: "",
    donor_mother_name: "",
    donor_spouse_name: "",
    donor_dob_annualday: "",
    donor_doa: "",
    donor_pan_no: "",
    donor_image_logo: "",
    donor_remarks: "",
    donor_type: "",
    donor_mobile: "",
    donor_whatsapp: "",
    donor_email: "",
    donor_address: "",
    donor_area: "",
    donor_ladmark: "",
    donor_city: "",
    donor_state: "",
    donor_pin_code: "",
    
  });

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

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

    if(e.target.name=="donor_mobile"){

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    } else if(e.target.name=="donor_whatsapp"){

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else if(e.target.name=="donor_pin_code"){

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else{

    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  }
  };

  const validate = () => {
    var txtPANCard = document.getElementById("txtPANCard");
    var lblPANCard = document.getElementById("lblPANCard");
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(txtPANCard.value)) {
      lblPANCard.style.visibility = "hidden";
      return true;
    } else {
      lblPANCard.style.visibility = "visible";
      return false;
    }
  };

  const onChangePanNumber = (e) => {
    setDonor({ ...donor, donor_pan_no: e.target.value });
  };

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
  });

  const onSubmit = (e) => {
    let data = {
      donor_full_name: donor.donor_full_name,
      donor_title: donor.donor_title,
      donor_gender: donor.donor_gender,
      donor_father_name: donor.donor_father_name,
      donor_mother_name: donor.donor_mother_name,
      donor_spouse_name: donor.donor_spouse_name,
      donor_contact_name: donor.donor_contact_name,
      donor_contact_designation: donor.donor_contact_designation,
      donor_dob_annualday: donor.donor_dob_annualday,
      donor_doa: donor.donor_doa,
      donor_pan_no: donor.donor_pan_no,
      donor_image_logo: donor.donor_image_logo,
      donor_remarks: donor.donor_remarks,
      donor_mobile: donor.donor_mobile,
      donor_whatsapp: donor.donor_whatsapp,
      donor_email: donor.donor_email,
      donor_address: donor.donor_address,
      donor_area: donor.donor_area,
      donor_ladmark: donor.donor_ladmark,
      donor_city: donor.donor_city,
      donor_state: donor.donor_state,
      donor_pin_code: donor.donor_pin_code,
      donor_type: donor.donor_type,
    };
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    if (id) {
      data.donor_related_id = id;
    }
    var v = document.getElementById("addIndiv").checkValidity();
    var v = document.getElementById("addIndiv").reportValidity();

   
    e.preventDefault();

    if (v) {
      setIsButtonDisabled(true)
      axios({
        url: baseURL+"/create-donor",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        
        NotificationManager.success("Donor Created Sucessfully");
        history.push("listing");
      });
    }
  };

  const hr = {
    marginTop: "0rem",
  };

  const [states, setStates] = useState([]);
  useEffect(() => {
    var theLoginToken = localStorage.getItem('login');       
        
      const requestOptions = {
            method: 'GET', 
            headers: {
               'Authorization': 'Bearer '+theLoginToken
            }             
      };     


    fetch(baseURL+'/fetch-states', requestOptions)
    .then(response => response.json())
    .then(data => setStates(data.states)); 
  }, []);

  return (
    <div className="textfields-wrapper">
      <Pagedonor_titleBar donor_title="Create Individual Donor" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <h1>Personal Details</h1>
          <hr style={hr} />
          <div className="row">
          <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  select
                  required
                  label="Donor Type"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Donor Type"
                  name="donor_type"
                  value={donor.donor_type}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {company_type.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Title"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Title"
                  name="donor_title"
                  value={donor.donor_title}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {donor.donor_type == 'Individual' ?
                    
                    title.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                  ))
                  
                  :
                    title1.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  autoComplete="Name"
                  name="donor_full_name"
                  value={donor.donor_full_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  select
                  label="Gender"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="donor_gender"
                  value={donor.donor_gender}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            {donor.donor_type == 'Individual' ?
            "" :
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Contact Name"
                  autoComplete="Name"
                  name="donor_contact_name"
                  value={donor.donor_contact_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
}
{donor.donor_type == 'Individual' ?
            "" :
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Contact Designation"
                  autoComplete="Name"
                  name="donor_contact_designation"
                  value={donor.donor_contact_designation}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
}
            <div className="col-sm-6 col-md-6 col-xl-3">
              <InputMask
                mask="aaaaa 9999 a"
                formatChars={{
                  9: "[0-9]",
                  a: "[a-z]",
                }}
                value={donor.donor_pan_no}
                onChange={(e) => onChangePanNumber(e)}
              >
                {() => <TextField label="PAN Number" />}
              </InputMask>

              <span id="lblPANCard" class="error">
                Invalid PAN Number
              </span>
            </div>
            {donor.donor_type == 'Individual' ?
            
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Father Name"
                  autoComplete="Name"
                  name="donor_father_name"
                  value={donor.donor_father_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> : ""}
            {donor.donor_type == 'Individual' ?
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mother Name"
                  autoComplete="Name"
                  name="donor_mother_name"
                  value={donor.donor_mother_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> : ""}
            {donor.donor_type == 'Individual' ?
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Spouse Name"
                  autoComplete="Name"
                  name="donor_spouse_name"
                  value={donor.donor_spouse_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>: ""}
            {donor.donor_type == 'Individual' ?
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="DOB"
                  id="dateEntered"
                  autoComplete="Name"
                  name="donor_dob_annualday"
                  type="date"
                  helperText="Date of Birthday"
                  onChange={(e) => onInputChange(e)}
                />
                <span id="lblDateCard" class="error">
                  Invalid Date format
                </span>
              </div>
            </div>: ""}
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="DOA"
                  autoComplete="Name"
                  name="donor_doa"
                  type="date"
                  value={donor.donor_doa}
                  helperText="Date of Anniversary"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="donor_remarks"
                  value={donor.donor_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            
            
          </div>

          <h1>Communication Details</h1>
          <hr style={hr} />

          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile Phone"
                  type="text"
                  required
                  style={{ MozAppearance:'textfield'}}
                  
                  autoComplete="Name"
                  name="donor_mobile"
                  inputProps={{ maxLength: 10,minLength: 10  }}
                  value={donor.donor_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Whatsapp"
                  type="text"
                  
                  inputProps={{ maxLength: 10,minLength: 10 }}
                  autoComplete="Name"
                  name="donor_whatsapp"
                  value={donor.donor_whatsapp}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="Name"
                  name="donor_email"
                  value={donor.donor_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
          </div>
          <h3>Address</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="House & Street Number Address"
                  autoComplete="Name"
                  name="donor_address"
                  value={donor.donor_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="City"
                  autoComplete="Name"
                  name="donor_city"
                  value={donor.donor_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="State"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="donor_state"
                  value={donor.donor_state}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {states.map((newstate,key) => (
                    <MenuItem key={newstate.id} value={newstate.state_name}>
                      {newstate.state_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Pincode"
                  type="text"
                  
                  inputProps={{ maxLength: 6 }}
                  autoComplete="Name"
                  name="donor_pin_code"
                  value={donor.donor_pin_code}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          
          <div className="receiptbuttons">
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
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;
