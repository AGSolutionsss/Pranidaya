import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Moment from 'moment';
import {NotificationManager,} from "react-notifications";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

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

export default function EditReceipt() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  
  const [loader, setLoader]= useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  let history = useHistory();
  const [donors, setDonors] = useState([]);
  const [donor, setDonor] = React.useState({
   
    m_receipt_date: "",
    indicomp_fts_id: "",
    m_receipt_total_amount: "",
    m_receipt_tran_pay_mode: "",
    m_receipt_tran_pay_details: "",
    m_receipt_remarks: "",
    m_receipt_reason: "",
    m_receipt_sub_data: "",
    m_receipt_count: "",
    m_receipt_occasional: "",
    m_receipt_vehicle_no: "",
    donor: {
			donor_full_name:"",
      donor_pan_no: "",
      donor_fts_id:"",
    }
  });

  const useTemplate = {id:"", purchase_sub_item:"", purchase_sub_qnty:"", purchase_sub_unit:"", purchase_sub_amount: ""};

    const [users, setUsers] = useState([useTemplate]);

    const onChange = (e, index) =>{
      if(e.target.name=="purchase_sub_qnty"){
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
        }else{
            setDonor({
                ...donor,
                [e.target.name]: e.target.value,
            });
        }
    };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        m_receipt_date: donor.m_receipt_date,
        indicomp_fts_id: donors.donor_fts_id,
      m_receipt_total_amount: donor.m_receipt_total_amount,
      m_receipt_tran_pay_mode: donor.m_receipt_tran_pay_mode,
      m_receipt_tran_pay_details: donor.m_receipt_tran_pay_details,
      m_receipt_remarks: donor.m_receipt_remarks,
      m_receipt_reason: donor.m_receipt_reason,
      m_receipt_count: donor.m_receipt_count,
      m_receipt_sub_data: users,
      m_receipt_occasional: donor.m_receipt_occasional,
      m_receipt_vehicle_no: donor.m_receipt_vehicle_no,
    };
    var v = document.getElementById("createrec").checkValidity();
     var v = document.getElementById("createrec").reportValidity();
     e.preventDefault();
    
    if (v) {
      setIsButtonDisabled(true)
      axios({
        url: baseURL+"/update-m-receipt/" + id,
        method: "PUT",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        NotificationManager.success("Receipt Updated Sucessfully");
        history.push("listing");
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
      url: baseURL+"/fetch-m-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setDonor(res.data.receipts);
      setUsers(res.data.receiptSub);
      setDonors(res.data.donor);
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

  const pan = donors.donor_pan_no == "" ? "NA" : donors.donor_pan_no;
  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <RctCollapsibleCard>
        <div className="receiptDetails">
          <h4>Name : {donors.donor_full_name}</h4>
          <h4>PDS Id : {donors.donor_fts_id}</h4>
          <h4>Pan No : {pan}</h4>
          <h4>Receipt Date : {Moment(donor.m_receipt_date).format('DD-MM-YYYY')}</h4>
          <h4>Year : {donor.m_receipt_financial_year}</h4>
        </div>
        <div className="receiptDetails">
          
          <h4>Receipt Ref : {donor.m_receipt_ref_no}</h4>
          <h4></h4>
          <h4></h4>
          <h4></h4>
          <h4></h4>
        </div>
        
        <form id="createrec" autoComplete="off">
          <div className="row">
            
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="text"
                  fullWidth
                  label="Approx Value"
                  name="m_receipt_total_amount"
                  value={donor.m_receipt_total_amount}
                  
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  autoComplete="Approx Value"
                  inputProps={{ maxLength: 8 }}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-pay_mode"
                  fullWidth
                  label="Vehicle No"
                  name="m_receipt_vehicle_no"
                  value={donor.m_receipt_vehicle_no}
                  onChange={(e) => onInputChange(e)}
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
                  label="On Occasion"
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
                  multiline
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  label="Remarks"
                  autoComplete="Remarks"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="text"
                  name="m_receipt_reason"
                  value={donor.m_receipt_reason}
                  multiline
                  required
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  label="Reason"
                  autoComplete="Reason"
                />
              </div>
            </div>
          </div>
          <hr/>
          {
            users.map((user, index)=>(
                <div className="row" key={index}>
                    <div className="col-sm-12 col-md-12 col-xl-4">
                        <div className="form-group">
                            <TextField
                                fullWidth
                                label="Item"
                                required
                                autoComplete="Name"
                                name="purchase_sub_item"
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                value={user.purchase_sub_item}
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
                        <div className="col-sm-12 col-md-12 col-xl-4">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                required
                                label="Quantity"
                                autoComplete="Name"
                                name="purchase_sub_qnty"
                                inputProps={{ maxLength: 6, minLength: 1 }}
                                value={user.purchase_sub_qnty}
                                onChange={e => onChange(e, index)}
                                />
                                
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-4">
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
                                name="purchase_sub_unit"
                                value={user.purchase_sub_unit}
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
                        
                        
                </div>
            ))
          }
          <div className="receiptbuttons mt-4">
            <Button
              type="submit"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
              className="mr-10 mb-10"
              color="primary"
            >
              Update
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
