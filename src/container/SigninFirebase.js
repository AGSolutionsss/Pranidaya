/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { Fab } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { NotificationContainer, NotificationManager } from 'react-notifications';

// components
import {
   SessionSlider
} from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';
// import {fts_logo} from "../assets/receipt/fts_logo.png"

// redux action
import {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter,
   signinUser
} from 'Actions';

//Auth File
import Auth from '../Auth/Auth';


const auth = new Auth();

class Signin extends Component {


   state = {
      email: '',
      password: '',
      login: false,
      token: null,
   }

   /**
    * On User Login
    */
   onUserLogin() {
      if (this.state.email !== '' && this.state.password !== '') {
         //console.warn("form data", this.state)
         fetch(`https://ftschamp.trikaradev.xyz/api/login?username=${this.state.email}&password=${this.state.password}`, {
            method: "POST",
            //body:JSON.stringify(this.state)
         })
            .then(response => response.json())
            .then(data => {
               console.log("login", data)
               console.log("logintype", data.UserInfo.user.user_type_id)
               // signinUser(data.UserInfo.user.user_type_id);
               localStorage.setItem("id", data.UserInfo.user.user_type_id)
               localStorage.setItem("name", data.UserInfo.user.first_name)

               if (data.UserInfo.token) {
                  localStorage.setItem('login', data.UserInfo.token)
                  this.props.history.push('/app/dashboard/news');
                  this.setState({
                     login: true,
                     token: data.UserInfo.token
                  })
               }
            }).catch((err) => {
               NotificationManager.error('Username or password incorrect');
            })
      } else {
         NotificationManager.warning('Username or password required');
      }

   }

   /**
    * On User Sign Up
    */
   onUserSignUp() {
      this.props.history.push('/signup');
   }

   //Auth0 Login
   loginAuth0() {
      auth.login();
   }

   facbooklink = (link) => {
      window.location.href = "http://www.facebook.com/FTSIndia111"
   }
   userWithYoutube = (link) => {
      window.location.href = "http://www.youtube.com/c/FTS_India1"
   }
   userWithTwitter = (link) => {
      window.location.href = "http://www.twitter.com/FTS_India1"
   }
   userWithlinkedin = (link) => {
      window.location.href = "http://www.linkedin.com/in/FTSIndia1"
   }
   userWithInstagram = (link) => {
      window.location.href = "http://www.instagram.com/FTS_India1 "
   }
   userWithPinterest = (link) => {
      window.location.href = "http://www.pinterest.com/FTS_India1"
   }

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
      if (this.state.login)
         <Redirect to="/app/dashboard/news" />
      const { email, password } = this.state;

      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="45" height="45" />
                                 <span><h1 style={{ color: "#fff", marginTop: "-33px", marginLeft: "50px" }}>FTS Champ</h1></span>
                              </Link>
                           </div>
                           {/* <div>
                              <a className="mr-15" onClick={() => this.onUserSignUp()}>Create New account?</a>
                              <Button variant="contained" className="btn-light" onClick={() => this.onUserSignUp()}>Sign Up</Button>
                           </div> */}
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-7 col-md-7 col-lg-8">
                           <div className="session-body text-center">
                              <div className="session-head mb-30">

                                 {/* <h2 className="font-weight-bold">Get started with {AppConfig.brandName}</h2> */}
                                 {/* <p className="mb-0">Most powerful ReactJS admin panel</p> */}
                              </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="text"
                                       value={email}
                                       name="user-mail"

                                       className="has-input input-lg"
                                       placeholder="Username"
                                       onChange={(event) => this.setState({ email: event.target.value })}
                                    />
                                    {/* <span className="has-icon"><i className="ti-email"></i></span> */}
                                    <span className="has-icon"><PersonOutlineOutlinedIcon /></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={password}
                                       type="Password"
                                       name="user-pwd"
                                       id="pwd"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       onChange={(event) => this.setState({ password: event.target.value })}
                                       required
                                    />
                                    {/* <span className="has-icon"><i className="ti-lock"></i></span> */}
                                    <span className="has-icon"><VisibilityOffOutlinedIcon /></span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       color="primary"
                                       className="btn-block text-white w-100"
                                       variant="contained"
                                       size="large"
                                       id="signin"
                                       onClick={() => this.onUserLogin()}
                                    >
                                       Sign In
                            			</Button>
                                 </FormGroup>
                                 {/* <FormGroup className="mb-15">
                                    <Button
                                       variant="contained"
                                       className="btn-info btn-block text-white w-100"
                                       size="large"
                                       onClick={() => this.loginAuth0()}
                                    >
                                       Sign In With Auth0
                            			</Button>
                                 </FormGroup> */}
                              </Form>
                              <Link to="session/forgot-password">Forget Password</Link>
                              <p className="mb-20">Visit us @ </p>


                              <Fab size="small" variant="round" className="btn-facebook mr-15 mb-20 text-white"
                                 onClick={() => this.facbooklink()}
                              >
                                 <i className="zmdi zmdi-facebook"></i>
                              </Fab>
                              <Fab size="small" variant="round" className="btn-youtube mr-15 mb-20 text-white"
                                 // onClick={() => this.props.signinUserWithGoogle(this.props.history)}
                                 onClick={() => this.userWithYoutube()}
                              >
                                 <i class="zmdi zmdi-youtube"></i>
                              </Fab>
                              <Fab size="small" variant="round" className="btn-twitter mr-15 mb-20 text-white"
                                 // onClick={() => this.props.signinUserWithTwitter(this.props.history)}
                                 onClick={() => this.userWithTwitter()}
                              >
                                 <i className="zmdi zmdi-twitter"></i>
                              </Fab>
                              <Fab size="small" variant="round" className="btn-linkedin mr-15 mb-20 text-white"
                                 // onClick={() => this.props.signinUserWithTwitter(this.props.history)}
                                 onClick={() => this.userWithlinkedin()}
                              >
                                 <i class="zmdi zmdi-linkedin"></i>
                              </Fab>
                              <Fab size="small" variant="round" className="btn-instagram mr-15 mb-20 text-white"
                                 // onClick={() => this.props.signinUserWithGithub(this.props.history)}
                                 onClick={() => this.userWithInstagram()}
                              >
                                 <i className="zmdi zmdi-instagram"></i>
                              </Fab>
                              <Fab size="small" variant="round" className="btn-pinterest mr-15 mb-20 text-white"
                                 // onClick={() => this.props.signinUserWithTwitter(this.props.history)}
                                 onClick={() => this.userWithPinterest()}
                              >
                                 <i class="zmdi zmdi-pinterest"></i>
                              </Fab>
                              <p className="text-muted">By signing up you agree to {AppConfig.brandName}</p>
                              {/* <p className="mb-0"><a target="_blank" href="#/terms-condition" className="text-muted">Terms of Service</a></p> */}
                           </div>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-4">
                           <SessionSlider />
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
   return { user, loading }
}

export default connect(mapStateToProps, {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter,
   signinUser
})(Signin);
