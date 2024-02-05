import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Moment from 'moment';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import numWords from "num-words";
import { NotificationManager,} from "react-notifications";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../Receipts/receiptview.css';
import { savePDF } from '@progress/kendo-react-pdf';


const td_top_first = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderLeft: "1px solid black",
  width: "80px !important",
  
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};

const td_top_mid = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  width: "10px !important",
  
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};
const td_top_last = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderRight: "1px solid black",
  width: "150px !important",
  
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};
const label = {
  color: "black",
  margin: "0px !important",
  fontWeight: "bold",
  
  padding: "7px",
};


const p_text = {
  marginBottom: "0px",
  fontSize: "13px",
};

export default function Invoice(props) {
  const componentRefp = useRef();
  const [receipts, setReceipts] = useState({});
  const [company, setCompany] = useState({});
  const [donor, setDonor] = useState({});
  const [receiptsSub, setReceiptsSub] = useState({});
  const [theId, setTheId] = useState(0);
  const [loader, setLoader]= useState(true);

 

  
  

  sendEmail
  
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); 
  var yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;
  

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    setTheId(id);

    axios({
      url: baseURL+"/fetch-m-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setReceipts(res.data.receipts);
      setCompany(res.data.company);
      setDonor(res.data.donor);
      setReceiptsSub(res.data.receiptSub);
      setLoader(false)
      
    });
  }, []);

  const printReceipt = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/print-receiptm/"+theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      window.open(baseURL+"/print-receiptm/"+theId, '_blank');
      
    })
  };


  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/send-receiptm/" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Email Sent Sucessfully");
      
    })
  };

  const downloadReceipt = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/download-receiptsm/" + theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Receipt Downloaded Sucessfully");
      
    }).catch((err) =>{
      NotificationManager.error("Receipt Not Downloaded");
    })
  };
  
  const  handleExportWithFunction  = (e) => {
    savePDF(componentRefp.current, { 
      paperSize:  "auto", 
      margin: 40,
        scale: 0.8,
    });
  }
  
  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Material Receipt" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-9 mx-auto" style={{width:'auto'}}>
              <RctCard>
                  <div 
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 4
                        ? "none" : "",
                    }}
                  className="invoice-head text-right">
                    <ul className="list-inline">
                      <li>
                        <a  onClick={(e) => downloadReceipt(e)}>
                          <i className="mr-10 ti-download"></i> Download
                        </a>
                      </li> 
                    
                      <li>


                      {donor!==null && (typeof (donor) !== 'undefined') && donor.donor_email!==null &&   
                      <a onClick={(e) => sendEmail(e)} >
                        
                          <i className="mr-10 ti-email"></i> Email<br/>
                          {receipts.receipt_email_count == null &&
                            <small style={{fontSize:'10px'}}>Email Sent 0 Times</small>
                          }
                          {receipts.receipt_email_count !== null &&
                            <small style={{fontSize:'10px'}}>Email Sent {receipts.receipt_email_count} Times </small>
                          }
                        </a>

                    }
                      {receipts!==null && (typeof (donor) !== 'undefined') && donor.donor_email == null &&   
                     
                      <p style={{color:'red'}}><i className="mr-10 ti-email"></i> Email not found</p>
                    }
            
                    
                      </li>
                      
                      <li>
                        
                        
                            <a  onClick={(e) => printReceipt(e)}>
                              <i className="mr-10 ti-printer"></i> Print Receipt
                            </a>
                        
                        
                      </li> 
                      
                      
                    </ul>
                  </div>
                  <div className="p-10" ref={componentRefp} style={{margin: '5px'}}>
                    <div className="table-responsive">
                      <Table className="table table-borderless" style={{marginBottom:'0px', borderCollapse: 'collapse'}}>
                        <TableBody>
                        <TableRow>
                          <TableCell rowSpan="3">
                            <img
                              src={require("Assets/receipt/pranidaya.png")}
                              alt="session-logo"
                              width="480px"
                              
                            />
                          </TableCell>
                          <TableCell style={td_top_first}>&nbsp;&nbsp;Receipt No.</TableCell>
                          <TableCell style={td_top_mid}>:</TableCell>
                          <TableCell style={td_top_last}>
                            <label style={label}><b>{receipts.m_receipt_no}</b></label>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={td_top_first}>&nbsp;&nbsp; Date</TableCell>
                          <TableCell style={td_top_mid}>:</TableCell>
                          <TableCell style={td_top_last}>
                            <label style={label}><b>{Moment(receipts.m_receipt_date).format('DD-MM-YYYY')}</b></label>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={td_top_first}>&nbsp;&nbsp;Vehicle </TableCell>
                          <TableCell style={td_top_mid}>:</TableCell>
                          <TableCell style={td_top_last}>
                            <label style={label}><b>{receipts.m_receipt_vehicle_no}</b></label>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan="4" style={{borderLeft: "1px solid black",
                          borderTop: "1px solid black",borderRight: "1px solid black",
                                lineHeight: "1.5",
                                paddingLeft: "30px",
                                paddingTop: "0px",
                                paddingBottom: "0px ",
                                padding: '4px'}} >
                                  &nbsp;&nbsp;Received with thanks from :
                              <label style={label}>
                                {Object.keys(receipts).length != 0 && (
                                  <div style={{marginLeft: '10px'}}>
                                    <p style={p_text}>
                                      {donor.donor_title}
                                      {" "}
                                      { donor
                                          .donor_full_name
                                      }
                                    </p>
                                    
                                    
                                      <div>
                                        <p style={p_text}>
                                          {
                                            donor
                                              .donor_address
                                          }
                                        
                                          {
                                            donor
                                              .donor_city
                                          }
                                          -{" "}
                                          {
                                            donor
                                              .donor_pin_code
                                          }
                                          ,
                                          {
                                            donor
                                              .donor_state
                                          }
                                        </p>
                                      </div>
                                    
                                  </div>
                                )}
                              </label>
                              
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan="4" style={{borderTop: "1px solid black",
                            borderRight: "1px solid black",borderLeft: "1px solid black",}}>
                            &nbsp;&nbsp;on the Occasion of :{" "}
                              <label style={label}><b style={{fontSize: '13px'}}>{receipts.m_receipt_occasional}</b></label>
                          </TableCell>
                        </TableRow>                 
                        <TableRow>
                            <TableCell style={{borderTop: "1px solid black",borderBottom: "1px solid black",borderRight: "1px solid black",borderLeft: "1px solid black",}} colSpan="4">
                            &nbsp;&nbsp;In account of :{" "}
                            {
                                receiptsSub.map((option) => (
                                <label style={label}>
                                    <b style={{fontSize: '13px'}}>{option.purchase_sub_item} - {option.purchase_sub_qnty} {option.purchase_sub_unit}</b>
                                </label>
                                ))
                            }
                              
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan="1" style={{borderLeft:'1px solid black', borderBottom:'1px solid black',textAlign:'center',fontSize: '13px'}}>
                              <br />
                              <br />
                              <br />
                              {donor.donor_title}{" "}{ donor.donor_full_name}
                              <br />
                              Donor
                            </TableCell>
                            <TableCell colSpan="3" style={{borderBottom:'1px solid black', borderRight:'1px solid black', textAlign:'center',fontSize: '13px'}}>
                              For {company.company_name}
                              <br />
                              <br />
                              {company.company_authsign}
                              <br />
                              Receiver
                            </TableCell>
                          </TableRow>             
                        </TableBody>
                      </Table>
                    </div>
                    <br/>
                </div>
                </RctCard>
              
            
          </div>
        </div>
      </div>
      </>}
    </div>
  );
}
