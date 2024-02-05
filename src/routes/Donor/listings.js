import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./donor.css";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";

// intl messages
import IntlMessages from "Util/IntlMessages";


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
      {
        name:'#',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      {
        name:'PDS ID',
        options:{
          filter: true,
          print:true,
          download:true,
          display: 'included',
        }
      },
      "Name",
      "Type",
      "Spouse/Contact",
      "Mobile",
      "Email",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                
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
                    
                  >
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cash Receipt" placement="top">
                  <IconButton
                    aria-label="Cash Receipt"
                    
                  >
                    <Link to={"receipt?id=" + value}>
                      <ConfirmationNumberIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Material Receipt" placement="top">
                  <IconButton
                    aria-label="Material Receipt"
                    
                  >
                    <Link to={"receiptm?id=" + value}>
                      <ShoppingBasketIcon />
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
      url: baseURL+"/fetch-donor-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        let response = res.data.donor;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          if (response[i]["indicomp_type"] == "Individual") {
            tempRows.push([
              i + 1,
              response[i]["donor_fts_id"],
              response[i]["donor_full_name"],
              response[i]["donor_type"],
              response[i]["donor_spouse_name"],
              response[i]["donor_mobile"],
              response[i]["donor_email"],
              response[i]["id"],
            ]);
          } else {
            tempRows.push([
              i + 1,
              response[i]["donor_fts_id"],
              response[i]["donor_full_name"],
              response[i]["donor_type"],
              response[i]["donor_contact_name"],
              response[i]["donor_mobile"],
              response[i]["donor_email"],
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
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
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
            
        
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="addindiv">
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Donor
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
               {this.state.donorData.length <= 0 && (
                <MUIDataTable
                  title={"Donor List"}
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
