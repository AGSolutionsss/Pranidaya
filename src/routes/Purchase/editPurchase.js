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
import MenuItem from "@material-ui/core/MenuItem";

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

const Edit = (props) => {

    let history = useHistory();
    const [purchase, setPurchase] = useState({
        purchase_date : "",
        purchase_ref: "",
        purchase_vendor: "",
        purchase_bill_no: "",
        purchase_total_bill: "",
        purchase_count: "",
        purchase_sub_data: "",
    });

    const useTemplate = {id: "", purchase_sub_item:"", purchase_sub_amount:"", purchase_sub_qnty:"",purchase_sub_unit:""};

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
      }else if(e.target.name=="purchase_sub_amount"){
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

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        
        axios({
          url: baseURL+"/fetch-purchase-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setPurchase(res.data.purchase);
          setUsers(res.data.purchaseSub);
        });
      }, []);

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
        if(e.target.name=="purchase_total_bill"){
            if(validateOnlyDigits(e.target.value)){
                setPurchase({
                  ...purchase,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setPurchase({
                ...purchase,
                [e.target.name]: e.target.value,
            });
        }
    };

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  

      fetch(baseURL+'/fetch-vendor', requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
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

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const onUpdate = (e) => {
      e.preventDefault();
        let data = {
            purchase_date : purchase.purchase_date,
            purchase_vendor : purchase.purchase_vendor,
            purchase_bill_no : purchase.purchase_bill_no,
            purchase_total_bill : purchase.purchase_total_bill,
            purchase_count : purchase.purchase_count,
            purchase_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-purchase/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Purchase is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Purchase" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Date"
                  type="date"
                  autoComplete="Name"
                  name="purchase_date"
                  disabled
                  value={purchase.purchase_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Vendor"
                  autoComplete="Name"
                  name="purchase_vendor"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={purchase.purchase_vendor}
                  onChange={(e) => onInputChange(e)}
                  >
                  {vendor.map((option) => (
                    <MenuItem key={option.vendor_name} value={option.id}>
                      {option.vendor_name}
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
                  label="Bill No"
                 autoComplete="Name"
                  name="purchase_bill_no"
                  value={purchase.purchase_bill_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Total Amount"
                  autoComplete="Name"
                  name="purchase_total_bill"
                  inputProps={{ maxLength: 9, minLength: 1 }}
                  value={purchase.purchase_total_bill}
                  onChange={(e) => onInputChange(e)}
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
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Quantity"
                                autoComplete="Name"
                                name="purchase_sub_qnty"
                                inputProps={{ maxLength: 6, minLength: 1 }}
                                value={user.purchase_sub_qnty}
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
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Amount"
                                required
                                autoComplete="Name"
                                inputProps={{ maxLength: 9, minLength: 1 }}
                                name="purchase_sub_amount"
                                value={user.purchase_sub_amount}
                                onChange={e => onChange(e, index)}
                               />
                            </div>
                        </div>
                       
                    </div> 
                ))
            }
            <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onUpdate(e)}
              disabled={isButtonDisabled}
            >
              Update
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

export default Edit;