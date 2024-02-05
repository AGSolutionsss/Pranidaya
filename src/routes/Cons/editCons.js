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
    const [cons, setCons] = useState({
        cons_date : "",
        cons_count: "",
        cons_sub_data: "",
    });

    const useTemplate = {id: "", cons_sub_item:"", cons_sub_qnty:"",cons_sub_unit:""};

    const [users, setUsers] = useState([useTemplate]);

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

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        
        axios({
          url: baseURL+"/fetch-cons-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setCons(res.data.cons);
          setUsers(res.data.consSub);
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
        setCons({
            ...cons,
            [e.target.name]: e.target.value,
        });
        
    };

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
            cons_date : cons.cons_date,
            cons_count : cons.cons_count,
            cons_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-cons/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Consumption is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Consumption" match={props.match} />
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
                  name="cons_date"
                  disabled
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
                        <div className="col-sm-12 col-md-12 col-xl-4">
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
                        <div className="col-sm-12 col-md-12 col-xl-4">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Quantity"
                                autoComplete="Name"
                                name="cons_sub_qnty"
                                inputProps={{ maxLength: 6, minLength: 1 }}
                                value={user.cons_sub_qnty}
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
                    </div> 
                ))
            }
            <div className="row">
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