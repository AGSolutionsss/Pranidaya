/**
 * Profile Page
 */
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

// intlmessages
import IntlMessages from "Util/IntlMessages";

export default class Profile extends Component {
  state = {
    userdata: [],
  };
  /**
   * On Update Profile
   */
  onUpdateProfile() {
    NotificationManager.success("Profile Updated Successfully!");
  }

  getData = () => {
    axios({
      url: "https://api.testags.com/api/fetch-profile",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        this.setState({ userdata: res.data.user });
        
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form>
          <FormGroup row>
            <Label for="firstName" sm={3}>
              <IntlMessages id="components.firstName" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                className="input-lg"
                defaultValue={this.state.userdata.first_name}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="telephone" sm={3}>
              <IntlMessages id="components.phoneNo" />
            </Label>
            <Col sm={9}>
              <Input
                type="tel"
                name="telephone"
                id="telephone"
                className="input-lg"
                defaultValue={this.state.userdata.phone}
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
                defaultValue={this.state.userdata.email}
                disabled
              />
            </Col>
          </FormGroup>
        </Form>
        <hr />
        

        <Button
          variant="contained"
          color="primary"
          className="text-white"
          onClick={() => this.onUpdateProfile()}
        >
          <IntlMessages id="widgets.updateProfile" />
        </Button>
      </div>
    );
  }
}
