import React from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import {  NotificationManager,} from "react-notifications";
import "./donor.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import {baseURL} from '../../api';

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
                <Button onClick={() => this.addMemberToGroup(value)}>
                  Add
                </Button>
              </div>
            );
          },
        },
      },
    ],
  };

  addMemberToGroup(relative_id) {
    var data = {
      donor_related_id: relative_id,
    };

    axios({
      url: baseURL+"/update-donor-by-id/" + this.props.id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Data is Sucessfully Added to Groups");
      window.location = '/app/donor/listing';
    });
  }

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
          tempRows.push([
            response[i]["donor_full_name"],
            response[i]["donor_mobile"],
            response[i]["donor_related_id"],
          ]);
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
           

            <RctCollapsibleCard fullBlock>
              {this.state.donorData.length > 0 && (
                <MUIDataTable
                  
                  data={this.state.donorData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.donorData.length <= 0 && (
                <MUIDataTable
                  
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
