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

const unit = [
   {
     value: "Kg",
     label: "Kg",
   },
   {
     value: "Ton",
     label: "Ton",
   },
];

const ConsumptionDownload = (props) => {
  let history = useHistory();
  var today = new Date(),

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [receiptsdwn, setConsumptionDownload] = useState({
   cons_from_date: "2023-04-01",
   cons_to_date: date,
   cons_sub_item: "",
   cons_sub_unit: "",
    
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

    const [item, setItem] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  

      fetch(baseURL+'/fetch-item', requestOptions)
      .then(response => response.json())
      .then(data => setItem(data.item)); 
    }, []);

  const onInputChange = (e) => {
   setConsumptionDownload({
      ...receiptsdwn,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
       cons_from_date: receiptsdwn.cons_from_date,
       cons_to_date: receiptsdwn.cons_to_date,
       cons_sub_item: receiptsdwn.cons_sub_item,
       cons_sub_unit: receiptsdwn.cons_sub_unit,
      
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();

if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/download-consumption",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'consumption_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Consumption is Downloaded Successfully");
        setIsButtonDisabled(false)
    
    }).catch((err) =>{
     NotificationManager.error("Consumption is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Consumption" match={props.match} />
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Please select From Date"
                  autoComplete="Name"
                  name="cons_from_date"
                  value={receiptsdwn.cons_from_date}
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
                  name="cons_to_date"
                  value={receiptsdwn.cons_to_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 id="select-donation_type"
                 select
                 label="Item"
                 name="cons_sub_item"
                 value={receiptsdwn.cons_sub_item}
                 onChange={(e) => onInputChange(e)}
                 SelectProps={{
                   MenuProps: {},
                 }}
                 fullWidth
               >
                  {item.map((option) => (
                       <MenuItem key={option.item_name} value={option.item_name}>
                         {option.item_name}
                       </MenuItem>
                     ))}
               </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 id="select-unit"
                 select
                 label="Unit"
                 name="cons_sub_unit"
                 value={receiptsdwn.cons_sub_unit}
                 onChange={(e) => onInputChange(e)}
                 SelectProps={{
                   MenuProps: {},
                 }}
                 fullWidth
               >
                 {unit.map((option) => (
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

export default ConsumptionDownload;
