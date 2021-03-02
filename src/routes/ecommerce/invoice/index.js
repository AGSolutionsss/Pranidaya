/**
 * Invoice
 */
import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "@material-ui/core/Button";
import axios from "axios";

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
  width: "100px",
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
          <div className="col-sm-12 col-md-12 col-xl-10 mx-auto">
            <RctCard>
              <div className="invoice-head text-right">
                <ul className="list-inline">
                  <li>
                    <a href="#">
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
              <div className="p-50" ref={componentRef}>
                <div className="d-flex justify-content-between">
                  <div className="invoice-logo ">
                    <img
                      src={require("Assets/receipt/fts.png")}
                      alt="session-logo"
                      className="img-fluid"
                      width="100"
                      height="40"
                    />
                  </div>
                  <div className="address text-center">
                    <h1>
                      <strong>
                        <b>वनबंधु परिषद </b>
                      </strong>
                    </h1>
                    <h1>
                      <strong>
                        <b>FRIENDS OF TRIBALS SOCIETY</b>
                      </strong>
                    </h1>
                    <h2>
                      <strong>
                        <b>{chapter.chapter_name}</b>
                      </strong>
                    </h2>
                    <label>
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
                  <div className="invoice-logo mb-30 text-right">
                    <img
                      src={require("Assets/receipt/ekal.png")}
                      alt="session-logo"
                      className="img-fluid"
                      width="100"
                      height="40"
                    />
                  </div>
                </div>
                <div className="text-center mb-30">
                  <label>
                    <small>
                      Head Office: Ekal Bhawan, 123/A, Harish Mukherjee Road,
                      Kolkata-26. Web: www.ftsindia.com Ph: 033 - 2454
                      4510/11/12/13 PAN: AAAAF0290L
                    </small>
                  </label>
                  <br />
                </div>

                <div className="table-responsive mb-40">
                  <table className="table table-borderless">
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
                                <p>
                                  {
                                    receipts.individual_company
                                      .indicomp_full_name
                                  }
                                </p>
                                {receipts.individual_company.hasOwnProperty(
                                  "indicomp_off_branch_address"
                                ) && (
                                  <div>
                                    <p>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_address
                                      }
                                    </p>
                                    <p>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_area
                                      }
                                    </p>
                                    <p>
                                      {
                                        receipts.individual_company
                                          .indicomp_off_branch_ladmark
                                      }
                                    </p>
                                    <p>
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
                                    <p>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_address
                                      }
                                    </p>
                                    <p>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_area
                                      }
                                    </p>
                                    <p>
                                      {
                                        receipts.individual_company
                                          .indicomp_res_reg_ladmark
                                      }
                                    </p>
                                    <p>
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
                            <b>{receipts.receipt_realization_date}</b>
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
                    </tbody>
                  </table>
                </div>
                <div className="note-wrapper row">
                  <div className="invoice-note col-sm-12 col-md-8">
                    {receipts.receipt_exemption_type == "80G" && (
                      <div>
                        <p className="fs-14">
                          This receipt is valid only after realisation of the
                          payment.
                          <br />
                          This donation is eligible for deduction U/S 80(G) of
                          the
                          <br />
                          Income Tax Act 1961 vide order NO:
                          DIT(E)/3260/8E/73/89-90 Dt. 13-12-2011.
                        </p>
                      </div>
                    )}
                    {receipts.receipt_exemption_type != "80G" && (
                      <div>
                        <p className="fs-14">
                          This receipt is valid only after realisation of the
                          payment.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="totle-amount col-sm-12 col-md-4 text-right">
                    <h4>For Friends of Tribals Society</h4>
                    <br />
                    <br />
                    <h4>Secretary / Treasurer</h4>
                  </div>
                </div>
              </div>
            </RctCard>
          </div>
        </div>
      </div>
    </div>
  );
}
