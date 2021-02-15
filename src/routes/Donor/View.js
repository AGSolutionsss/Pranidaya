import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

export default function View() {
  const [donor, setDonor] = useState([]);
  const [loader, setLoader]= useState(true);

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
      setLoader(false)
   
    });
  }, []);
  const hr = {
    marginTop: "0rem"
  };

  const label1 = {
    fontSize: "0.875rem",
    fontWeight: "400"
  };

  const label2 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif"
  };

  return (
    
    <div>
    { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
    {donor  && (
      <div className="row">
         <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-8">
           <RctCollapsibleCard>
           <h1>Personal Details</h1><hr style={hr}/>
           <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Full Name</p> <p style={label2}>{donor.title}.{donor.indicomp_full_name}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Father Name</p> <p style={label2}>{donor.indicomp_father_name}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Mother Name</p> <p style={label2}>{donor.indicomp_mother_name}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Gender</p> <p style={label2}>{donor.indicomp_gender}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Spouse Name</p> <p style={label2}>{donor.indicomp_spouse_name}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>DOB</p> <p style={label2}>{donor.indicomp_dob_annualday}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>DOA</p> <p style={label2}>{donor.indicomp_doa}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>PAN Number</p> <p style={label2}>{donor.indicomp_pan_no}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Promoter</p> <p style={label2}>{donor.indicomp_promoter}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Belongs To</p> <p style={label2}>{donor.indicomp_belongs_to}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Source</p> <p style={label2}>{donor.indicomp_source}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Donor Type</p> <p style={label2}>{donor.indicomp_donor_type}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Type</p> <p style={label2}>{donor.indicomp_type}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-9">
                <div className="form-group">
                  <p style={label1}>Remarks</p> <p style={label2}>{donor.indicomp_remarks}</p>
                </div>
              </div>
           </div>
           <h1>Communication Details</h1><hr style={hr}/>
           <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Mobile</p> <p style={label2}>{donor.indicomp_mobile_phone}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Whats App</p> <p style={label2}>{donor.indicomp_mobile_whatsapp}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Email</p> <p style={label2}>{donor.indicomp_email}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Website</p> <p style={label2}>{donor.indicomp_website}</p>
                </div>
              </div>
           </div>
           <h1>Correspondence Details</h1><hr style={hr}/>
           <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <p style={label1}>Residence Address</p> <p style={label2}>{donor. indicomp_res_reg_address}, {donor.indicomp_res_reg_area}, {donor.indicomp_res_reg_ladmark}, 
                    {donor.indicomp_res_reg_city}, {donor.indicomp_res_reg_state} - {donor.indicomp_res_reg_pin_code}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <p style={label1}>Office Address</p> <p style={label2}>{donor. indicomp_off_branch_address}, {donor.indicomp_off_branch_area}, {donor.indicomp_off_branch_ladmark}, 
                    {donor.indicomp_off_branch_city}, {donor.indicomp_off_branch_state} - {donor.indicomp_off_branch_pin_code}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <p style={label1}>Correspondence Preference</p> <p style={label2}>{donor.indicomp_corr_preffer}</p>
                </div>
              </div>
           </div>
          </RctCollapsibleCard>
        </div>
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-4">
          <RctCollapsibleCard>
          <h1>Donation Details</h1><hr style={hr}/>
          <table>
            
              <tr>
                <th><p>R.No</p></th>
                <th><p>Name</p></th>
                <th><p>Date</p></th>
                <th><p>Amount</p></th>
              </tr>
            
          </table>
          </RctCollapsibleCard>
        </div>
        </div>
        
        )}
        </>}
        <div className="row">
          <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-8">
            <RctCollapsibleCard>
              <h1>Family Details</h1><hr style={hr}/>
              <table>
                
                  <tr>
                    <th><p>FTS</p></th>
                    <th><p>Name</p></th>
                    <th><p>DOB</p></th>
                    <th><p>Mobile</p></th>
                  </tr>
                
              </table>
            </RctCollapsibleCard>
          </div><div className="textfields-wrapper col-sm-12 col-md-12 col-lg-4">
            <RctCollapsibleCard>
              <h1>Membership Details</h1><hr style={hr}/>
              <table>
                
                  <tr>
                    <th><p>R.No</p></th>
                    <th><p>Name</p></th>
                    <th><p>Date</p></th>
                    <th><p>Amount</p></th>
                  </tr>
                
              </table>
            </RctCollapsibleCard>
          </div>
        </div>
        <div className="row">
          <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-8">
            <RctCollapsibleCard>
              <h1>Company Details</h1><hr style={hr}/>
              <table>
                
                  <tr>
                    <th><p>FTS</p></th>
                    <th><p>Name</p></th>
                    <th><p>DOB</p></th>
                    <th><p>Mobile</p></th>
                  </tr>
                
              </table>
            </RctCollapsibleCard>
          </div>
        </div>
    </div>
  );
}
