import React from "react";
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Moment from 'moment';
import {baseURL} from '../../api';
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { getAppLayout } from "../../helpers/helpers";
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./receipt.css";

const option = {
  filterType: "dropdown",
  selectableRows: false,
};
export default class NewListReceipts extends React.Component {
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
      {
        name:'Receipt No',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      {
        name:'Name',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      {
        name:'Date',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      "Exemption Type",
      "Donation Type",
      {
        name:'Amount',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      {
        name:localStorage.getItem("id") == 4 ? "" : "Action" ,
        options: {
          filter: false,
          print:false,
          download:false,
          
          customBodyRender: (value) => {
            return (
              <div>
                <Helmet>
                  <title>Receipts</title>
                  <meta name="description" content="Receipts" />
                </Helmet>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                    }}
                      to={"receiptview?id=" + value}
                    >
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                  <IconButton aria-label="Edit">
                    <Link
                      style={{
                        display: this.state.usertype == 2 ? "" : "none",
                      }}
                      to={"editreceipt?id=" + value}
                    >
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
      url: baseURL+"/fetch-receipt-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`, 
      },
    })
      .then((res) => {
        
        let response = res.data.receipts;
        
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
          tempRows.push([
            i + 1,
            response[i]["receipt_no"],
            response[i]["donor"]["donor_full_name"],
            Moment(response[i]["receipt_date"]).format('DD-MM-YYYY'),
            response[i]["receipt_exemption_type"],
            response[i]["receipt_donation_type"],
            response[i]["receipt_total_amount"],
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
              title="Cash Receipts List"
              match={this.props.match}
            />
            
        
            <RctCollapsibleCard fullBlock>
              {this.state.receiptData.length > 0 && (
                <MUIDataTable
                  title={"Cash Receipts List"}
                  data={this.state.receiptData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.receiptData.length <= 0 && (
                <MUIDataTable
                  title={"Cash Receipts List"}
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
