import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import './style.css';
import Moment from 'moment';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import NumberFormat from 'react-number-format';


  const table_head = {
    border: "1px solid black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px"
  };

  const table_row_center = {
    textAlign: "center",
    border: "1px solid black",
  };
  
  const table_row_start = {
    textAlign: "start",
    border: "1px solid black",
  };

const StockSummaryReport = (props) => {
  const componentRef = useRef();
  const [stockSummary, setStockSummary] = useState({});
  const [loader, setLoader]= useState(true);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }
    
    var url = new URL(window.location.href);
   
    let data = {
      receipt_from_date:localStorage.getItem("receipt_from_date"),
      receipt_to_date:localStorage.getItem("receipt_to_date"),
    };
 
    
    axios({
      url: baseURL+"/fetch-stock-summary",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setStockSummary(res.data.stock);
        setLoader(false)
      
    });
  }, []);
 
  const  handleExportWithFunction  = (e) => {
    savePDF(componentRef.current, { 
      paperSize:  "A4", 
      orientation: "vertical",
        scale: 0.8,
    });
  }

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Stock Summary ( in Kgs )" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
            <RctCard>
              <div 
                
                className="invoice-head text-right">
                <ul className="list-inline">
                <li>
                  <a onClick={(e) => handleExportWithFunction(e)}>
                      <i className="mr-10 ti-download"></i> PDF
                    </a>
                    </li>
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <a>
                          <i className="mr-10 ti-printer"></i> Print
                        </a>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul>
              </div>
              <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                <div className="table-responsive mt-4">
                  <div className="col-md-12" style={{textAlign:'center',paddingBottom:'10px'}}>
                    <h1>Stock Summary - From : {Moment(localStorage.getItem("receipt_from_date")).format('DD-MM-YYYY')} To : {Moment(localStorage.getItem("receipt_to_date")).format('DD-MM-YYYY')} </h1>
                  </div>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black'}}>
                      <TableHead>          
                        <TableRow>
                            <TableCell style={table_head}>Items Name</TableCell>
                            <TableCell style={table_head}>Open Balance</TableCell>
                            <TableCell style={table_head}>Received</TableCell>
                            <TableCell style={table_head}>Consumption</TableCell>
                            <TableCell style={table_head}>Close Balance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stockSummary.map((datalist, key) => (
                              <TableRow key={key}>
                                <TableCell style={table_row_start}>&nbsp;&nbsp;{datalist.item_name}</TableCell>
                                <TableCell style={table_row_center}>{<NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={''} 
                                value={datalist.openpurch - datalist.closesale}
                              />}</TableCell>
                                <TableCell style={table_row_center}>{<NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={''} 
                                value={datalist.purch}
                              />}</TableCell>
                                <TableCell style={table_row_center}>{<NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={''} 
                                value={datalist.sale}
                              />}</TableCell>
                                <TableCell style={table_row_center}>{<NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={''} 
                                value={(datalist.openpurch - datalist.closesale) + (datalist.purch - datalist.sale)}
                              />}</TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </RctCard>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default StockSummaryReport;
