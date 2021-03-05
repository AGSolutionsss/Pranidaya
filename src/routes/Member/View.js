import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Moment from 'moment';

export default function View() {
  const [donor, setDonor] = useState([]);
  const [donorfam, setDonorfam] = useState([]);
  const [donation, setDonation] = useState([]);
  const [membership, setMembership] = useState([]);
  const [company, setCompany] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setDonor(res.data.individualCompany);
      setDonorfam(res.data.family_details);
      setDonation(res.data.donor_receipts);
      setMembership(res.data.membership_details);
      setCompany(res.data.company_details);
      setLoader(false);
      console.log(res.data);
    });
  }, []);
  const hr = {
    marginTop: "0rem",
  };

  const relId = donor.indicomp_related_id;
  const label1 = {
    fontSize: "0.875rem",
    fontWeight: "400",
  };

  const label2 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
  };

  const label3 = {
    fontSize: "0.875rem",
    fontWeight: "400",
    paddingLeft: "10px",
  };

  const label4 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    paddingLeft: "10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
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

              <div className="row">
                <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-8">
                  <RctCollapsibleCard>
                    <div className="flexbox">
                      <h1>{donor.title}.{donor.indicomp_full_name}</h1>
                      <h3>Fts Id : {donor.indicomp_fts_id}</h3>
                    </div>
                    <hr style={hr} />
                    <div className="row">
                      {donor.indicomp_type == "Individual" && (
                        <div className="row">
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>Father Name</p>{" "}
                              <p style={label4}>{donor.indicomp_father_name}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>Mother Name</p>{" "}
                              <p style={label4}>{donor.indicomp_mother_name}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>Spouse Name</p>{" "}
                              <p style={label4}>{donor.indicomp_spouse_name}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>DOA</p>{" "}
                              <p style={label4}>{donor.indicomp_doa}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>DOB</p>{" "}
                              <p style={label4}>
                                {donor.indicomp_dob_annualday}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label3}>Gender</p>{" "}
                          <p style={label4}>{donor.indicomp_gender}</p>
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label3}>PAN Number</p>{" "}
                          <p style={label4}>{donor.indicomp_pan_no}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label3}>Promoter</p>{" "}
                          <p style={label4}>{donor.indicomp_promoter}</p>
                        </div>
                      </div>
                        </div>
                      )}
                      {donor.indicomp_type != "Individual" && (
                        <div className="row">
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>Contact Name</p>{" "}
                              <p style={label4}>
                                {donor.indicomp_com_contact_name}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>Designation</p>{" "}
                              <p style={label4}>
                                {donor.indicomp_com_contact_designation}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label3}>Gender</p>{" "}
                          <p style={label4}>{donor.indicomp_gender}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>Annual Day</p>{" "}
                              <p style={label4}>
                                {donor.indicomp_dob_annualday}
                              </p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                              <p style={label3}>CSR</p>{" "}
                              <p style={label4}>{donor.indicomp_csr}</p>
                            </div>
                          </div>
                          
                          

                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label3}>PAN Number</p>{" "}
                          <p style={label4}>{donor.indicomp_pan_no}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label3}>Promoter</p>{" "}
                          <p style={label4}>{donor.indicomp_promoter}</p>
                        </div>
                      </div>
                        </div>
                      )}

                      
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Belongs To</p>{" "}
                          <p style={label2}>{donor.indicomp_belongs_to}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Source</p>{" "}
                          <p style={label2}>{donor.indicomp_source}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Donor Type</p>{" "}
                          <p style={label2}>{donor.indicomp_donor_type}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Type</p>{" "}
                          <p style={label2}>{donor.indicomp_type}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-9">
                        <div className="form-group">
                          <p style={label1}>Remarks</p>{" "}
                          <p style={label2}>{donor.indicomp_remarks}</p>
                        </div>
                      </div>
                    </div>
                    <h1>Communication Details</h1>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Mobile</p>{" "}
                          <p style={label2}>{donor.indicomp_mobile_phone}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Whats App</p>{" "}
                          <p style={label2}>{donor.indicomp_mobile_whatsapp}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Email</p>{" "}
                          <p style={label2}>{donor.indicomp_email}</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                          <p style={label1}>Website</p>{" "}
                          <p style={label2}>{donor.indicomp_website}</p>
                        </div>
                      </div>
                    </div>
                    <h1>Correspondence Details</h1>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-12">
                        <div className="form-group">
                          <p style={label1}>Residence Address</p>{" "}
                          <p style={label2}>
                            {donor.indicomp_res_reg_address},{" "}
                            {donor.indicomp_res_reg_area},{" "}
                            {donor.indicomp_res_reg_ladmark},
                            {donor.indicomp_res_reg_city},{" "}
                            {donor.indicomp_res_reg_state} -{" "}
                            {donor.indicomp_res_reg_pin_code}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-12">
                        <div className="form-group">
                          <p style={label1}>Office Address</p>{" "}
                          <p style={label2}>
                            {donor.indicomp_off_branch_address},{" "}
                            {donor.indicomp_off_branch_area},{" "}
                            {donor.indicomp_off_branch_ladmark},
                            {donor.indicomp_off_branch_city},{" "}
                            {donor.indicomp_off_branch_state} -{" "}
                            {donor.indicomp_off_branch_pin_code}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-12">
                        <div className="form-group">
                          <p style={label1}>Correspondence Preference</p>{" "}
                          <p style={label2}>{donor.indicomp_corr_preffer}</p>
                        </div>
                      </div>
                    </div>
                  </RctCollapsibleCard>
                </div>
                <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-4">
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
                        <tr>
                          <td>{fam.receipt_no}</td>
                          <td>{fam.individual_company.indicomp_full_name}</td>
                          <td>{Moment(fam.receipt_date).format('DD-MM-YYYY')}</td>
                          <td>{fam.receipt_total_amount}</td>
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
      <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-8">
          <RctCollapsibleCard>
            <div className="flexbox">
              <h1>Family Details</h1>
              <Link to={"/app/donor/addindiv?id=" + relId}>
                <Button className="mr-10 mb-10 btn-get-start" color="danger">
                  + Add Family Member
                </Button>
              </Link>
            </div>
            <hr style={hr} />
            <table className="donortable">
              <tr>
                <th>
                  <p>FTS</p>
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
                <tr>
                  <td>{fam.indicomp_fts_id}</td>
                  <td>{fam.indicomp_full_name}</td>
                  <td>{fam.indicomp_dob_annualday}</td>
                  <td>{fam.indicomp_mobile_phone}</td>
                </tr>
              ))}
            </table>
          </RctCollapsibleCard>
        </div>
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-4">
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
                <tr>
                  <td>{fam.receipt_no}</td>
                  <td>{fam.individual_company.indicomp_full_name}</td>
                  <td>{Moment(fam.receipt_date).format('DD-MM-YYYY')}</td>
                  <td>{fam.receipt_total_amount}</td>
                </tr>
              ))}
            </table>
          </RctCollapsibleCard>
        </div>
      </div>
      <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-8">
          <RctCollapsibleCard>
            <div className="flexbox">
              <h1>Company Details</h1>
              <Link to={"/app/donor/addcomp?id=" + relId}>
                <Button className="mr-10 mb-10 btn-get-start" color="danger">
                  + Add Company
                </Button>
              </Link>
            </div>
            <hr style={hr} />
            <table className="donortable">
              <tr>
                <th>
                  <p>FTS</p>
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
                <tr>
                  <td>{fam.indicomp_fts_id}</td>
                  <td>{fam.indicomp_full_name}</td>
                  <td>{fam.indicomp_dob_annualday}</td>
                  <td>{fam.indicomp_mobile_phone}</td>
                </tr>
              ))}
            </table>
          </RctCollapsibleCard>
        </div>
      </div>
    </div>
  );
}
