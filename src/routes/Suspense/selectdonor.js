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
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
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
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen:true,
  download:false,
  selectableRows: false,
};

export default class AddToGroup extends React.Component {
  
  state = {
    loader: true,
    users: [],
    donorData: [],
    columnData: [
      "Name",
      "Phone",
      {
        name: "Actions",
        options: {
          filter: true,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" }}>
                {/* {alert(value)} */}

                <Button onClick={() => this.addDonorToReceipt(value)}>
                  Select
                </Button>
              </div>
            );
          },
        },
      },
    ],
  };
  
  addDonorToReceipt(fts_id) {
    var data = {
      indicomp_fts_id: fts_id,
    };

    axios({
      url: baseURL+"/update-receipt/" + this.props.id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Donor is Sucessfully Added to Receipt");
      window.location = '/app/suspense/listing';
      //alert("success");
    });
  }

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
          tempRows.push([
            response[i]["indicomp_full_name"],
            response[i]["indicomp_mobile_phone"],
            response[i]["indicomp_fts_id"],
          ]);
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
            {/* <div className="alert alert-info">
					<p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
				</div> */}

            <RctCollapsibleCard fullBlock>
              {this.state.donorData.length > 0 && (
                <MUIDataTable
                  //   title={"Donor List"}
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
