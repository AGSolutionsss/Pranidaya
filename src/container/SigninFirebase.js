import React, { Component } from "react";
 import { connect } from "react-redux";
 import Button from "@material-ui/core/Button";
 import AppBar from "@material-ui/core/AppBar";
 import Toolbar from "@material-ui/core/Toolbar";
 import { Link } from "react-router-dom";
 import { Form, FormGroup, Input } from "reactstrap";
 import LinearProgress from "@material-ui/core/LinearProgress";
 import QueueAnim from "rc-queue-anim";
 import { Fab } from "@material-ui/core";
 import { Redirect } from "react-router-dom";
 import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
 import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
 import {
   NotificationContainer,
   NotificationManager,
 } from "react-notifications";
 
 import { SessionSlider } from "Components/Widgets";
 import AppConfig from "Constants/AppConfig";
 import {baseURL} from '../api';
 import {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter,
   signinUser,
 } from "Actions";
 import Auth from "../Auth/Auth";
 import './login.css';
 
 const auth = new Auth();
 
 class Signin extends Component {
   state = {
     email: "",
     password: "",
     login: false,
     token: null,
     errorShown:false,
   };
 
 
   componentDidMount(){
     
     fetch(
       encodeURI(baseURL+'/check-status'),
       {
         method: "GET",
       }
     )
       .then((response) => response.json())
       .then((data) => {
        
         if (JSON.stringify(data).includes("ok")) {
           
          
         }else{
         
           this.props.history.push("/maintenance");
         }
         
        
 
       })
       .catch((err) => {
 
        
        
       });
   } 
 
   
 
   /**
    * On User Login
    */
   onUserLogin() {
     if (this.state.email !== "" && this.state.password !== "") {
       //console.warn("form data", this.state)
 
 
       //username=${this.state.email}&password=${this.state.password}`
 
 
       let formData = new FormData();    //formdata object
 
       formData.append('username', this.state.email);   //append the values with key, value pair
       formData.append('password', this.state.password);
 
 
       fetch(
         encodeURI(baseURL+'/login'),
         {
           method: "POST",
           body:formData
         }
       )
         .then((response) => response.json())
         .then((data) => {
           localStorage.setItem("full_name", data.UserInfo.user.full_name);
           localStorage.setItem("username", data.UserInfo.user.name);
           localStorage.setItem("user_type_id", data.UserInfo.user.user_type_id);
 
           if (data.UserInfo.token) {
             localStorage.setItem("login", data.UserInfo.token);
             this.props.history.push("/app/dashboard");
             this.setState({
               login: true,
               token: data.UserInfo.token,
             });
           }
           
           if(JSON.stringify(data).includes("Unauthorised")) {
           //  if(!this.state.errorShown){
               NotificationManager.error("Username or password incorrect");
               this.setState({
                 errorShown: true,
               });
          // }
           }
 
 
         })
         .catch((err) => {
 
          
           if(!this.state.errorShown){
               NotificationManager.error("Username or password incorrect");
               this.setState({
                 errorShown: true,
               });
           }
         });
     } else {
       if(!this.state.errorShown){
         NotificationManager.error("Please enter Username or Password");
         this.setState({
           errorShown: true,
         });
     }
     }
   }
 
   /**
    * On User Sign Up
    */
   onUserSignUp() {
     this.props.history.push("/signup");
   }
 
   //Auth0 Login
   loginAuth0() {
     auth.login();
   }
 
   facbooklink = (link) => {
     window.location.href = "https://www.facebook.com/PraniDaya/";
   };
   userWithYoutube = (link) => {
     window.location.href = "#";
   };
   userWithTwitter = (link) => {
     window.location.href = "#";
   };
   userWithlinkedin = (link) => {
     window.location.href = "#";
   };
   userWithInstagram = (link) => {
     window.location.href = "#";
   };
   userWithPinterest = (link) => {
     window.location.href = "https://pranidaya.org/feed/";
   };
 
   render() {
     let x = document.getElementById("pwd");
     if (x) {
       // Execute a function when the user releases a key on the keyboard
       x.addEventListener("keyup", function (event) {
         // Number 13 is the "Enter" key on the keyboard
         if (event.keyCode === 13) {
           // Cancel the default action, if needed
           event.preventDefault();
           // Trigger the button element with a click
           document.getElementById("signin").click();
         }
       });
     }
     if (this.state.login) <Redirect to="/app/dashboard" />;
     const { email, password } = this.state;
 
     const { loading } = this.props;
     return (
       <QueueAnim type="bottom" duration={2000}>
         
           {loading && <LinearProgress />}
           <div className="session-inner-wrapper">
             <div className="container-fluid">
               <div className="row">
               <div className="col-md-8 desktop">
                   
                 </div>
               
                 <div className="col-md-4 login">
                   <div className="session-body text-center" style={{backgroundColor:'transparent'}}>
                     <div className="session-head mb-20">
                     <h1 className="login-heading">PRANI DAYA</h1>
                     
                       
                     </div>
                     <Form style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                       <FormGroup className="has-wrapper mt-2" style={{width:'70%'}}>
                         <Input
                           type="text"
                           value={email}
                           name="user-mail"
                           autoFocus="autoFocus"
                           className="has-input input-lg"
                           placeholder="Username"
                           onChange={(event) =>
                             this.setState({ email: event.target.value })
                           }
                         />
                         
                         <span className="has-icon">
                           <PersonOutlineOutlinedIcon />
                         </span>
                       </FormGroup>
                       <FormGroup className="has-wrapper mt-2" style={{width:'70%'}}>
                         <Input
                           value={password}
                           type="Password"
                           name="user-pwd"
                           // id="pwd"
                           className="has-input input-lg"
                           placeholder="Password"
                           onChange={(event) =>
                             this.setState({ password: event.target.value })
                           }
                           required
                         />
                         <span className="has-icon"><i className="ti-lock"></i></span>
                        
                       </FormGroup>
                       <FormGroup className="mb-15" style={{paddingLeft:'80px',paddingRight:'80px',width:'70%'}}>
                         <Button color="primary" className="btn-block text-white w-100 mt-4"
                           variant="contained"
                           size="large"
                           id="signin"
                           onClick={() => this.onUserLogin()}
                         >
                           Sign In
                         </Button>
                       </FormGroup>
                       
                     </Form>
                     <Link to="session/forgot-password">Forget Password</Link>
                     
 
                  </div>
                 </div>
                 
                 
               </div>
             </div>
           </div>
         
       </QueueAnim>
     );
   }
 }
 
 // map state to props
 const mapStateToProps = ({ authUser }) => {
   const { user, loading } = authUser;
   return { user, loading };
 };
 
 export default connect(mapStateToProps, {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter,
   signinUser,
 })(Signin);
 