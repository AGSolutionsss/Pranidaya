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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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
    indicomp_fts_id: "",
    m_receipt_financial_year: "",
    m_receipt_date: todayback,
    m_receipt_total_amount: "",
    m_receipt_tran_pay_mode: "",
    m_receipt_tran_pay_details: "",
    m_receipt_email_count: "",
    m_receipt_count: "",
    m_receipt_reason: "",
    m_receipt_remarks: "",
    m_receipt_sub_data: "",
    m_receipt_occasional: "",
    m_receipt_vehicle_no: "",
  });

  const [fabric_inward_count, setCount] = useState(1);

  const useTemplate = {m_receipt_sub_item:"", m_receipt_sub_quantity:"", m_receipt_sub_unit:"", m_receipt_sub_amount: ""};

    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(fabric_inward_count + 1);
    }

    const validateOnlyNumber = (inputtxt) => {
      var phoneno = /^\d*\.?\d*$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
          return false;
      }
    }

    const onChange = (e, index) =>{
      if(e.target.name=="m_receipt_sub_quantity"){
        if(validateOnlyNumber(e.target.value)){
          const updatedUsers = users.map((user, i) => 
          index == i 
          ? Object.assign(user,{[e.target.name]: e.target.value}) 
          : user );
          setUsers(updatedUsers);
        }
      }else{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
      }
        
    };

    const removeUser = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setUsers(filteredUsers);
        setCount(fabric_inward_count - 1);
    }

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

    if(e.target.name=="m_receipt_total_amount"){

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
        indicomp_fts_id: userdata.donor_fts_id,
        m_receipt_financial_year:'2023-24',
        m_receipt_date: todayback,
        m_receipt_total_amount: donor.m_receipt_total_amount,
        m_receipt_tran_pay_mode: donor.m_receipt_tran_pay_mode,
        m_receipt_tran_pay_details: donor.m_receipt_tran_pay_details,
        m_receipt_remarks: donor.m_receipt_remarks,
        m_receipt_reason: donor.m_receipt_reason,
        m_receipt_email_count: donor.m_receipt_email_count,
        m_receipt_count : fabric_inward_count,
        m_receipt_sub_data : users,
        m_receipt_vehicle_no: donor.m_receipt_vehicle_no,
        m_receipt_occasional: donor.m_receipt_occasional,
    };
    var v = document.getElementById("createrec").checkValidity();
    var v = document.getElementById("createrec").reportValidity();
    e.preventDefault();
    if (v) {

      setIsButtonDisabled(true)
      
      axios({
        url: baseURL+"/create-m-receipt",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        } ,
      }).then((res) => {
        NotificationManager.success("Receipt Created Sucessfully");
        history.push("/app/receiptsM");
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

  const pan = userdata.donor_pan_no == "" ? "NA" : userdata.donor_pan_no;
  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      
      <RctCollapsibleCard heading="Material Receipt">
     
        <div className="receiptDetails">
          <h4>Name : {userdata.donor_full_name}</h4>
          <h4>PDS Id : {userdata.donor_fts_id}</h4>
          <h4>Pan No : {pan}</h4>
          <h4>Receipt Date : {Moment(donor.m_receipt_date).format('DD-MM-YYYY')}</h4>
          <h4>Year : {finalyear}</h4>
        </div>
        
        <form id="createrec" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="text"
                  fullWidth
                  type="text"
                  label="Approx Value"
                  name="m_receipt_total_amount"
                  inputProps={{ maxLength: 8 }}
                  value={donor.m_receipt_total_amount}
                  onChange={(e) => onInputChange(e)}
                  autoComplete="Approx Value"
                  
                />
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="text"
                  fullWidth
                  label="Vehicle No"
                  name="m_receipt_vehicle_no"
                  value={donor.m_receipt_vehicle_no}
                  onChange={(e) => onInputChange(e)}
                  autoComplete="Vehicle No"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="text"
                  name="m_receipt_occasional"
                  value={donor.m_receipt_occasional}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  label="On Occasion of"
                  autoComplete="Occasion"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="text"
                  name="m_receipt_remarks"
                  value={donor.m_receipt_remarks}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  label="Remarks"
                  autoComplete="Remarks"
                />
              </div>
            </div>
          </div>
          <hr/>
          {
            users.map((user, index)=>(
                <div className="row" key={index}>
                    <div className="col-sm-12 col-md-12 col-xl-3">
                        <div className="form-group">
                            <TextField
                                fullWidth
                                label="Item"
                                required
                                autoComplete="Name"
                                name="m_receipt_sub_item"
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                value={user.m_receipt_sub_item}
                                onChange={e => onChange(e, index)}
                                >
                                {item.map((option) => (
                                  <MenuItem key={option.item_name} value={option.item_name}>
                                    {option.item_name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                required
                                label="Quantity"
                                autoComplete="Name"
                                inputProps={{ maxLength: 6, minLength: 1 }}
                                name="m_receipt_sub_quantity"
                                value={user.m_receipt_sub_quantity}
                                onChange={e => onChange(e, index)}
                                />
                                
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Unit"
                                autoComplete="Name"
                                required
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                name="m_receipt_sub_unit"
                                value={user.m_receipt_sub_unit}
                                onChange={e => onChange(e, index)}
                                >
                                {unit.map((option) => (
                                  <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-xl-1">
                          <IconButton onClick={() => removeUser(index)}>
                          <DeleteIcon/>
                          </IconButton>
                        </div>
                </div>
            ))
          }
          <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Button className="mr-10 mb-10" color="primary" style={{width:"100px"}} variant="contained" onClick={(e) => addItem(e)}>
                  Add More</Button>
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
