import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SelectionState } from "draft-js";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const View = (props) => {
  const classes = useStyles();
  const [showmodal, setShowmodal] = useState(false);
  const [showEditmodal, setShowEditmodal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  
  const [loader, setLoader]= useState(true);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: baseURL+"/fetch-chapter-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      // console.log("view",res.data)
      setUser(res.data.chapter);
      setUsers(res.data.users);
      setLoader(false)
      console.log("view", res.data.chapter);
    });
  }, []);

  const hr = {
    marginTop: "0rem"
  };

  const label1 = {
    fontSize: "0.875rem",
    fontWeight: "400"
  };

  const label2 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
    color: "#3e7dc4"
  };

  const butn = {
    float: "right"
  };

  const openmodal = () => {
    setShowmodal(true);
  };

  const closegroupModal = () => {
    setShowmodal(false);
  };

  const closeEditModal = () => {
    setShowEditmodal(false);
  };
  const openEditmodal = () => {
    setShowEditmodal(true);
  };

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if(inputtxt.match(phoneno) || inputtxt.length==0){
      return true;
    }else{
      return false;
    }
  }

  const onUserInputChange = (e) => {
    if(e.target.name=="phone"){
      if(validateOnlyDigits(e.target.value)){
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      }
    }else{
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    confirm_password: "",
    user_type_id: "",
  });

  const [users, setUsers] = useState([]);
  const [selected_user_id, setSelectedUserId] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true)
    if (user.password != user.confirm_password) {
      NotificationManager.danger("Passwords don't match");
      return false;
    }

    let data = {
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      user_type: user.user_type_id,
      chapter_id: localStorage.getItem("chapter_id"),
    };

    axios({
      url: baseURL+"/create-user",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        setUsers(res.data.users);
        NotificationManager.success("User is Created Successfully");
        setIsButtonDisabled(false)
        closegroupModal();
      })
      .catch((error) => {
        NotificationManager.danger("Failed to Create");
        setIsButtonDisabled(false)
        closegroupModal();
      });
  };

  const updateUser = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true)
    let data = {
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      user_type: user.user_type_id,
      chapter_id: localStorage.getItem("chapter_id"),
    };

    axios({
      url:baseURL+"/update-user/" + selected_user_id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        setUsers(res.data.users);
        NotificationManager.success("User is Updated Successfully");
        setIsButtonDisabled(false)
        closeEditModal();
      })
      .catch((error) => {
        NotificationManager.danger("Failed to Update");
        setIsButtonDisabled(false)
        closeEditModal();
      });
  };

  return (
    <div>
    { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
          <RctCollapsibleCard>
            <h1>Chapter Details</h1><hr style={hr} />
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Chapter Name</p> <p style={label2}>{user.chapter_name}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-9">
                <div className="form-group">
                  <p style={label1}>Address</p> <p style={label2}>{user.chapter_address}</p>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>State</p> <p style={label2}>{user.chapter_state}</p>
                </div>
              </div>  
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>City</p> <p style={label2}>{user.chapter_city}</p>
                </div>
              </div>  
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>PIN</p> <p style={label2}>{user. chapter_pin}</p>
                </div>
              </div>          
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Date Of Incorporation</p> <p style={label2}>{user.chapter_date_of_incorporation}</p>
                </div>
              </div>
              
            </div>
            <div className="row">
            
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Email</p> <p style={label2}>{user.chapter_email}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Phone</p> <p style={label2}>{user.chapter_phone}</p>
                </div>
              </div>
              
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>What's App</p> <p style={label2}>{user.chapter_whatsapp}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Website</p> <p style={label2}>{user.chapter_website}</p>
                </div>
              </div>
            </div>
          </RctCollapsibleCard>
        </div>
      </div>
     </>}
     <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
          <RctCollapsibleCard>
          <h1>User Details
          <div className="d-flex" style={{float: 'right'}}>
							<div>
              <Button
        className="mr-10 mb-10"
        color="primary"
        onClick={() => openmodal()}
      >
        Create A New User
      </Button>
							</div>
						</div>
            
            </h1><hr style={hr} />
          
          <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((current_user, key) => (
                  <TableRow key={current_user.id}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>
                      {current_user.first_name} {current_user.last_name}
                    </TableCell>
                    <TableCell>{current_user.email}</TableCell>
                    <TableCell>{current_user.phone}</TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        className="mr-10 mb-10"
                        color="primary"
                        onClick={() => {
                          setUser({
                            ...user,
                            name: current_user.name,
                            email: current_user.email,
                            phone: current_user.phone,
                            first_name: current_user.first_name,
                            last_name: current_user.last_name,
                            user_type_id: current_user.user_type_id,
                          });
                          setSelectedUserId(current_user.id);
                          openEditmodal();
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            </div>

          </RctCollapsibleCard>
          <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>
          Create A New User
        </ModalHeader>
        <ModalBody>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              createUser(e);
            }}
          >
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Username"
                    required
                    name="name"
                    value={user.name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Email"
                    required
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Full Name"
                    required
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Phone Number"
                    required
                    type="text"
                    name="phone"
                    inputProps={{ maxLength: 10 }}
                    value={user.phone}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <InputLabel id="demo-simple-select-label">
                    Select User Type
                  </InputLabel>
                  <Select
                    label="Select User Type"
                    defaultValue={user.user_type_id}
                    name="user_type_id"
                    onChange={(e) => onUserInputChange(e)}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={4}>Admin</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Password"
                    required
                    name="password"
                    value={user.password}
                    onChange={(e) => onUserInputChange(e)}
                    type="password"
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    required
                    name="confirm_password"
                    value={user.confirm_password}
                    onChange={(e) => onUserInputChange(e)}
                    type="password"
                  />
                </div>
              </div>
              

              <Button
                className="mr-10 mb-10"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
                disabled={isButtonDisabled}
              >
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={showEditmodal} toggle={() => closeEditModal()}>
        <ModalHeader toggle={() => closeEditModal()}>Edit a User</ModalHeader>
        <ModalBody>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              updateUser(e);
            }}
          >
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Username"
                    required
                    name="name"
                    value={user.name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Full Name"
                    required
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Phone Number"
                    required
                    inputProps={{ maxLength: 10 }}
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <InputLabel id="demo-simple-select-label">
                    Select User Type
                  </InputLabel>
                  <Select
                    label="Select User Type"
                    defaultValue={user.user_type_id}
                    name="user_type_id"
                    onChange={(e) => onUserInputChange(e)}
                    style={{ width: "100%" }}
                  >
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={4}>Admin</MenuItem>
                  </Select>
                </div>
              </div>

              <Button
                className="mr-10 mb-10"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
                disabled={isButtonDisabled}
              >
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
        </div>
      </div>
    </div>
  );
};
export default View;
