import React, { useEffect, useState } from "react";
import {baseURL} from '../../api';
import axios from "axios";
import EditIndiv from "./editIndiv";

export default function Edit (props) {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
 const [usertype,setUsertype]=useState('')

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
      localStorage.setItem("donType", res.data.donor.donor_type);
      setUsertype(res.data.donor.donor_type)

    });
  }, []);

  if (localStorage.getItem("donType") == "Individual") {
    return (
      <EditIndiv id={id} ></EditIndiv>
    )
  }
  
  return(
    <EditIndiv id={id}  ></EditIndiv>

  )
  

};

