import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

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

  return (
    <div>
    { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
    {donor  && (
         <div>
           <p>Title: {donor.title}</p>
           <p>Type: {donor.indicomp_type}</p>
           <p>Contact Name: {donor.indicomp_com_contact_name}</p>
           <p>Designation: {donor.indicomp_com_contact_designation}</p>
           <p>Father Name: {donor.indicomp_father_name}</p>
           <p>Mother Name: {donor.indicomp_mother_name}</p>
           <p>Gender: {donor. indicomp_gender}</p>
           <p>Spouse Name: {donor.indicomp_spouse_name}</p>
           <p>DOB: {donor. indicomp_dob_annualday}</p>
           <p>DOA: {donor. indicomp_doa}</p>
           <p>PAN: {donor. indicomp_pan_no }</p>
           <p>Image: {donor.indicomp_image_logo}</p>
           <p>Remarks: {donor.indicomp_remarks}</p>
           <p>Promoter: {donor.indicomp_promoter}</p>
           <p>Source: {donor.indicomp_source}</p>
           <p>Mobile Number: {donor.indicomp_mobile_phone}</p>
           <p>whatsapp Number: {donor. indicomp_mobile_whatsapp}</p>
           <p>Email: {donor.indicomp_email }</p>
           <p>website: {donor.indicomp_website}</p>
           <p>Address: {donor. indicomp_res_reg_address}</p>
           <p>Area: {donor.indicomp_res_reg_area}</p>
           <p>Ladmark: {donor.indicomp_res_reg_ladmark}</p>
           <p>City: {donor.indicomp_res_reg_city}</p>
           <p>PIN Code: {donor. indicomp_res_reg_pin_code}</p>
           <p>Branch Address: {donor. indicomp_off_branch_address  }</p>
           <p>Branch Area: {donor. indicomp_off_branch_area  }</p>
           <p>Branch Ladmark: {donor. indicomp_off_branch_ladmark  }</p>
           <p>Branch City: {donor. indicomp_off_branch_city  }</p>
           <p>Branch State: {donor. indicomp_off_branch_state  }</p>
           <p>Branch PIN Code: {donor. indicomp_off_branch_pin_code  }</p>
           <p>Corr Preffer: {donor. indicomp_corr_preffer  }</p>
           <p>CSR: {donor. indicomp_csr }</p>
           <p>Belongs To: {donor. indicomp_belongs_to  }</p>
           <p>Donor Type: {donor. indicomp_donor_type}</p>
           <p>Joining Date: {donor. indicomp_joining_date}</p>
           <p>Status: {donor. indicomp_status  }</p>
           <p>Created At: {donor. indicomp_created_at}</p>
           <p>Created By: {donor. indicomp_created_by}</p>
           <p>Updated At: {donor. indicomp_updated_at  }</p>
           <p>Update By: {donor. indicomp_update_by}</p>
           </div>
        )}
        </>}
    </div>
  );
}
