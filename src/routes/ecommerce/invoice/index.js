/**
 * Invoice
 */
import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Moment from 'moment';
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// intl messages
import IntlMessages from "Util/IntlMessages";

// rct card
import { RctCard } from "Components/RctCard/index";
import numWords from "num-words";

const td1 = {
  border: "1px solid Black",
  padding: "5px",
  height: "30px",
  margin: "0px",
  color: "rgb(42, 46, 143)",
};
const td_dot = {
  borderBottom: "1px solid Black",
  borderTop: "1px solid Black",
  padding: "5px",
  height: "30px",
  margin: "0px",
  color: "rgb(42, 46, 143)",
};
const td_right = {
  borderRight: "1px solid black",
  borderBottom: "1px solid black",
  borderTop: "1px solid black",
};
const td_left = {
  borderLeft: "1px solid black",
  borderBottom: "1px solid black",
  borderRight: "1px solid black",
};
const td_top = {
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
  borderTop: "1px solid black",
  width: "500px",
};
const td_top1 = {
  borderLeft: "1px solid black",
  lineHeight: "1.5",
  paddingLeft: "30px",
  paddingTop: "0px",
  paddingBottom: "0px",
};
const td_top_mid = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  width: "111px",
};
const td_top_mid1 = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderLeft: "1px solid black",
  width: "100px",
};
const td_top_right = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  width: "10px",
};
const td_top_right1 = {
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  borderRight: "1px solid black",
  width: "150px",
};
const label = {
  color: "black",
  margin: "0px",
  fontWeight: "bold",
};
const label1 = {
  color: "rgb(42, 46, 143)",
};

const p_text = {
  marginBottom: "0px",
};

export default function Invoice(props) {
  const componentRef = useRef();
  const [receipts, setReceipts] = useState({});
  const [chapter, setChapter] = useState({});

  const amountInWords = numWords(receipts.receipt_total_amount);

  useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setReceipts(res.data.receipt);
      setChapter(res.data.chapter);
    });
  }, []);
  return (
    <div>
      <div className="invoice-wrapper">
        <PageTitleBar title="Receipt" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-10 mx-auto" style={{width:'auto'}}>
            <RctCard>
              <div className="invoice-head text-right">
                <ul className="list-inline">
                  <li>
                    <a href= "https://legacy.testags.com/public/generate-pdf?id=id">
                      <i className="mr-10 ti-download"></i> Download
                    </a>
                  </li>
                  <li>
                    <a href="mailto: tongra1@gmail.com">
                      <i className="mr-10 ti-email"></i> Email
                    </a>
                  </li>
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <a href="#">
                          <i className="mr-10 ti-printer"></i> Print
                        </a>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul>
              </div>
              <div className="p-50" ref={componentRef} style={{margin:'20px'}}>
                <img
                    src={require("Assets/receipt/fts_wm.png")}
                    alt="water mark"
                    style={{width:'20cm',height:'20cm',position:'absolute', top:'130px',left:'100px'}}
                    />
                <div className="d-flex justify-content-between" style={{borderLeft:'1px solid black',borderRight:'1px solid black',borderTop:'1px solid black'}}>
                  <div className="invoice-logo ">
                    <img
                      src={require("Assets/receipt/fts.png")}
                      alt="session-logo"
                      width="100"
                      height="100"
                      style={{margin:'20px',marginLeft:'50px'}}
                    />
                  </div>
                  <div className="address text-center">
                    <h1 style={{marginTop:'30px',color:'#468ccc'}}>
                      <strong>
                        <b>वनबंधु परिषद </b>
                      </strong>
                    </h1>
                    <h1 style={{color:'#468ccc'}}>
                      <strong>
                        <b>FRIENDS OF TRIBALS SOCIETY</b>
                      </strong>
                    </h1>
                    <h2>
                      <strong>
                        <b>{chapter.chapter_name}</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo mb-30 text-right">
                    <img
                      src={require("Assets/receipt/ekal.png")}
                      alt="session-logo"
                      width="100"
                      height="100"
                      style={{margin:'20px',marginRight:'50px'}}
                    />
                  </div>
                </div>
                <div className="text-center" style={{borderLeft:'1px solid black',borderRight:'1px solid black',borderBottom:'1px solid black',marginTop:'-40px'}}>
                  <div className="address text-center">
                    <label style={{paddingLeft:'30px',paddingRight:'30px'}}>
                      {chapter.chapter_address},{chapter.chapter_city} -{" "}
                      {chapter.chapter_pin}, {chapter.chapter_state}
                    </label>{" "}
                    <br />
                    <label>
                      Email: {chapter.chapter_email} | {chapter.chapter_website}{" "}
                      | Ph : {chapter.chapter_phone} | Mob :{" "}
                      {chapter.chapter_whatsapp}
                    </label>
                    <br />
                  </div>
                </div>
                <div className="text-center" style={{borderLeft:'1px solid black',borderRight:'1px solid black'}}>
                  <label style={{fontSize:'14px',marginBottom:'2px',marginTop:'2px'}}>
                    <small>
                      Head Office: Ekal Bhawan, 123/A, Harish Mukherjee Road,
                      Kolkata-26. Web: www.ftsindia.com Ph: 033 - 2454
                      4510/11/12/13 PAN: AAAAF0290L
                    </small>
                  </label>
                  <br />
                </div>

                <div className="table-responsive">
                  <table className="table table-borderless" style={{marginBottom:'0px'}}>
                    <tbody>
                      <tr>
                        <td style={td_top}>Received with thanks from :</td>
                        <td style={td_top_mid}>Receipt No.</td>
                        <td style={td_top_right}>:</td>
                        <td style={td_top_right1}>
                          <label style={label}>
                            <b>{receipts.receipt_no}</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td style={td_top1} rowspan="2">
                          <label style={label}>
                            {Object.keys(receipts).length != 0 && (
                              <div>
                                <p style={p_text}>
                                  {
                                    receipts.individual_company
                                      .indicomp_full_name
                                  }
                                </p>
                                {receipts.individual_company.hasOwnProperty(
                                  "indicomp_off_branch_address"
                                ) && (
                                  <div>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_address
                                      }
                                    </p>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_area
                                      }
                                    </p>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_ladmark
                                      }
                                    </p>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_city
                                      }
                                      -{" "}
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_pin_code
                                      }
                                      ,
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_state
                                      }
                                    </p>
                                  </div>
                                )}
                                {receipts.individual_company.hasOwnProperty(
                                  "indicomp_res_reg_address"
                                ) && (
                                  <div>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_address
                                      }
                                    </p>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_area
                                      }
                                    </p>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_ladmark
                                      }
                                    </p>
                                    <p style={p_text}>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_city
                                      }
                                      -{" "}
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_pin_code
                                      }
                                      ,
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_state
                                      }
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </label>
                          {/* <br />
                        <label style={label}>
                          Flat No.4102, Prestige Wellington Park ,
                        </label>
                        <br />
                        <label style={label}>
                          Gangamma Circle, Jalahalli , Bangalore - 560013 ,
                          Karnataka .
                        </label> */}
                        </td>
                        <td style={td_top_mid1}> Date</td>
                        <td style={td_top_right}>:</td>
                        <td style={td_top_right1}>
                          <label style={label}>
                            <b>{Moment(receipts.receipt_date).format('DD-MM-YYYY')}</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td style={td_top_mid}>On account of</td>
                        <td style={td_top_right}>:</td>
                        <td style={td_top_right1}>
                          <label style={label}>
                            <b>{receipts.receipt_donation_type}</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td style={td_left}>
                          PAN No :{" "}
                          <label style={label}>
                            <b>
                              {Object.keys(receipts).length != 0 && (
                                <div>
                                  <p>
                                    {
                                      receipts.individual_company
                                        .indicomp_pan_no
                                    }
                                  </p>
                                </div>
                              )}
                            </b>
                          </label>
                        </td>
                        <td style={td_top_mid}> Pay Mode</td>
                        <td style={td_top_right}>:</td>
                        <td style={td_top_right1}>
                          <label style={label}>
                            <b>{receipts.receipt_tran_pay_mode}</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td style={td_left}>
                          Amount in words :{" "}
                          <label style={label}>
                            <b>{amountInWords}</b>
                          </label>
                        </td>
                        <td style={td_top_mid}>Amount</td>
                        <td style={td_top_right}>:</td>
                        <td style={td_top_right1}>
                          Rs.{" "}
                          <label style={label}>
                            <b>{receipts.receipt_total_amount}</b>
                          </label>{" "}
                          /-
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td style={td_left} colspan="4">
                          Reference :{" "}
                          <label style={label}>
                            <b>{receipts.receipt_tran_pay_details}</b>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="1" style={{borderLeft:'1px solid black', borderBottom:'1px solid black'}}>
                          {receipts.receipt_exemption_type == "80G" && (
                            <div>
                              This receipt is valid only after realisation of the
                              payment.
                              <br />
                              This donation is eligible for deduction U/S 80(G) of
                              the
                              <br />
                              Income Tax Act 1961 vide order NO:
                              DIT(E)/3260/8E/73/89-90 Dt. 13-12-2011.
                            </div>
                          )}
                          {receipts.receipt_exemption_type != "80G" && (
                            <div>
                              This receipt is valid only after realisation of the
                              payment.
                            </div>
                          )}
                        </td>
                        <td colSpan="3" style={{borderBottom:'1px solid black', borderRight:'1px solid black', textAlign:'right'}}>
                          For Friends of Tribals Society
                          <br />
                          <br />
                          <br />
                          Secretary / Treasurer
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </RctCard>
          </div>
        </div>
      </div>
    </div>
  );
}
