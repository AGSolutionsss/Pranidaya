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
import Selectdonor from "./selectdonor";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";

const td_left = {
  borderLeft: "1px solid black",
  borderBottom: "1px solid black",
  borderRight: "1px solid black",
  width: "455px !important",
  height: "30px !important",
  fontSize: "13px",
  padding: "3px !important",
  paddingLeft: "7px !important",

};
const td_top = {
  borderLeft: "1px solid black",
  
  borderTop: "1px solid black",
  width: "455px !important",
  height: "30px !important",
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};

const td_top_mid = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderLeft: "1px solid black",
  width: "80px !important",
  height: "30px !important",
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};
const td_top_mid1 = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderLeft: "1px solid black",
  width: "150px !important",
  height: "30px !important",
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};
const td_top_right = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  width: "10px !important",
  height: "30px !important",
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};
const td_top_right1 = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderRight: "1px solid black",
  width: "150px !important",
  height: "30px !important",
  fontSize: "13px",
  padding: "3px",
  paddingLeft: "7px",
};
const label = {
  color: "black",
  margin: "0px !important",
  fontWeight: "bold",
  height: "30px",
  padding: "7px",
};
const donation_label = {
  color: "black",
  margin: "0px",
  fontWeight: 400,
  fontSize:"12px",
};

const td_donation_amount = {
  textAlign:'right',
};

const p_text = {
  marginBottom: "0px",
  fontSize: "13px",
};

export default function Invoice(props) {
  const componentRefp = useRef();
  const [receipts, setReceipts] = useState({});
  const [company, setCompany] = useState({});
  const [theId, setTheId] = useState(0);
  const [loader, setLoader]= useState(true);

  const amountInWords = numWords(receipts.receipt_total_amount);

  const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
    localStorage.setItem("ftsid", receipts.donor_fts_id+'');
  };

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
      url: baseURL+"/fetch-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setReceipts(res.data.receipt);
      setCompany(res.data.company);
      setLoader(false)
      
    });
  }, []);

  const printReceipt = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/print-receipt/"+theId,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      window.open(baseURL+"/print-receipt/"+theId, '_blank');
      
    })
  };


  const sendEmail = (e) => {
    e.preventDefault();
    axios({
      url: baseURL+"/send-receipt/" + theId,
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
      url: baseURL+"/download-receipts/" + theId,
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
        <PageTitleBar title="Cash Receipt" match={props.match} />
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


                      {receipts!==null && (typeof (receipts.donor) !== 'undefined') && receipts.donor.donor_email!==null &&   
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
                      {receipts!==null && (typeof (receipts.donor) !== 'undefined') && receipts.donor.donor_email == null &&   
                      <>
                      <p style={{color:'red'}}><i className="mr-10 ti-email"></i> Email not found</p>
                          <Button
                          onClick={() => openmodal()}
                          className="mr-10 mb-10"
                          color="success"
                        >
                          Add Email
                        </Button>
                      
                      </>
                          
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
                    
                    <div className="d-flex justify-content-between" >
                      
                      <div className="address text-center">
                      <img
                          src={require("Assets/receipt/pranidaya.png")}
                          alt="session-logo"
                          width="750px"
                          style={{margin:'10px'}}
                        />
                        
                      </div>
                      
                    </div>
                    
                    

                    <div className="table-responsive">
                      <Table className="table table-borderless" style={{marginBottom:'0px', borderCollapse: 'collapse'}}>
                        <TableBody>
                          <TableRow>
                            <TableCell style={td_top}>&nbsp;&nbsp;Received with thanks from :</TableCell>
                            <TableCell style={td_top_mid}>&nbsp;&nbsp;Receipt No.</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{receipts.receipt_no}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            
                            <TableCell style={{borderLeft: "1px solid black",
                                lineHeight: "1.5",
                                paddingLeft: "30px",
                                paddingTop: "0px",
                                paddingBottom: "0px ",
                                padding: '4px'}} rowSpan="2">
                              <label style={label}>
                                {Object.keys(receipts).length != 0 && (
                                  <div style={{marginTop: '-30px', marginLeft: '10px'}}>
                                    <p style={p_text}>
                                    {receipts.donor.donor_type != "Individual" && (
                                      <>
                                      {receipts.donor.donor_title}
                                      </>
                                    )}
                                    {receipts.donor.donor_type == "Individual" && (
                                      <>
                                      {receipts.donor.donor_title}
                                      </>
                                    )}
                                      {" "}
                                      {

                        
                                        receipts.donor
                                          .donor_full_name
                                      }
                                    </p>
                                    
                                    
                                      <div>
                                        <p style={p_text}>
                                          {
                                            receipts.donor
                                              .donor_address
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.donor
                                              .donor_area
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.donor
                                              .donor_ladmark
                                          }
                                        </p>
                                        <p style={p_text}>
                                          {
                                            receipts.donor
                                              .donor_city
                                          }
                                          -{" "}
                                          {
                                            receipts.donor
                                              .donor_pin_code
                                          }
                                          ,
                                          {
                                            receipts.donor
                                              .donor_state
                                          }
                                        </p>
                                      </div>
                                    
                                  </div>
                                )}
                              </label>
                              
                            </TableCell>
                            <TableCell style={td_top_mid1}>&nbsp;&nbsp; Date</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{Moment(receipts.receipt_date).format('DD-MM-YYYY')}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_top_mid}>&nbsp;On account of</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{receipts.receipt_donation_type}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                          <TableCell style={td_left}>
                            &nbsp;&nbsp;
                            <>
                              PAN No :{" "}
                                    
                            </>
                              <label style={label}>
                                <b>
                                  {Object.keys(receipts).length != 0 && (
                                    <div>
                                     <p style={{fontSize:'13px'}}>
                                        {
                                          receipts.donor
                                            .donor_pan_no
                                        }
                                      </p>
                                    </div>
                                  )}
                                </b>
                              </label>
                            </TableCell>
                            <TableCell style={td_top_mid1}>&nbsp;&nbsp; Pay Mode</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              <label style={label}>
                                <b>{receipts.receipt_tran_pay_mode}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_left}>
                            &nbsp;&nbsp; Amount in words :{" "}
                              <label style={label}>
                                <b style={{textTransform: 'capitalize'}}>{amountInWords} Only</b>
                              </label>
                            </TableCell>
                            <TableCell style={td_top_mid1}>&nbsp;&nbsp;Amount</TableCell>
                            <TableCell style={td_top_right}>:</TableCell>
                            <TableCell style={td_top_right1}>
                              Rs.{" "}
                              <label style={label}>
                                <b >{receipts.receipt_total_amount}</b>
                              </label>{" "}
                              /-
                              <br />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_left} colSpan="4">
                            &nbsp;&nbsp;Reference :{" "}
                              <label style={label}>
                                <b style={{fontSize: '13px'}}>{receipts.receipt_tran_pay_details}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={td_left} colSpan="4">
                            &nbsp;&nbsp;On Occasion of :{" "}
                              <label style={label}>
                                <b style={{fontSize: '13px'}}>{receipts.receipt_occasional}</b>
                              </label>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan="1" style={{borderLeft:'1px solid black', borderBottom:'1px solid black'}}>
                              <>
                              Donation is exempted u/s 80G of the Income Tax Act 1961.<br/>
                          CIT (E) BLR/80G/S-55/AABAA6706H/1TO (E)-1/VOL 2017-2018<br/>
                          PAN : {company.company_pan_no}
                              </>
                              
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
                    
                    <div className="address text-center" style={{borderLeft:'1px solid black',borderRight:'1px solid black',borderTop:'1px solid black',borderBottom:'none'}}>
                      <h2 style={{paddingTop:'10px'}}><strong>
                        DONATION SCHEMES
                        </strong></h2>
                    </div>
                    <div className="table-responsive" style={{marginTop:'-8px'}}>
                    <Table className="table table-borderless" style={{marginBottom:'0px', borderCollapse: 'collapse',borderLeft:'1px solid black',borderRight:'1px solid black',borderTop:'none',borderBottom:'none'}}>
                      <TableBody>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>EACH COW MAINTENANCE PER DAY </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>350.00 </label></TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>PIGEON FEEDING PER BAG </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>1,500.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>GOPALAK MONTHLY </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>1,500.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>WET MAIZE GREEN GRASS PER TON </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>4,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>DRY GRASS PER TON </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>10,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>GOPALAK YEARLY </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>15,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>FULL DAY PIGEON FEEDING </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>20,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>GAU - DAAN </label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>25,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>FULL DRY FEEDING</label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>1,00,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>GOPALAK LIFE TIME</label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>1,51,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>&nbsp;&nbsp;<label style={donation_label}>FIVE COW SHED</label></TableCell>
                          <TableCell style={td_donation_amount}>&nbsp;&nbsp;<label style={donation_label}>2,51,000.00</label> </TableCell>
                          <TableCell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </div>
                    <div className="address text-center" style={{paddingTop:'30px',borderLeft:'1px solid black',borderRight:'1px solid black',borderTop:'none',borderBottom:'none'}}>
                      <h3><strong>गौ सेवा के प्रति आपकी भावना का आदर करते है।  <br/>अतिरिक्त गौ सेवा के लिये कृपया संपर्क सूत्र से जानकारी लेवे। आपकी सेवा में उत्सुक</strong></h3>
                        <div className="row" style={{paddingTop:'30px'}}>
                          <div className="col-md-8">
                            <h4><strong>CANARA BANK</strong></h4>
                            <label>
                              Jayanagar, Bengaluru<br/>
                              A/C No. : 04742200001724<br/>
                              IFSC Code : CNRB0010409<br/>
                              PAN : AABAA6706H
                            </label>
                          </div>
                          <div className="col-md-4">
                          <img
                            src={require("Assets/receipt/qr_code.png")}
                            alt="QR Code"
                            height="120"
                          />
                          </div>
                        </div>
                    </div>
                    <div className="address text-center" style={{borderLeft:'1px solid black',borderRight:'1px solid black',borderTop:'none',borderBottom:'1px solid black'}}>
                      <h4 style={{paddingTop:'10px',paddingRight:'40px',paddingLeft:'40px'}}><strong>
                        CELEBRATE BIRTHDAYS, REMEMBRANCE DAY AND OTHER SPECIAL OCCASIONS IN OUR GAUSHALA AND BE BESTOWED WITH GAUMATHA'S BLESSINGS
                        </strong></h4>
                        <div className="row">
                          <div className="col-md-6">
                            <label style={{fontWeight:'600'}}>
                              Sunil Dugar<br/>
                              <label style={{fontSize:'12px'}}>9341230748</label>
                            </label>
                          </div>
                          <div className="col-md-6">
                            <label style={{fontWeight:'600'}}>
                              Suresh Bagrecha<br/>
                              <label style={{fontSize:'12px'}}>9845605555</label>
                            </label>
                          </div>
                        </div>
                    </div>
                  </div>
                </RctCard>
              
            <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>Donor Email</ModalHeader>
        <ModalBody>
          <Selectdonor id={receipts.donor_fts_id} />
          
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
}
