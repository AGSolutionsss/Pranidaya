/**
 * Material Text Field
 */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { SelectionState } from "draft-js";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import InputMask from "react-input-mask";
import states from "../states";
import AddToGroup from "./addToGroup";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';

const honorific = [
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

const corr_preffer = [
  {
    value: "Registered",
    label: "Registered",
  },
  {
    value: "Branch Office",
    label: "Branch Office",
  },
  {
    value: "Digital",
    label: "Digital",
  },
];

const donor_type = [
  {
    value: "Member",
    lablel: "Member",
  },
  {
    value: "Donor",
    label: "Donor",
  },
  {
    value: "Member+Donor",
    label: "Member+Donor",
  },
  {
    value: "None",
    label: "None",
  },
];

const source = [
  {
    value: "Ekal Run",
    label: "Ekal Run",
  },
  {
    value: "Sakranti",
    label: "Sakranti",
  },
];

const belongs_to = [
  {
    value: "Chapter",
    label: "Chapter",
  },
  {
    value: "Mahila",
    label: "Mahila",
  },
  {
    value: "Yuva",
    label: "Yuva",
  },
];

const company_type = [
  {
    value: "Private",
    label: "Private",
  },
  {
    value: "Public",
    label: "Public",
  },
  {
    value: "Public",
    label: "Public",
  },
  {
    value: "Trust",
    label: "Trust",
  },
  {
    value: "Society",
    label: "Society",
  },
  {
    value: "Others",
    label: "Others",
  },
];

const csr = [
  {
    value: "0",
    label: "No",
  },
  {
    value: "1",
    label: "Yes",
  },
];
const corrpreffer = [
  {
    value: "Registered",
    label: "Registered",
  },
  {
    value: "Branch Office",
    label: "Branch Office",
  },
  {
    value: "Digital",
    label: "Digital",
  },
];



const EditComp = (props) => {
  let history = useHistory();
  const [donor, setDonor] = useState({
    indicomp_full_name: "",
    indicomp_com_contact_name: "",
    indicomp_com_contact_designation: "",
    indicomp_gender: "",
    indicomp_dob_annualday: "",
    indicomp_pan_no: "",
    indicomp_image_logo: "",
    indicomp_remarks: "",
    indicomp_promoter: "",
    indicomp_belongs_to: "",
    indicomp_source: "",
    indicomp_donor_type: "",
    indicomp_csr: "",
    indicomp_type: "",
    indicomp_mobile_phone: "",
    indicomp_mobile_whatsapp: "",
    indicomp_email: "",
    indicomp_website: "",
    indicomp_res_reg_address: "",
    indicomp_res_reg_area: "",
    indicomp_res_reg_ladmark: "",
    indicomp_res_reg_city: "",
    indicomp_res_reg_state: "",
    indicomp_res_reg_pin_code: "",
    indicomp_off_branch_address: "",
    indicomp_off_branch_area: "",
    indicomp_off_branch_ladmark: "",
    indicomp_off_branch_city: "",
    indicomp_off_branch_state: "",
    indicomp_off_branch_pin_code: "",
    indicomp_corr_preffer: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [loader, setLoader]= useState(true);
  // var url = new URL(window.location.href);
  // var id = url.searchParams.get("id");
  var id = props.id;

  // const { personName, userName, mobile, email } = user;
  const validateOnlyDigits = (inputtxt) => {

    // function phonenumber(inputtxt)
   //{
     var phoneno = /^\d+$/;
     if(inputtxt.match(phoneno) || inputtxt.length==0){
         return true;
           }
         else
           {
           //alert("message");
           return false;
           }
   }



  // const { personName, userName, mobile, email } = user;
  const onInputChange = (e) => {

    if(e.target.name=="indicomp_mobile_phone"){


      // alert('aaya')

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    } else if(e.target.name=="indicomp_mobile_whatsapp"){


      // alert('aaya')

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else if(e.target.name=="indicomp_res_reg_pin_code"){


      // alert('aaya')

      if(validateOnlyDigits(e.target.value)){
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else if(e.target.name=="indicomp_off_branch_pin_code"){


      // alert('aaya')

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

  const onChangePanNumber = (e) => {
    setDonor({ ...donor, indicomp_pan_no: e.target.value });
  };

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
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
      console.log("editdon", res.data);
      setLoader(false)
      setDonor(res.data.individualCompany);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      indicomp_full_name: donor.indicomp_full_name,
      indicomp_type: donor.indicomp_type,
      indicomp_com_contact_name: donor.indicomp_com_contact_name,
      indicomp_com_contact_designation: donor.indicomp_com_contact_designation,
      indicomp_gender: donor.indicomp_gender,
      indicomp_dob_annualday: donor.indicomp_dob_annualday,
      indicomp_pan_no: donor.indicomp_pan_no,
      indicomp_image_logo: donor.indicomp_image_logo,
      indicomp_remarks: donor.indicomp_remarks,
      indicomp_promoter: donor.indicomp_promoter,
      indicomp_source: donor.indicomp_source,
      indicomp_csr: donor.indicomp_csr,
      indicomp_mobile_phone: donor.indicomp_mobile_phone,
      indicomp_mobile_whatsapp: donor.indicomp_mobile_whatsapp,
      indicomp_email: donor.indicomp_email,
      indicomp_website: donor.indicomp_website,
      indicomp_res_reg_address: donor.indicomp_res_reg_address,
      indicomp_res_reg_area: donor.indicomp_res_reg_area,
      indicomp_res_reg_ladmark: donor.indicomp_res_reg_ladmark,
      indicomp_res_reg_city: donor.indicomp_res_reg_city,
      indicomp_res_reg_state: donor.indicomp_res_reg_state,
      indicomp_res_reg_pin_code: donor.indicomp_res_reg_pin_code,
      indicomp_off_branch_address: donor.indicomp_off_branch_address,
      indicomp_off_branch_area: donor.indicomp_off_branch_area,
      indicomp_off_branch_ladmark: donor.indicomp_off_branch_ladmark,
      indicomp_off_branch_city: donor.indicomp_off_branch_city,
      indicomp_off_branch_state: donor.indicomp_off_branch_state,
      indicomp_off_branch_pin_code: donor.indicomp_off_branch_pin_code,
      indicomp_corr_preffer: donor.indicomp_corr_preffer,
      indicomp_belongs_to: donor.indicomp_belongs_to,
      indicomp_donor_type: donor.indicomp_donor_type,
    };
    
    var v = document.getElementById("editComp").reportValidity();
    e.preventDefault();
    if(v){
      setIsButtonDisabled(true)
      axios({
        url: baseURL+"/update-donor/" + id,
        method: "PUT",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        console.log("editdonor", res.data);
        NotificationManager.success("Data Updated Sucessfully");
        history.push("listing");
      });
    }
    
  };

  const hr = {
    marginTop: "0rem",
  };
  const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
  };

  const familyGroupStatus = (status) => {
    var data = {};

    if (status == "add_to_family_group") {
      data = {
        indicomp_related_id: family_related_id,
      };
    } else {
      data = {
        leave_family_group: true,
      };
    }

    axios({
      url: baseURL+"/update-donor/" + id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Data Sucessfully Removed From the Group");
      setDonor(res.data.individualCompany);
      //alert("success");
      setShowmodal(false);
    });
  };

  return (
    <div className="textfields-wrapper">
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <PageTitleBar title="Edit Company Donor" match={props.match} />
      <RctCollapsibleCard>
        <form id="editComp" autoComplete="off">
          <h1>Personal Details</h1>
          <hr style={hr} />
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Company Name"
                  required
                  autoComplete="Name"
                  name="indicomp_full_name"
                  value={donor.indicomp_full_name}
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
                  label="Type"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Type"
                  name="indicomp_type"
                  value={donor.indicomp_type}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {company_type.map((option) => (
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
                  fullWidth
                  required
                  label="Contact Name"
                  autoComplete="Name"
                  name="indicomp_com_contact_name"
                  value={donor.indicomp_com_contact_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Designation"
                  autoComplete="Name"
                  name="indicomp_com_contact_designation"
                  value={donor.indicomp_com_contact_designation}
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
                  label="Gender"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="indicomp_gender"
                  value={donor.indicomp_gender}
                  onChange={(e) => onInputChange(e)}
                  helperText="Please select your Gender"
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

            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Annual Day"
                  autoComplete="Name"
                  id="annualday"
                  name="indicomp_dob_annualday"
                  type="date"
                  value={donor.indicomp_dob_annualday}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <InputMask
                  mask="aaaaa 9999 a"
                  formatChars={{
                    9: "[0-9]",
                    a: "[A-Z]",
                  }}
                  value={donor.indicomp_pan_no}
                  onChange={(e) => onChangePanNumber(e)}
                >
                  {() => <TextField  required label="PAN Number" />}
                </InputMask>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Upload Logo"
                  autoComplete="Name"
                  name="indicomp_image_logo"
                  type="file"
                  disabled
                  helperText="Upload Company Logo"
                  value={donor.indicomp_image_logo}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="indicomp_remarks"
                  value={donor.indicomp_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Promoter"
                  autoComplete="Name"
                  name="indicomp_promoter"
                  value={donor.indicomp_promoter}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  select
                  label="Belongs To"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Belongs To"
                  name="indicomp_belongs_to"
                  value={donor.indicomp_belongs_to}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {belongs_to.map((option) => (
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
                  id="select-corrpreffer"
                  select
                  label="Source"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Source"
                  name="indicomp_source"
                  value={donor.indicomp_source}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {source.map((option) => (
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
                  id="select-corrpreffer"
                  select
                  label="Donor Type"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Donor Type"
                  name="indicomp_donor_type"
                  value={donor.indicomp_donor_type}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {donor_type.map((option) => (
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
                  id="select-corrpreffer"
                  select
                  label="CSR"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your CSR"
                  name="indicomp_csr"
                  value={donor.indicomp_csr}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {csr.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>
          <h1>Communication Details</h1>
          <hr style={hr} />
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Mobile Phone"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  type="number"
                  autoComplete="Name"
                  name="indicomp_mobile_phone"
                  value={donor.indicomp_mobile_phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Whatsapp"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  type="number"
                  autoComplete="Name"
                  name="indicomp_mobile_whatsapp"
                  value={donor.indicomp_mobile_whatsapp}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  autoComplete="Name"
                  type="email"
                  name="indicomp_email"
                  value={donor.indicomp_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Website"
                  autoComplete="Name"
                  name="indicomp_website"
                  value={donor.indicomp_website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <h3>Residence Address</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="House & Street Number"
                  autoComplete="Name"
                  name="indicomp_res_reg_address"
                  value={donor.indicomp_res_reg_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Area"
                  autoComplete="Name"
                  name="indicomp_res_reg_area"
                  value={donor.indicomp_res_reg_area}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Landmark"
                  autoComplete="Name"
                  name="indicomp_res_reg_ladmark"
                  value={donor.indicomp_res_reg_ladmark}
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
                  name="indicomp_res_reg_city"
                  value={donor.indicomp_res_reg_city}
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
                  helperText="Please select your State"
                  name="indicomp_res_reg_state"
                  value={donor.indicomp_res_reg_state}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {states.map((option) => (
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
                  fullWidth
                  required
                  label="Pincode"
                  inputProps={{ maxLength: 6 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                  type="number"
                  autoComplete="Name"
                  name="indicomp_res_reg_pin_code"
                  value={donor.indicomp_res_reg_pin_code}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <h3>Office Address</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Office & Street Number"
                  autoComplete="Name"
                  name="indicomp_off_branch_address"
                  value={donor.indicomp_off_branch_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Area"
                  autoComplete="Name"
                  name="indicomp_off_branch_area"
                  value={donor.indicomp_off_branch_area}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Landmark"
                  autoComplete="Name"
                  name="indicomp_off_branch_ladmark"
                  value={donor.indicomp_off_branch_ladmark}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="City"
                  autoComplete="Name"
                  name="indicomp_off_branch_city"
                  value={donor.indicomp_off_branch_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  select
                  label="State"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your State"
                  name="indicomp_off_branch_state"
                  value={donor.indicomp_off_branch_state}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {states.map((option) => (
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
                  fullWidth
                  label="Pincode"
                  inputProps={{ maxLength: 6 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                  type="number"
                  autoComplete="Name"
                  name="indicomp_off_branch_pin_code"
                  value={donor.indicomp_off_branch_pin_code}
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
                  label="Correspondence Preference"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Correspondence Preference"
                  name="indicomp_corr_preffer"
                  value={donor.indicomp_corr_preffer}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {corrpreffer.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>
          <div className="receiptbuttons">
            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
            {/* <Button className="mr-10 mb-10" color="danger">
              Cancel
            </Button> */}
            {donor.indicomp_related_id == donor.indicomp_fts_id ? (
              <Button
                onClick={() => openmodal()}
                className="mr-10 mb-10"
                color="success"
              >
                Attach to Group
              </Button>
            ) : (
              <Button
                disabled
                onClick={() => openmodal()}
                className="mr-10 mb-10"
              >
                Attach to Group
              </Button>
            )}
            {donor.indicomp_related_id == donor.indicomp_fts_id ? (
              <Button disabled className="mr-10 mb-10">
                Leave Group
              </Button>
            ) : (
              <Button
                className="mr-10 mb-10"
                color="info"
                onClick={() => familyGroupStatus("leave_family_group")}
              >
                Leave Group
              </Button>
            )}
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>Add to Group</ModalHeader>
        <ModalBody>
          <AddToGroup id={donor.id} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      </>}
    </div>
  );
};

export default EditComp;
