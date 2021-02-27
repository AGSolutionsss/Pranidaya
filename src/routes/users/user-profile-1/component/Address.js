/**
 * Profile Page
 */
import React, { Component, useState, useEffect } from "react";
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
// intlmessages
import IntlMessages from "Util/IntlMessages";

export default class Profile extends Component {
  /**
   * On Update Profile
   */
  state = {
    old_password: "",
    password: "",
    confirm_password: "",
  };

  onUpdateProfile = (e) => {
    e.preventDefault();
    if (this.state.password != this.state.confirm_password) {
      NotificationManager.error("Passwords don't match");
      return false;
    }

    let data = {
      old_password: this.state.old_password,
      password: this.state.password,
      username: localStorage.getItem("name"),
    };
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/change-password",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        NotificationManager.success("Password Updated Successfully!");
      })
      .catch((res) => {
        NotificationManager.error("Please enter valid old password");
      });
  };

  render() {
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form onSubmit={(e) => this.onUpdateProfile(e)}>
          <FormGroup row>
            <Label for="oldpassword" sm={3}>
              <IntlMessages id="Old Password" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="oldpassword"
                id="oldpassword"
                className="input-lg"
                type="password"
                onChange={(e) =>
                  this.setState({ old_password: e.target.value })
                }
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="newpassword" sm={3}>
              <IntlMessages id="New Password" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="newpassword"
                id="newpassword"
                className="input-lg"
                type="password"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmpassword" sm={3}>
              <IntlMessages id="Confirm Password" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="confirmpassword"
                id="confirmpassword"
                className="input-lg"
                type="password"
                onChange={(e) =>
                  this.setState({ confirm_password: e.target.value })
                }
                required
              />
            </Col>
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            type="submit"
          >
            <IntlMessages id="widgets.updateProfile" />
          </Button>
        </Form>
        <hr />
      </div>
    );
  }
}
