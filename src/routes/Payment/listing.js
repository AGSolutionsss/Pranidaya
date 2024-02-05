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
import "./index.css";

const option = {
  filterType: "textField",
  selectableRows: false,
};
export default class NewListPayment extends React.Component {
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
      "Mobile",
      "Date",
      "Exemption Type",
      "Donation Type",
      "Amount",
     ],
  };

  getData = () => {
    
    axios({
      url: baseURL+"/fetch-payment-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`, 
      },
    })
      .then((res) => {
        
        let response = res.data.payment;
        
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
          tempRows.push([
            i + 1,
            response[i]["payment_user"],
            response[i]["payment_mobile"],
            Moment(response[i]["created_at"]).format('DD-MM-YYYY'),
            response[i]["payment_exemption_type"],
            response[i]["payment_donation_type"],
            response[i]["payment_amount"],
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
              title="Website Donation List"
              match={this.props.match}
            />
            
        
            <RctCollapsibleCard fullBlock>
              {this.state.receiptData.length > 0 && (
                <MUIDataTable
                  title={"Website Donation List"}
                  data={this.state.receiptData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.receiptData.length <= 0 && (
                <MUIDataTable
                  title={"Website Donation List"}
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
