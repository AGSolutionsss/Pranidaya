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

// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { SelectionState } from "draft-js";
import states from "../states";
import MenuItem from "@material-ui/core/MenuItem";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';

const Add = (props) => {
  let history = useHistory();
  const [chapter, setChapter] = useState({
    chapter_name: "",
    chapter_code: "",
    chapter_address: "",
    chapter_city: "",
    chapter_pin: "",
    chapter_state: "",
    chapter_phone: "",
    chapter_whatsapp: "",
    chapter_email: "",
    chapter_website: "",
    chapter_date_of_incorporation: "",
    chapter_region_code: "",
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const validateOnlyDigits = (inputtxt) => {
      var phoneno = /^\d+$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
        return false;
      }
    }


    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

  const onInputChange = (e) => {

    if(e.target.name=="chapter_pin"){


      // alert('aaya')

      if(validateOnlyDigits(e.target.value)){
        setChapter({
          ...chapter,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    } else if(e.target.name=="chapter_phone"){


      // alert('aaya')

      if(validateOnlyDigits(e.target.value)){
        setChapter({
          ...chapter,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else if(e.target.name=="chapter_whatsapp"){


      // alert('aaya')

      if(validateOnlyDigits(e.target.value)){
        setChapter({
          ...chapter,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else{

      setChapter({
      ...chapter,
      [e.target.name]: e.target.value,
    });
  }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      chapter_name: chapter.chapter_name,
      chapter_code: chapter.chapter_code,
      chapter_address: chapter.chapter_address,
      chapter_city: chapter.chapter_city,
      chapter_pin: chapter.chapter_pin,
      chapter_state: chapter.chapter_state,
      chapter_phone: chapter.chapter_phone,
      chapter_whatsapp: chapter.chapter_whatsapp,
      chapter_email: chapter.chapter_email,
      chapter_website: chapter.chapter_website,
      chapter_date_of_incorporation: chapter.chapter_date_of_incorporation,
      chapter_region_code: chapter.chapter_region_code,
    };
    var v = document.getElementById('addChap').checkValidity();
    var v = document.getElementById('addChap').reportValidity();
    e.preventDefault();

if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/create-chapter",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      console.log("edit1", res.data);
      NotificationManager.success("Chapter is Created Successfully");
        setIsButtonDisabled(false)
      history.push('listing');
    });
  }
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Chapter" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="addChap" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth label="Chapter Name"
                  autoComplete="Chapter Name"
                  name="chapter_name"
                  required
                  value={chapter.chapter_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Address"
                  required
                  autoComplete="Name"
                  name="chapter_address"
                  value={chapter.chapter_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="City"
                  required
                  autoComplete="Name"
                  name="chapter_city"
                  value={chapter.chapter_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Pin"
                  type="text"
                  required
                  inputProps={{ maxLength: 6 }}
                  autoComplete="Name"
                  name="chapter_pin"
                  value={chapter.chapter_pin}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  select
                  label="State"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  helperText="Please select your State"
                  name="chapter_state"
                  value={chapter.chapter_state}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {states.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Phone"
                  type="text"
                  required
                  inputProps={{ maxLength: 10 }}
                  autoComplete="Name"
                  name="chapter_phone"
                  value={chapter.chapter_phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Whatsapp"
                  type="number"
                  inputProps={{ maxLength: 10 }}
                  autoComplete="Name"
                  name="chapter_whatsapp"
                  value={chapter.chapter_whatsapp}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  autoComplete="Name"
                  required
                  type="email"
                  name="chapter_email"
                  value={chapter.chapter_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Website"
                  autoComplete="Name"
                  name="chapter_website"
                  value={chapter.chapter_website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  helperText="Select Date of Incorporation"
                  autoComplete="Name"
                  name="chapter_date_of_incorporation"
                  value={chapter.chapter_date_of_incorporation}
                  onChange={(e) => onInputChange(e)}
                  type="date"
                />
              </div>
            </div>
            {/* <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Region Code"
                  autoComplete="Name"
                  name="chapter_region_code"
                  value={chapter.chapter_region_code}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> */}

            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;
