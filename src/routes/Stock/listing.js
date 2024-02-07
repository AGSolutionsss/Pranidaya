import React from "react";
import MUIDataTable from "mui-datatables";
import {baseURL} from '../../api';
import CircularProgress from "@material-ui/core/CircularProgress";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import NumberFormat from 'react-number-format';

const option = {
  filter: false,
  selectableRows: false,
};
export default class NewListStock extends React.Component {
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
      name:'Item Name',
      options: {
        filter: false,
        print:true,
        download:true
      },
    },
     
    {
        name:'Received',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      {
        name:'Consumption',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
      {
        name:'Close Balance',
        options: {
          filter: false,
          print:true,
          download:true
        },
      },
    ],
  };

  getData = () => {
    
    axios({
      url: baseURL+"/fetch-item-stock",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`, 
      },
    })
      .then((res) => {
        
        let response = res.data.stock;
        
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
          tempRows.push([
            i + 1,
            response[i]["item_name"],
            <NumberFormat 
              thousandSeparator={true} 
              thousandsGroupStyle="lakh"
              displayType={'text'}
              prefix={''} 
              value={response[i]["purch"]}
            />,
            <NumberFormat 
              thousandSeparator={true} 
              thousandsGroupStyle="lakh"
              displayType={'text'}
              prefix={''} 
              value={response[i]["sale"]}
            />,
            <NumberFormat 
              thousandSeparator={true} 
              thousandsGroupStyle="lakh"
              displayType={'text'}
              prefix={''} 
              value={(response[i]["openpurch"] - response[i]["closesale"]) + (response[i]["purch"] - response[i]["sale"])}
            />,
            
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
              title="Stocks List ( in Kgs )"
              match={this.props.match}
            />
            
        
            <RctCollapsibleCard fullBlock>
              {this.state.receiptData.length > 0 && (
                <MUIDataTable
                  title={"Stocks List"}
                  data={this.state.receiptData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
              {this.state.receiptData.length <= 0 && (
                <MUIDataTable
                  title={"Stocks List"}
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
