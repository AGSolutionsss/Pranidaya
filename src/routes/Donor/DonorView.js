import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Moment from 'moment';
import {baseURL} from '../../api';

export default function DonorView() {
  
  const [donation, setDonation] = useState([]);
  const [membership, setMembership] = useState([]); 
  const [famgroup, setFamgroup] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: baseURL+"/fetch-donor-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setDonation(res.data.donor_receipts);
      setMembership(res.data.membership_details);
      setFamgroup(res.data.related_group);
      setLoader(false);
      
    });
  }, []);
  const hr = {
    marginTop: "0rem",
  };

  
  const label1 = {
    fontSize: "0.875rem",
    fontWeight: "400",
  };

  const label2 = {
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "-10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
    color: "#3e7dc4",
  };

  const label3 = {
    fontSize: "0.875rem",
    fontWeight: "400",
    paddingLeft: "10px",
  };

  const label4 = {
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "-10px",
    paddingLeft: "10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
    color: "#3e7dc4",
  };

  const color ={
    color: "#3e7dc4",
  };

  return (
    <div>
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
          {donation && (
            <div>
              <PageTitleBar title="Receipts Details" />
              <div className="donorbtns">
                {famgroup.map((fam, key) => (
                  <h1 style={{paddingTop: '10px', paddingRight: '40px'}}>Family Group of : {fam.donor_full_name}</h1>
                ))}
              </div>
              <div className="row">
                <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
                  <RctCollapsibleCard>
                    <h1>Donation Details</h1>
                    <hr style={hr} />
                    <table className="donortable">
                      <tr>
                        <th>
                          <p>R.No</p>
                        </th>
                        <th>
                          <p>Name</p>
                        </th>
                        <th>
                          <p>Date</p>
                        </th>
                        <th>
                          <p>Amount</p>
                        </th>
                      </tr>
                      {donation.map((fam, key) => (
                        <tr key={key}>
                          <td style={{color: '#3e7dc4',fontSize:'14px'}}>{fam.receipt_no}</td>
                          <td style={{color: '#3e7dc4',fontSize:'14px'}}>{fam.donor_full_name}</td>
                          <td style={{color: '#3e7dc4',fontSize:'14px'}}>{Moment(fam.receipt_date).format('DD-MM-YYYY')}</td>
                          <td style={{color: '#3e7dc4',fontSize:'14px'}}>{fam.receipt_total_amount}</td>
                        </tr>
                      ))}
                    </table>
                  </RctCollapsibleCard>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {!loader && (
        <>
      <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
          <RctCollapsibleCard>
            <h1>Membership Details</h1>
            <hr style={hr} />
            <table className="donortable">
              <tr>
                <th>
                  <p>R.No</p>
                </th>
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>Date</p>
                </th>
                <th>
                  <p>Amount</p>
                </th>
              </tr>
              {membership.map((fam, key) => (
                <tr key={key}>
                  <td style={{color: '#3e7dc4',fontSize:'14px'}}>{fam.receipt_no}</td>
                  <td style={{color: '#3e7dc4',fontSize:'14px'}}>{fam.donor.donor_full_name}</td>
                  <td style={{color: '#3e7dc4',fontSize:'14px'}}>{Moment(fam.receipt_date).format('DD-MM-YYYY')}</td>
                  <td style={{color: '#3e7dc4',fontSize:'14px'}}>{fam.receipt_total_amount}</td>
                </tr>
              ))}
            </table>
          </RctCollapsibleCard>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
