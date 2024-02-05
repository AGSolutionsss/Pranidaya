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
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";


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

const Add = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    
    var today1 = new Date();
    var dd1 = String(today1.getDate()-2).padStart(2, "0");
    var mm1 = String(today1.getMonth() + 1).padStart(2, "0");
    var yyyy1 = today1.getFullYear();
    today1 = mm1 + "/" + dd1 + "/" + yyyy1;
    var todayback1 = yyyy1 + "-" + mm1 + "-" + dd1;

    const [cons, setCons] = useState({
        cons_date: todayback,
        cons_year: "2023-24",
        cons_count: "",
        cons_sub_data: "",
    });

    const [fabric_inward_count, setCount] = useState(1);

    const useTemplate = {cons_sub_item:"",  cons_sub_qnty:"", cons_sub_unit: ""};

    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(fabric_inward_count + 1);
    }

    const onChange = (e, index) =>{
      if(e.target.name=="cons_sub_qnty"){
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
        
        setCons({
            ...cons,
            [e.target.name]: e.target.value,
        });
        
        
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
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
    

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            cons_date : cons.cons_date,
            cons_year : "2023-24",
            cons_count : fabric_inward_count,
            cons_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-cons",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Consumption is Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Consumption" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Date"
                  type="date"
                  autoComplete="Name"
                  name="cons_date"
                  value={cons.cons_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            
            <hr/>
            {
                users.map((user, index)=>(
                    <div className="row" key={index}>
                        <div className="col-sm-12 col-md-12 col-xl-5">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Item"
                                required
                                autoComplete="Name"
                                name="cons_sub_item"
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                value={user.cons_sub_item}
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
                                name="cons_sub_qnty"
                                inputProps={{ maxLength: 6, minLength: 1 }}
                                value={user.cons_sub_qnty}
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
                                name="cons_sub_unit"
                                value={user.cons_sub_unit}
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
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
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
            </div>
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;