import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import Moment from 'moment';
import Selectdonor from "./selectdonor";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

export default function EditReceipt() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [userdata, setUserdata] = React.useState("");
  const [loader, setLoader]= useState(true);

  let history = useHistory();
  

  const [donor, setDonor] = React.useState({
    receipt_no: "",
    receipt_date: "",
    receipt_old_no: "",
    receipt_exemption_type: "",
    receipt_total_amount: "",
    receipt_realization_date: "",
    receipt_donation_type: "",
    receipt_tran_pay_mode: "",
    receipt_tran_pay_details: "",
    receipt_remarks: "",
    receipt_reason: "",
    receipt_email_count: "",
    indicomp_fts_id:"",
    receipt_created_at: "",
    receipt_created_by: "",
    receipt_update_at: "",
    receipt_update_by: "",
    individual_company: {
			indicomp_full_name:"",
      indicomp_pan_no: "",
      indicomp_fts_id:"",
    }
  });

  // const { personName, userName, mobile, email } = user;
  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      indicomp_fts_id: donor.indicomp_fts_id,
      receipt_no: donor.receipt_no,
      receipt_date: donor.receipt_date,
      receipt_old_no: donor.receipt_old_no,
      receipt_exemption_type: donor.receipt_exemption_type,
      receipt_total_amount: donor.receipt_total_amount,
      receipt_realization_date: donor.receipt_realization_date,
      receipt_donation_type: donor.receipt_donation_type,
      receipt_tran_pay_mode: donor.receipt_tran_pay_mode,
      receipt_tran_pay_details: donor.receipt_tran_pay_details,
      receipt_remarks: donor.receipt_remarks,
      receipt_reason: donor.receipt_reason,
      receipt_email_count: donor.receipt_email_count,
      receipt_created_at: donor.receipt_created_at,
      receipt_created_by: donor.receipt_created_by,
      receipt_update_at: donor.receipt_update_at,
      receipt_update_by: donor.receipt_update_by,
    };
    var v = document.getElementById("createrec").checkValidity();
     var v = document.getElementById("createrec").reportValidity();
     e.preventDefault();
    // const val = validate();
    // const dateval = datevalidate();
    if (v) {
      axios({
        url: baseURL+"/update-receipt/" + id,
        method: "PUT",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        console.log("receipt", res.data);
        NotificationManager.success("Receipt Updated Sucessfully");
        history.push("listing");
        
      });
      
    }
  };

  const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
  };

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    axios({
      url: baseURL+"/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setUserdata(res.data.individualCompany);
      
    });
    axios({
      url: baseURL+"/fetch-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setDonor(res.data.receipt);
      setLoader(false)
      console.log("receiptdata", res.data);
    });
  }, []);
  
  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <RctCollapsibleCard heading="Suspense Receipts">
        <div className="receiptDetails">
          <h4>Receipt No : {donor.receipt_no}</h4>
          <h4>Receipt Date : {Moment(donor.receipt_date).format('DD-MM-YYYY')}</h4>
          <h4>Year : {donor.receipt_financial_year}</h4>
          <h4></h4>
          <h4></h4>
          <h4></h4>
        </div>
        <hr style={{marginTop:'0px'}}/>
        <form id="createrec" autoComplete="off">
          <div className="row">
          <div className="col-sm-3 col-md-6 col-xl-8">
              <div className="form-group">
                <h3>Please Select Donor ( Note : Please select the donor carefully. You can't change or undo this step. )</h3>
              </div>
            </div>
            {/* <div className="col-sm-3 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  id="text"
                  fullWidth
                  label="Donor FTS ID"
                  name="indicomp_fts_id"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> */}
          </div>
          <div className="receiptbuttons">
            {/* <Button
              type="submit"
              onClick={(e) => onSubmit(e)}
              className="mr-10 mb-10"
              color="primary"
            >
              Submit
            </Button> */}
            <Button
                onClick={() => openmodal()}
                className="mr-10 mb-10"
                color="success"
              >
                Select Donor
              </Button>
            <Link to="listing">
              <Button className="mr-10 mb-10" color="danger">
                Back
              </Button>
            </Link>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>Add to Group</ModalHeader>
        <ModalBody>
          <Selectdonor id={donor.id} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      </>}
    </div>
  );
}
