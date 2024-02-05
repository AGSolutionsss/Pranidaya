import React, { Component } from "react";
import {
  FormGroup,
  Input,
  Form,
  Label,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {baseURL} from '../../../../api';
import IntlMessages from "Util/IntlMessages";

export default class Profile extends Component {
  
  state = {
    userdata: {},
    firstName:'',
    phone:'',
    email:'',
    loader:false,
  };
  
  getData = () => {
    axios({
      url: baseURL+"/fetch-profile",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        this.setState({ firstName: res.data.user.full_name });
        this.setState({ phone: res.data.user.phone });
        this.setState({ email: res.data.user.email });
        
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };

  componentDidMount() {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    this.getData();
   
  }

  onUpdateProfile(e) {
    e.preventDefault();
    if(this.state.firstName == ""){
      NotificationManager.error("Enter Full Name");
      return false;
    }
    if((this.state.phone == "") || (this.state.phone == "NaN")){
      NotificationManager.error("Enter Mobile Number");
      return false;
    }

    if((this.state.phone.length !== 10)){
      NotificationManager.error("Mobile Number allow only 10 Digits");
      return false;
    }

    let data = {
      full_name: this.state.firstName,
      phone: this.state.phone,
      
    };
    console.log(data);
    axios({
      url: baseURL+"/update-profile",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Profile Updated Successfully!");
      
    })
    .catch((res) => {
      NotificationManager.error("Profile not Updated");
      
    });
  };

  validateOnlyText = (inputtxt) => {

    var re = /^[A-Za-z ]+$/;
    if(inputtxt === "" || re.test(inputtxt)){
      return true;
    }else{
      return false;
    }
  }

  validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if(inputtxt.match(phoneno) || inputtxt.length==0){
      return true;
    }else{
      return false;
    }
  }

  changeFirstName(e){
    if(e.target.name=="full_name"){
      if(this.validateOnlyText(e.target.value)){
        this.setState({ firstName: e.target.value })
      }
    }else{
      this.setState({ firstName: e.target.value })
    }
    
  }

  changePhone(e){
    if(e.target.name=="telephone"){
      if(this.validateOnlyDigits(e.target.value)){
        this.setState({ phone: e.target.value })
      }
    }else{
      this.setState({ phone: e.target.value })
    }
    
  }

  render() {
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form >
          <FormGroup row>
            <Label for="firstName" sm={3}>
              <IntlMessages id="components.firstName" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="full_name"
                id="fullName"
                className="input-lg"
                required
                value={this.state.firstName}
                onChange={(e) =>
                  
                  this.changeFirstName(e)
                  
                }
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="telephone" sm={3}>
              <IntlMessages id="components.phoneNo" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="telephone"
                id="telephone"
                className="input-lg "
                required
                inputProps={{ maxLength: 10, minLength: 10 }}
                value={this.state.phone}
                onChange={(e) =>
                  this.changePhone(e)
                }
              
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="email" sm={3}>
              <IntlMessages id="components.email" />
            </Label>
            <Col sm={9}>
              <Input
                type="email"
                name="email"
                id="email"
                className="input-lg"
                value={this.state.email}
                disabled
              />
            </Col>
          </FormGroup>
        </Form>
        <hr />
        {/* <h2 className="heading">
          <IntlMessages id="components.address" />
        </h2> */}
        {/* <Form>
               <FormGroup row>
                  <Label for="address" sm={3}><IntlMessages id="components.address" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="address" id="address" className="input-lg" />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for="city" sm={3}><IntlMessages id="components.city" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="city" id="city" className="input-lg" />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for="state" sm={3}><IntlMessages id="components.state" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="state" id="state" className="input-lg" />
                  </Col>
               </FormGroup>
               <FormGroup row>
                  <Label for="zip" sm={3}><IntlMessages id="components.zipCode" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="zip" id="zip" className="input-lg" />
                  </Col>
               </FormGroup>
            </Form> */}
        {/* <hr /> */}

        <Button
          variant="contained"
          color="primary"
          className="text-white"
          type="submit"
          onClick={(e) => this.onUpdateProfile(e)}
        >
          <IntlMessages id="widgets.updateProfile" />
        </Button>
      </div>
    );
  }
}
