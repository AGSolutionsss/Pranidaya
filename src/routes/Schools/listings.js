import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./index.css";
import {baseURL} from '../../api';
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";

const option = {
  filterType: "textField",
  selectableRows: false,
};
const classes = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "70ch",
    },
    backdrop: {
      zIndex: "100",
      color: "#fff",
    },
  },
});

export default class NewListSchools extends React.Component {
  state = {
    loader: true,
    users: [],
    SchoolsData: [],
    columnData: [
      "#",
      "District",
      "School Code",
      "School Name",
      "Teacher",
      {
        name: "Actions",
        options: {
          filter: true,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link to={"view?id=" + value}>
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
  };

  getData = () => {
    axios({
      url: baseURL+"/fetch-schools",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        console.log("rest", res.data);
        let response = res.data.schools;
    console.log("responsetest" , response)

        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          tempRows.push([
            i + 1,
            response[i]["msid_District"],
            response[i]["msid_school_code"],
            response[i]["msid_school_name"],
            response[i]["msid_Teacher"],
            response[i]["id"],
          ]);
        }
        this.setState({ SchoolsData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };

  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    this.getData();
  }

  render() {
    const { loader } = this.state;
    console.log(this.state.SchoolsData)
    return (
      <div className="data-table-wrapper" style={{fontWeight: '800!important'}}>
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Schools List"
              match={this.props.match}
            />
            
            <RctCollapsibleCard fullBlock>
              {this.state.SchoolsData.length > 0 && (
                <MUIDataTable
                  title={"Schools List"}
                  data={this.state.SchoolsData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
