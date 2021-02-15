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
                  <Label for="firstName" sm={3}><IntlMessages id="components.firstName" /></Label>
                  <Col sm={9}>
                     <Input type="text" name="fullName" id="fullName" className="input-lg" />
                  </Col>
               </FormGroup>
               
               <FormGroup row>
                  <Label for="telephone" sm={3}><IntlMessages id="components.phoneNo" /></Label>
                  <Col sm={9}>
                     <Input type="tel" name="telephone" id="telephone" className="input-lg" />
                  </Col>
               </FormGroup>

               <FormGroup row>
                  <Label for="email" sm={3}><IntlMessages id="components.email" /></Label>
                  <Col sm={9}>
                     <Input type="email" name="email" id="email" className="input-lg" />
                  </Col>
               </FormGroup>
               
            </Form>
            <hr />
            <h2 className="heading"><IntlMessages id="components.address" /></h2>
            <Form>
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
            </Form>
            <hr />
            
            <Button variant="contained" color="primary" className="text-white" onClick={() => this.onUpdateProfile()}><IntlMessages id="widgets.updateProfile" /></Button>
         </div>
      );
   }
}
