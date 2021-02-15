/**
 * Profile Page
 */
import React, { Component } from 'react';
import { FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { NotificationManager } from 'react-notifications';

// intlmessages
import IntlMessages from 'Util/IntlMessages';

export default class Profile extends Component {

   /**
    * On Update Profile
    */
   onUpdateProfile() {
      NotificationManager.success('Profile Updated Successfully!');
   }

   render() {
      return (
         <div className="profile-wrapper w-50">
            <h2 className="heading"><IntlMessages id="widgets.personalDetails" /></h2>
            <Form>
               <FormGroup row>
                  <Label for="oldpassword" sm={3}><IntlMessages id="Old Password" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="oldpassword" id="oldpassword" className="input-lg" />
                  </Col>
               </FormGroup>
			   <FormGroup row>
                  <Label for="newpassword" sm={3}><IntlMessages id="New Password" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="newpassword" id="newpassword" className="input-lg" />
                  </Col>
               </FormGroup>
			   <FormGroup row>
                  <Label for="confirmpassword" sm={3}><IntlMessages id="Confirm Password" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="confirmpassword" id="confirmpassword" className="input-lg" />
                  </Col>
               </FormGroup>
               
            </Form>
            <hr />
 
            
            <Button variant="contained" color="primary" className="text-white" onClick={() => this.onUpdateProfile()}><IntlMessages id="widgets.updateProfile" /></Button>
         </div>
      );
   }
}
