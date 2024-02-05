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

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

const user_type = [
    {
      value: "Manager",
      label: "Manager",
    },
    {
      value: "Viewer",
      label: "Viewer",
    },
];

const TeamDownload = (props) => {
  let history = useHistory();
  var today = new Date(),

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [receiptsdwn, setReceiptDownload] = useState({
   user_type_id: "",
   user_status: "",
   
    
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
       user_type_id: receiptsdwn.user_type_id,
       user_status: receiptsdwn.user_status,
       
      
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();

if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/download-team",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'team_list.csv');
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Report is Downloaded Successfully");
        setIsButtonDisabled(false)
    }).catch((err) =>{
     NotificationManager.error("Report is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Team" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <h3 style={{color: 'red'}}>Leave blank if you want all records.</h3>
         <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  autoComplete="Name"
                  label="User Type"
                  name="user_type_id"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  select
                  value={receiptsdwn.user_type_id}
                  onChange={(e) => onInputChange(e)}
                >
                    {user_type.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                         {option.label}
                       </MenuItem>
                     ))}
               </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  autoComplete="Name"
                  name="user_status"
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  select
                  value={receiptsdwn.user_status}
                  onChange={(e) => onInputChange(e)}
                >
                    {status.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                         {option.label}
                       </MenuItem>
                     ))}
               </TextField>
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

export default TeamDownload;
