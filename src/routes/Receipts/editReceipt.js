import React, { useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from "reactstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";


// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
const exemption = [
  {
    value: '80G',
    label: '80G',
  },
  {
    value: 'Non 80G',
    label: 'Non 80G',
  },
  {
    value: 'FCRA',
    label: 'FCRA',
  },
];

const pay_mode = [
  {
    value: 'Cash',
    label: 'Cash',
  },
  {
    value: 'Cheque',
    label: 'Cheque',
  },
  {
    value: 'Transfer',
    label: 'Transfer',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];

const pay_mode_2 = [

  {
    value: 'Cheque',
    label: 'Cheque',
  },
  {
    value: 'Transfer',
    label: 'Transfer',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];
const donation_type = [
  {
    value: 'OTS',
    label: 'OTS',
  },
  {
    value: 'General',
    label: 'General',
  },
  {
    value: 'Membership',
    label: 'Membership',
  },
];
const donation_type_2 = [
  {
    value: 'OTS',
    label: 'OTS',
  },
  {
    value: 'General',
    label: 'General',
  },

];

export default function EditReceipt() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [userdata, setUserdata] = React.useState('')

  let history = useHistory();
  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, '0');
  // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();

  // today = mm + '/' + dd + '/' + yyyy;
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
    receipt_created_at: "",
    receipt_created_by: "",
    receipt_update_at: "",
    receipt_update_by: "",
  });



  // const { personName, userName, mobile, email } = user;
  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };



  const onSubmit = (e) => {
    let data = {
      indicomp_fts_id: userdata.indicomp_fts_id,
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
    var v = document.getElementById('createrec').checkValidity();
    var v = document.getElementById('addIndiv').reportValidity();
    e.preventDefault();
    // const val = validate();
    // const dateval = datevalidate();
    if (v) {
      axios({
        url: "https://ftschamp.trikaradev.xyz/api/update-receipt/" + id,
        method: "PUT",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        console.log("receipt", res.data);
        alert("success");
        history.push('listing');
      });
      console.log("hell")
    }
  };


  useEffect(() => {
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setUserdata(res.data.individualCompany)
    });
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-receipt-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setDonor(res.data.receipt)
      console.log("receiptdata",res.data)
    });
  }, []);
  console.log(userdata.indicomp_pan_no)
  const pan = userdata.indicomp_pan_no == "" ? "NA" : userdata.indicomp_pan_no;
  return (
    <div>
      <RctCollapsibleCard heading="Receipt">
        <div className="receiptDetails">
          <h4>Name : {userdata.indicomp_full_name}</h4>
          <h4>FTS Id : {userdata.indicomp_fts_id}</h4>
          <h4>Pan No : {pan}</h4>
          <h4>Receipt Date : {donor.receipt_date}</h4>
          <h4>Year : {donor.receipt_financial_year}</h4>

        </div>
        <div className="receiptDetails">
          
          <h4>Receipt No : {donor.receipt_no}</h4>
          <h4>Receipt Ref : {donor.receipt_reference}</h4>
          <h4></h4>
          <h4></h4>
          <h4></h4>
         
         

        </div>
        {donor.receipt_total_amount > 2000 && donor.receipt_exemption_type == "80G" && pan == "NA" ? <span className="amounterror">Max amount allowedwithout Pan card is 2000</span> : ""}
        <form id="createrec" autoComplete="off">
          <div className="row">


            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="select-exemption" select label="Category"
                  // onChange={this.handleChange('exemption')}
                  name="receipt_exemption_type"
                  value={donor.receipt_exemption_type}
                  onChange={(e) => onInputChange(e)}
                  required
                  SelectProps={{
                    MenuProps: {
                    },
                  }}

                  helperText="Please select your Exemption Type"
                  fullWidth>
                  {exemption.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}

                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="text" fullWidth label="Total Amount" name="receipt_total_amount"
                  value={donor.receipt_total_amount}
                  required
                  onChange={(e) => onInputChange(e)} autoComplete="Total Amount" />
              </div>
            </div>
           
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="select-pay_mode" select label="Transaction Type"
                  // onChange={this.handleChange('pay_mode')}
                  name="receipt_tran_pay_mode"
                  required
                  value={donor.receipt_tran_pay_mode}
                  onChange={(e) => onInputChange(e)}
                  SelectProps={{
                    MenuProps: {
                    },
                  }}

                  helperText="Please select your Transaction Type"
                  fullWidth>

                  {donor.receipt_exemption_type == "80G" && donor.receipt_total_amount > 2000 ? pay_mode_2.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )) : pay_mode.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                  }
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="select-donation_type" select label="Purpose"
                  // onChange={this.handleChange('donation_type')}
                  SelectProps={{
                    MenuProps: {
                    },
                  }}
                  name="receipt_donation_type"
                  required
                  value={donor.receipt_donation_type}
                  onChange={(e) => onInputChange(e)}
                  SelectProps={{
                    MenuProps: {
                    },
                  }}
                  helperText="Please select your Donation Type"
                  fullWidth>
                  {donor.receipt_exemption_type == "80G" ? donation_type_2.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )) : donation_type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                  }
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="full-width"
                  label="Realization Date"
                  type="date"
                  name="receipt_realization_date"
                  value={donor.receipt_realization_date}
                  onChange={(e) => onInputChange(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Realization Date"
                  fullWidth
                />
              </div>
              {donor.receipt_realization_date > new Date ? <span class="dateerror">Invalid Date </span> : ""}

            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField id="text" fullWidth label="Transaction Pay Details" helperText="Cheque No / Bank Name / UTR / Any Other Details" name="receipt_tran_pay_details"
                  value={donor.receipt_tran_pay_details}
                  multiline
                  onChange={(e) => onInputChange(e)} autoComplete="Transaction Pay Details" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField id="text" name="receipt_remarks"
                  value={donor.receipt_remarks}
                  multiline
                  onChange={(e) => onInputChange(e)} fullWidth label="Remarks" autoComplete="Remarks" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField id="text" name="receipt_reason"
                  value={donor.receipt_reason}
                  multiline
                  required
                  onChange={(e) => onInputChange(e)} fullWidth label="Reason" autoComplete="Reason" />
              </div>
            </div>

          </div>
          <div className="receiptbuttons">
            <Button type="submit" onClick={(e) => onSubmit(e)} className="mr-10 mb-10" color="primary">Submit</Button>
            <Button className="mr-10 mb-10" color="danger">Cancel</Button>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  )
}
