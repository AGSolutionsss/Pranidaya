import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import { NotificationManager} from "react-notifications";
import {baseURL} from '../../../api';
import company_type from "../../company_type";

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

const DonorDownload = (props) => {
  const [downloadDonor, setDonorDownload] = useState({
   donor_type: "",
   donor_gender: "",
    
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
   setDonorDownload({
      ...downloadDonor,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
       donor_type: downloadDonor.donor_type,
       donor_gender: downloadDonor.donor_gender,
      
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();
    console.log("Data : ",data);
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/download-donor",
      method: "POST",
      data,
     headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'donor_list.csv'); //or any other extension
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Donor is Downloaded Successfully");
        setIsButtonDisabled(false);
    }).catch((err) =>{
     NotificationManager.error("Donor is Not Downloaded");
     setIsButtonDisabled(false);
   });
  }
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Donor" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
          <h3 style={{color: 'red'}}>Leave blank if you want all records.</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                 id="select-donation_type"
                 select
                 label="Donor Type"
                 name="donor_type"
                 value={downloadDonor.donor_type}
                 onChange={(e) => onInputChange(e)}
                 SelectProps={{
                   MenuProps: {},
                 }}
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
            {downloadDonor.donor_type == 'Individual' ?
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                 id="select-corrpreffer"
                 select
                 label="Gender"
                 SelectProps={{
                   MenuProps: {},
                 }}
                 name="donor_gender"
                 value={downloadDonor.donor_gender}
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
            </div>: ""}
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

export default DonorDownload;
