import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./index.css";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";

// intl messages
import IntlMessages from "Util/IntlMessages";
// import {columns} from './data'
// import {table} from './data';
// import {options} from './data'

// const columnData=["Name","Gender","Phone","Email","Address"]

const option = {
  filterType: "textField",
  selectableRows: false,
};
export default class NewListDonor extends React.Component {
  state = {
    loader: true,
    users: [],
    donorData: [],
    columnData: [
      "#",
      "Name",
      "Type",
      "Spouse/Contact",
      "Mobile",
      "Email",
      {
        name: "Actions",
        options: {
          filter: true,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                {/* {alert(value)} */}
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link to={"view?id=" + value}>
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 3 ||
                        localStorage.getItem("user_type_id") == 4
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Receipt" placement="top">
                  <IconButton
                    aria-label="Receipt"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 2 ||
                        localStorage.getItem("user_type_id") == 3 ||
                        localStorage.getItem("user_type_id") == 4
                          ? "none"
                          : "",
                    }}
                  >
                    <Link to={"receipt?id=" + value}>
                      <ConfirmationNumberIcon />
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
    let result = [];
    axios({
      url: baseURL+"/fetch-donors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        let singleData = [];
        console.log("resul", res.data);
        let response = res.data.individualCompanies;
        console.log("donorleng", res.data.individualCompanies);
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          if (response[i]["indicomp_type"] == "Individual") {
            tempRows.push([
              i + 1,
              response[i]["indicomp_full_name"],
              response[i]["indicomp_type"],
              response[i]["indicomp_spouse_name"],
              response[i]["indicomp_mobile_phone"],
              response[i]["indicomp_email"],
              response[i]["id"],
            ]);
          } else {
            tempRows.push([
              i + 1,
              response[i]["indicomp_full_name"],
              response[i]["indicomp_type"],
              response[i]["indicomp_com_contact_name"],
              response[i]["indicomp_mobile_phone"],
              response[i]["indicomp_email"],
              response[i]["id"],
            ]);
          }
        }
        this.setState({ donorData: tempRows, loader: false });
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
    let usertype = localStorage.getItem("id");
    return (
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title={<IntlMessages id="sidebar.donorList" />}
              match={this.props.match}
            />
            {/* <div className="alert alert-info">
					<p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
				</div> */}
        
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="addindiv">
                <Button
                  style={{ display: usertype == 1 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Individual
                </Button>
              </Link>
              <Link className="btn btn-outline-light" to="addcomp">
                <Button
                  style={{ display: usertype == 1 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-start"
                  color="danger"
                >
                  + Add Company
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.donorData.length > 0 && (
                <MUIDataTable
                  title={"Donor List"}
                  data={this.state.donorData}
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
