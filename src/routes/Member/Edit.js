/**
 * Material Text Field
 */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {baseURL} from '../../api';
// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { SelectionState } from "draft-js";
import EditComp from "./editComp";
import EditIndiv from "./editIndiv";

export default function Edit (props) {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
 const [usertype,setUsertype]=useState('')

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
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
      console.log("editdon", res.data)
      localStorage.setItem("donType", res.data.individualCompany.indicomp_type);
      setUsertype(res.data.individualCompany.indicomp_type)

    });
  }, []);

 
  console.log(localStorage.getItem("donType"))
  console.log(id)
  console.log(usertype)

  if (localStorage.getItem("donType") == "Individual") {
    return (
      <EditIndiv id={id} ></EditIndiv>
    )
  }
  
  return(
    <EditComp id={id}  ></EditComp>

  )
  

};

