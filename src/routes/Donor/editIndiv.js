import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import InputMask from "react-input-mask";
import AddToGroup from "./addToGroup";
import { NotificationManager,} from "react-notifications";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import honorific from "../honorific";
import company_type from "../company_type";
import { RssFeed } from "@material-ui/icons";


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

const EditIndiv = (props) => {
  let history = useHistory();
  const [donor, setDonor] = useState({
    donor_full_name: "",
    donor_title: "",
    donor_gender: "",
    donor_father_name: "",
    donor_mother_name: "",
    donor_spouse_name: "",
    donor_contact_name: "",
    donor_contact_designation: "",
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

  
  const [family_related_id, setFamilyRelatedId] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [loader, setLoader]= useState(true);
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
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

  const onChangePanNumber = (e) => {
    setDonor({ ...donor, donor_pan_no: e.target.value });
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
      
      setDonor(res.data.donor);
      setLoader(false);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    
    let data = {
      donor_full_name: donor.donor_full_name,
      donor_title: donor.donor_title,
      donor_type: donor.donor_type,
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
      
    };
    var v = document.getElementById("editIndiv").checkValidity();
    var v = document.getElementById("editIndiv").reportValidity();

    
    e.preventDefault();
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/update-donor-by-id/" + id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      if(res.data.code == 201){
        NotificationManager.success("Data Updated Sucessfully");
        history.push("listing");
      }else if(res.data.code == 401){
        NotificationManager.error("Email Duplicate Entry");
      }else if(res.data.code == 402){
        NotificationManager.error("Mobile Duplicate Entry");
      }else{
        NotificationManager.error("Data Duplicate Entry");
      }
      
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
        donor_related_id: family_related_id,
      };
    } else {
      data = {
        leave_family_group: true,
      };
    }

    axios({
      url: baseURL+"/update-donor-by-id/" + id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Data Sucessfully Removed From the Group");
      
      setShowmodal(false);
    });
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
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <PageTitleBar title="Edit Donor" />
      <RctCollapsibleCard>
        <form id="editIndiv" autoComplete="off">
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
                  select
                  label="Title"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your Title"
                  name="donor_title"
                  required
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
            </div>: ""}
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
            </div>: ""}
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
                  autoComplete="Name"
                  name="donor_dob_annualday"
                  type="date"
                  value={donor.donor_dob_annualday}
                  helperText="Date of Birthday"
                  onChange={(e) => onInputChange(e)}
                />
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
                  helperText="Date of Anniversary"
                  value={donor.donor_doa}
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
                  required
                  label="Mobile Phone"
                  inputProps={{ maxLength: 10 }}
                  
                  type="text"
                  autoComplete="Name"
                  name="donor_mobile"
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
                  inputProps={{ maxLength: 10 }}
                  
                  type="text"
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
                  autoComplete="Name"
                  name="donor_email"
                  type="email"
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
                  helperText="Please select your State"
                  name="donor_state"
                  value={donor.donor_state}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {states.map((state, key) => (
                    <MenuItem key={state.id} value={state.state_name}>
                      {state.state_name}
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
                  
                  type="text"
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
              className="mr-10 mb-10"
              type="submit"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
            
            {donor.donor_related_id == donor.indicomp_fts_id ? (
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
            {donor.donor_related_id == donor.indicomp_fts_id ? (
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

export default EditIndiv;
