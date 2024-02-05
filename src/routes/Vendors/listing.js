import React from "react";
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {baseURL} from '../../api';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import "./index.css";

const option = {
  filterType: "textField",
  selectableRows: false,
};
export default class NewListVendors extends React.Component {
  state = {
    usertype: "",
    loader: true,
    user: [],
    receiptData: [],
    columnData: [
      {
        name:'SlNo',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
     "Name",
      "GST",
      "Mobile",
      "Email",
      "Status",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
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
      url: baseURL+"/fetch-vendor-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`, 
      },
    })
      .then((res) => {
        
        let response = res.data.vendor;
        
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
          tempRows.push([
            i + 1,
            response[i]["vendor_name"],
            response[i]["vendor_gst"],
            response[i]["vendor_mobile"],
            response[i]["vendor_email"],
            response[i]["vendor_status"],
            response[i]["id"],
          ]);
        }
        this.setState({ receiptData: tempRows, loader: false });
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
    this.setState({ usertype: localStorage.getItem("user_type_id") });
    this.getData();
  }

  render() {
    let usertype = localStorage.getItem("user_type_id");
    const { loader } = this.state;
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
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Vendors List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Vendor
                </Button>
              </Link>
            </div>
        
            <RctCollapsibleCard fullBlock>
              {this.state.receiptData.length > 0 && (
                <MUIDataTable
                  title={"Vendors List"}
                  data={this.state.receiptData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.receiptData.length <= 0 && (
                <MUIDataTable
                  title={"Vendors List"}
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
