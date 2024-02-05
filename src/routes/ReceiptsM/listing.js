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
import axios from "axios";
import { Helmet } from "react-helmet";

const option = {
  filterType: "dropdown",
  selectableRows: false,
};
export default class NewListReceiptsM extends React.Component {
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
        name:'Date',
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
        name:'Approx Value',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      
      "No of Items",
      
      {
        name:localStorage.getItem("user_type_id") == 4 ? "" : "Action" ,
        options: {
          filter: false,
          print:false,
          download:false,
          
          customBodyRender: (value) => {
            return (
              <div>
                <Helmet>
                  <title>Material Receipts</title>
                  <meta name="description" content="Receipts" />
                </Helmet>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: localStorage.getItem("user_type_id") == 4 ? "none" : "",
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
                        display: localStorage.getItem("user_type_id") == 2 ? "" : "none",
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
      url: baseURL+"/fetch-m-receipt-list",
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
            response[i]["m_receipt_no"],
            Moment(response[i]["m_receipt_date"]).format('DD-MM-YYYY'),
            response[i]["donor_full_name"],
            response[i]["m_receipt_total_amount"],
            response[i]["m_receipt_count"],
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
              title="Material Receipts List"
              match={this.props.match}
            />
            
        
            <RctCollapsibleCard fullBlock>
              {this.state.receiptData.length > 0 && (
                <MUIDataTable
                  title={"Material Receipts List"}
                  data={this.state.receiptData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.receiptData.length <= 0 && (
                <MUIDataTable
                  title={"Material Receipts List"}
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
