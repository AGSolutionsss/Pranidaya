import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Moment from 'moment';
import "./DonorView.css";
import {baseURL} from '../../api';

export default function View() {
  const [donor, setDonor] = useState([]);
  const [donorfam, setDonorfam] = useState([]);
  const [company, setCompany] = useState([]);
  const [famgroup, setFamgroup] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: baseURL+"/fetch-donor-view-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setDonor(res.data.donor);
      setDonorfam(res.data.family_details);
      setCompany(res.data.company_details);
      setFamgroup(res.data.related_group);
      setLoader(false);
      console.log(res.data);
    });
  }, []);
  const hr = {
    marginTop: "0rem",
  };

  const relId = donor.donor_related_id;
  const indid = donor.id;
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
          {donor && (
            <div>
              <PageTitleBar title="Donor Details" />
              <div className="donorbtns">
                {famgroup.map((fam, key) => (
                  <h1 style={{paddingTop: '10px', paddingRight: '40px'}}>Family Group of : {fam.donor_full_name}</h1>
                ))}
              </div>
              <div className="row">
                <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
                  <RctCollapsibleCard>
                    <div className="flexbox">
                      <h1 style={color}>
                          {donor.donor_type == "Individual" && (
                                  <>
                                  {donor.donor_title} {donor.donor_full_name}
                                  </>
                          )}
                          {donor.donor_type != "Individual" && (
                                  <>
                                  M/s {donor.donor_full_name}
                                  </>
                          )}
                        
                        </h1>
                      <h3 style={color}>Pds Id : {donor.donor_fts_id}</h3>
                      <Link to={"donorview?id=" + indid}>
                        <Button 
                          className="mr-10 mb-10 btn-get-start" color="danger">
                           Receipts Details 
                        </Button>
                      </Link>
                    </div>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-2" >
                          <div className="form-group">
                            <p style={label3}>Father Name</p>{" "}
                            <p style={label4}>{donor.donor_father_name}</p>
                          </div>
                        </div>
                          <div className="col-sm-6 col-md-6 col-xl-2" >
                            <div className="form-group">
                              <p style={label3}>Mother Name</p>{" "}
                              <p style={label4}>{donor.donor_mother_name}</p>
                            </div>
                          </div>
                      {donor.donor_type == "Individual" && (
                        <>
                          <div className="col-sm-6 col-md-6 col-xl-2">
                            <div className="form-group">
                              <p style={label3}>Spouse Name</p>{" "}
                              <p style={label4}>{donor.donor_spouse_name}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-2">
                            <div className="form-group">
                              <p style={label3}>DOA</p>{" "}
                              {donor.donor_doa != null && (
                              <p style={label4}>{Moment(donor.donor_doa).format('DD-MM-YYYY')}</p>
                              )}
                              {donor.donor_doa == null && (
                              <p style={label4}>{donor.donor_doa}</p>
                              )}
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-2" >
                            <div className="form-group">
                              <p style={label3}>DOB</p>{" "}
                              {donor.donor_dob_annualday != null && (
                              <p style={label4}>
                                {Moment(donor.donor_dob_annualday).format('DD-MM-YYYY')}
                              </p>
                              )}
                              {donor.donor_dob_annualday == null && (
                              <p style={label4}>
                                {donor.donor_dob_annualday}
                              </p>
                              )}
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-2" >
                            <div className="form-group">
                              <p style={label3}>Gender</p>{" "}
                              <p style={label4}>{donor.donor_gender}</p>
                            </div>
                          </div>

                      
                        </>
                      )}
                      {donor.donor_type != "Individual" && (
                        <>
                          <div className="col-sm-6 col-md-6 col-xl-2">
                            <div className="form-group">
                              <p style={label3}>Contact Name</p>{" "}
                              <p style={label4}>
                                {donor.donor_contact_name}
                              </p>
                            </div>
                          </div>
                          
                          <div className="col-sm-6 col-md-6 col-xl-2">
                            <div className="form-group">
                              <p style={label3}>Gender</p>{" "}
                              <p style={label4}>{donor.donor_gender}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-2">
                            <div className="form-group">
                              <p style={label3}>Annual Day</p>{" "}
                              {donor.donor_dob_annualday != null && (
                              <p style={label4}>
                                {Moment(donor.donor_dob_annualday).format('DD-MM-YYYY')}
                              </p>
                              )}
                              {donor.donor_dob_annualday == null && (
                              <p style={label4}>
                                {donor.donor_dob_annualday}
                              </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-sm-6 col-md-6 col-xl-2" >
                        <div className="form-group">
                          <p style={label3}>PAN Number</p>{" "}
                          <p style={label4}>{donor.donor_pan_no}</p>
                        </div>
                      </div>
                      
                      <div className="col-sm-6 col-md-6 col-xl-2" >
                        <div className="form-group">
                          <p style={label1}>Donor Type</p>{" "}
                          <p style={label2}>{donor.donor_type}</p>
                        </div>
                      </div>
                     
                      <div className="col-sm-6 col-md-6 col-xl-9" >
                        <div className="form-group">
                          <p style={label1}>Remarks</p>{" "}
                          <p style={label2}>{donor.donor_remarks}</p>
                        </div>
                      </div>
                    </div>
                    <h3>Communication Details</h3>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-2">
                        <div className="form-group">
                          <p style={label1}>Mobile</p>{" "}
                          <p style={label2}>{donor.donor_mobile}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-2">
                        <div className="form-group">
                          <p style={label1}>Whats App</p>{" "}
                          <p style={label2}>{donor.donor_whatsapp}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-2">
                        <div className="form-group">
                          <p style={label1}>Email</p>{" "}
                          <p style={label2}>{donor.donor_email}</p>
                        </div>
                      </div>
                      
                    </div>
                    <h3>Correspondence Details</h3>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-5">
                        <div className="form-group">
                          <p style={label1}>Address</p>{" "}
                          {donor.donor_address != null && ( 
                          <p style={label2}>
                            {donor.donor_address},{" "}
                            {donor.donor_area},{" "}
                            {donor.donor_ladmark},
                            {donor.donor_city},{" "}
                            {donor.donor_state} -{" "}
                            {donor.donor_pin_code}
                          </p>
                          )}
                          {donor.donor_address == null && ( 
                            <p style={label2}>N.A</p> )}

                        </div>
                      </div>
                    </div>
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
            <div className="flexbox">
              <h1>Family Details</h1>
              <Link to={"/app/donor/addindiv?id=" + relId}>
                <Button 
                  className="mr-10 mb-10 btn-get-start" color="danger">
                  + Add Family Member
                </Button>
              </Link>
            </div>
            <hr style={hr} />
            <table className="donortable">
              <tr>
                <th>
                  <p>PDS</p>
                </th>
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>DOB</p>
                </th>
                <th>
                  <p>Mobile</p>
                </th>
              </tr>
              {donorfam.map((fam, key) => (
                <tr key={key}>
                  <td style={color}>{fam.donor_fts_id}</td>
                  <td style={color}>{fam.donor_full_name}</td>
                  <td style={color}>
                    {fam.donor_dob_annualday != null && (
                      <>
                        {Moment(fam.donor_dob_annualday).format('DD-MM-YYYY')}
                      </>
                    )}
                    {fam.donor_dob_annualday == null && (
                      <>
                        
                      </>
                    )}
                  </td>
                  <td style={color}>{fam.donor_mobile}</td>
                </tr>
              ))}
            </table>
          </RctCollapsibleCard>
        </div>
      </div>
      </>
       )}
       {!loader && (
        <>
      <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
          <RctCollapsibleCard>
            <div className="flexbox">
              <h1>Company Details</h1>
              <Link to={"/app/donor/addindiv?id=" + relId}>
                <Button
                className="mr-10 mb-10 btn-get-start" color="danger">
                  + Add Company
                </Button>
              </Link>
            </div>
            <hr style={hr} />
            <table className="donortable">
              <tr>
                <th>
                  <p>PDS</p>
                </th>
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>DOB</p>
                </th>
                <th>
                  <p>Mobile</p>
                </th>
              </tr>
              {company.map((fam, key) => (
                <tr key={key}>
                  <td style={color}>{fam.donor_fts_id}</td>
                  <td style={color}>{fam.donor_full_name}</td>
                  <td style={color}>
                    {fam.donor_dob_annualday != null && (
                      <>
                        {Moment(fam.donor_dob_annualday).format('DD-MM-YYYY')}
                      </>
                    )}
                    {fam.donor_dob_annualday == null && (
                      <>
                        
                      </>
                    )}  
                  </td>
                  <td style={color}>{fam.donor_mobile}</td>
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
