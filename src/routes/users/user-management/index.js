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
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const Index = (props) => {
  const classes = useStyles();
  const [showmodal, setShowmodal] = useState(false);
  const [showEditmodal, setShowEditmodal] = useState(false);

  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
  };

  const closeEditModal = () => {
    setShowEditmodal(false);
  };
  const openEditmodal = () => {
    setShowEditmodal(true);
  };
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

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");

  // const { personName, userName, mobile, email } = user;
  const onInputChange = (e) => {
    setChapter({
      ...chapter,
      [e.target.name]: e.target.value,
    });
  };
  const onUserInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = (e) => {
    e.preventDefault();

    if (user.password != user.confirm_password) {
      alert("Passwords don't match");
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
      url: "https://ftschamp.trikaradev.xyz/api/create-user",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        setUsers(res.data.users);
        alert("success");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const updateUser = (e) => {
    e.preventDefault();

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
      url:
        "https://ftschamp.trikaradev.xyz/api/update-user/" + selected_user_id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        setUsers(res.data.users);
        alert("success");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  useEffect(() => {
    axios({
      url:
        "https://ftschamp.trikaradev.xyz/api/fetch-chapter-by-id/" +
        localStorage.getItem("chapter_id"),
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      console.log("edit", res.data);
      setChapter(res.data.chapter);
      setUsers(res.data.users);
    });
  }, []);

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
    var v = document.getElementById("editChap").checkValidity();
    var v = document.getElementById("editChap").reportValidity();
    e.preventDefault();
    if (v) {
      axios({
        url:
          "https://ftschamp.trikaradev.xyz/api/update-chapter/" +
          localStorage.getItem("chapter_id"),
        method: "PUT",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        //console.log("edit1", res.data);
        alert("success");
      });
    }
  };

  return (
    <div className="textfields-wrapper">
      {/* <PageTitleBar title="Update Chapter" match={props.match} /> */}
      <Button
        className="mr-10 mb-10"
        color="primary"
        onClick={() => openmodal()}
      >
        Create A New User
      </Button>
      <RctCollapsibleCard>
        <h1>Chapter Details</h1>

        <form id="editChap" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Person Name"
                  autoComplete="Person Name"
                  name="chapter_name"
                  required
                  value={chapter.chapter_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Code"
                  autoComplete="Name"
                  required
                  name="chapter_code"
                  value={chapter.chapter_code}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
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
                  type="number"
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
                  fullWidth
                  label="State"
                  required
                  autoComplete="Name"
                  name="chapter_state"
                  value={chapter.chapter_state}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Phone"
                  type="number"
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
                  label="Date Of Incorporation"
                  autoComplete="Name"
                  name="chapter_date_of_incorporation"
                  value={chapter.chapter_date_of_incorporation}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
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
            </div>

            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </Button>
          </div>
        </form>
      </RctCollapsibleCard>
      <RctCollapsibleCard>
        <div>
          <h1>Users</h1>
          <br />

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
              <div className="col-sm-6 col-md-6 col-xl-12">
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
              <div className="col-sm-6 col-md-6 col-xl-12">
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
                    label="Enter First Name"
                    required
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Last Name"
                    required
                    name="last_name"
                    value={user.last_name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Phone Number"
                    required
                    name="phone"
                    value={user.phone}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
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
              <div className="col-sm-6 col-md-6 col-xl-12">
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
              <div className="col-sm-6 col-md-6 col-xl-12">
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
                    <MenuItem value={4}>Viewer</MenuItem>
                  </Select>
                </div>
              </div>

              <Button
                className="mr-10 mb-10"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
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
              <div className="col-sm-6 col-md-6 col-xl-12">
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
              <div className="col-sm-6 col-md-6 col-xl-12">
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
                    label="Enter First Name"
                    required
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Last Name"
                    required
                    name="last_name"
                    value={user.last_name}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Enter Phone Number"
                    required
                    name="phone"
                    value={user.phone}
                    onChange={(e) => onUserInputChange(e)}
                  />
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-xl-12">
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
                    <MenuItem value={4}>Viewer</MenuItem>
                  </Select>
                </div>
              </div>

              <Button
                className="mr-10 mb-10"
                color="primary"
                type="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Index;
