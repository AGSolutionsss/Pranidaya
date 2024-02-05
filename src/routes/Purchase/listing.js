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
import Moment from 'moment';

const option = {
  filterType: "textField",
  selectableRows: false,
};
export default class NewListPurchase extends React.Component {
  state = {
    usertype: "",
    loader: true,
    user: [],
    itemData: [],
    columnData: [
      {
        name:'SlNo',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
     "Date",
     "Vendor",
      "Bill No",
      "Total Amount",
      "No of Item",
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
      url: baseURL+"/fetch-purchase-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`, 
      },
    })
      .then((res) => {
        
        let response = res.data.purchase;
        
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
          tempRows.push([
            i + 1,
            Moment(response[i]["purchase_date"]).format('DD-MM-YYYY'),
            response[i]["vendor_name"],
            response[i]["purchase_bill_no"],
            response[i]["purchase_total_bill"],
            response[i]["purchase_count"],
            response[i]["id"],
          ]);
        }
        this.setState({ itemData: tempRows, loader: false });
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
              title="Purchase List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Purchase
                </Button>
              </Link>
            </div>
        
            <RctCollapsibleCard fullBlock>
              {this.state.itemData.length > 0 && (
                <MUIDataTable
                  title={"Purchase List"}
                  data={this.state.itemData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.itemData.length <= 0 && (
                <MUIDataTable
                  title={"Purchase List"}
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
