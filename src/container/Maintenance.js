import React, { Component } from "react";
import QueueAnim from "rc-queue-anim";
import { SessionSlider } from "Components/Widgets";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import { Form, FormGroup } from "reactstrap";
 
class Maintenance extends Component {
  
  facbooklink = (link) => {
    window.location.href = "http://www.facebook.com/FTSIndia111";
  };
  
  userWithYoutube = (link) => {
    window.location.href = "http://www.youtube.com/c/FTS_India1";
  };
  
  userWithTwitter = (link) => {
    window.location.href = "http://www.twitter.com/FTS_India1";
  };
  
  userWithlinkedin = (link) => {
    window.location.href = "http://www.linkedin.com/in/FTSIndia1";
  };
  
  userWithInstagram = (link) => {
    window.location.href = "http://www.instagram.com/FTS_India1 ";
  };
  
  userWithPinterest = (link) => {
    window.location.href = "http://www.pinterest.com/FTS_India1";
  };
  
  render() {
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
            <div className="session-inner-wrapper">
              <div className="container">
                <div className="row row-eq-height">
                  <div className="col-sm-5 col-md-5 col-lg-4">
                    <SessionSlider />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="session-body text-center">
                      <div className="session-head mb-30">
                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="90" height="90" />
                      </div>
                      <Form >
                        <FormGroup className="has-wrapper">
                          <p style={{color: "red",fontSize: "26px", fontFamily: "sans-serif"}}>We are upgrading CHAMP, It will live soon.</p>
                        </FormGroup>
                      </Form>
                      <p className="mb-20 mt-30">click to follow us</p>
                      <Fab size="small" variant="round" className="btn-facebook mr-15 mb-20 text-white" onClick={() => this.facbooklink()}>
                        <i className="zmdi zmdi-facebook"></i>
                      </Fab>
                      <Fab size="small" variant="round" className="btn-youtube mr-15 mb-20 text-white" onClick={() => this.userWithYoutube()} >
                        <i class="zmdi zmdi-youtube"></i>
                      </Fab>
                      <Fab size="small" variant="round" className="btn-twitter mr-15 mb-20 text-white" onClick={() => this.userWithTwitter()} >
                        <i class="zmdi zmdi-twitter"></i>
                      </Fab>
                      <Fab size="small" variant="round" className="btn-linkedin mr-15 mb-20 text-white" onClick={() => this.userWithlinkedin()} >
                        <i class="zmdi zmdi-linkedin"></i>
                      </Fab>
                      <Fab size="small" variant="round" className="btn-instagram mr-15 mb-20 text-white" onClick={() => this.userWithInstagram()} >
                        <i class="zmdi zmdi-instagram"></i>
                      </Fab>
                      <Fab size="small" variant="round" className="btn-pinterest mr-15 mb-20 text-white" onClick={() => this.userWithPinterest()} >
                        <i class="zmdi zmdi-pinterest"></i>
                      </Fab>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </QueueAnim>
    );
  }
}
export default Maintenance;