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
import InputMask from "react-input-mask";
import {baseURL} from '../../api';
// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import states from "../states";

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
    value: "PSU",
    label: "PSU",
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

const state = [
  {
    value: "Karnataka",
    label: "Karnataka",
  },
  {
    value: "Kerala",
    label: "Kerala",
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

// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { SelectionState } from "draft-js";

const Add = (props) => {
  let history = useHistory();
  const [donor, setDonor] = useState({
    indicomp_full_name: "",
    title: "",
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
    indicomp_corr_preffer: "Registered",
    indicomp_csr: "",
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");

  // const { personName, userName, mobile, email } = user;
  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePanNumber = (e) => {
    setDonor({ ...donor, indicomp_pan_no: e.target.value });
  };

  const validate = () => {
    var txtPANCard = document.getElementById("txtPANCard2");
    var lblPANCard = document.getElementById("lblPANCard2");
    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    if (regex.test(txtPANCard.value)) {
      lblPANCard.style.visibility = "hidden";
      return true;
    } else {
      lblPANCard.style.visibility = "visible";
      return false;
    }
  };
  

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      indicomp_full_name: donor.indicomp_full_name,
      title: donor.title,
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
      indicomp_csr: donor.indicomp_csr,
    };

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    if (id) {
      data.donor_related_id = id;
    }

    var v = document.getElementById("addComp").checkValidity();
    var v = document.getElementById("addComp").reportValidity();
    // const val = validate();
    e.preventDefault();

    if (v) {
      axios({
        url: baseURL+"/create-donor",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        console.log("edit1", res.data);
        alert("success");
        history.push("listing");
      });
    }
  };

  const hr = {
    marginTop: "0rem",
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Company Donor" match={props.match} />
      <RctCollapsibleCard>
        <form id="addComp" autoComplete="off">
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
                  select
                  label="Type"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  required
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
                  label="Contact Name"
                  required
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
                  select
                  label="Gender"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  required
                  helperText="Please select your Gender"
                  name="indicomp_gender"
                  value={donor.indicomp_gender}
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
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Annual Day"
                  id="annualday"
                  autoComplete="Name"
                  name="indicomp_dob_annualday"
                  type="date"
                  value={donor.indicomp_dob_annualday}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
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
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Upload Logo"
                  autoComplete="Name"
                  name="indicomp_image_logo"
                  type="file"
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
        </form>

        <h1>Communication Details</h1>
        <hr style={hr} />
        <form>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile Phone"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  type="number"
                  required
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
                  type="number"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
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
                  label="City"
                  required
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
                  label="Pincode"
                  type="number"
                  inputProps={{ maxLength: 6 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                  required
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
                  type="number"
                  inputProps={{ maxLength: 6 }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
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
                  select
                  label="Correspondence Preference"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  required
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
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
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
