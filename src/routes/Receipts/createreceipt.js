import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from "reactstrap";
import axios from "axios";




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

const donation_type = [
  {
    value: 'One Teacher School',
    label: 'One Teacher School',
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

export default function Createreceipt() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [userdata,setUserdata]= React.useState('')

  React.useEffect(() => {
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     
      setUserdata(res.data.individualCompany)

    });
  }, []);
  console.log(userdata)
  const pan = userdata.indicomp_pan_no== "" ? "NA" : userdata.indicomp_pan_no
  return (
    <div>
      <RctCollapsibleCard heading="Receipt">
        <div className="receiptDetails">
          <h4>Name : {userdata.indicomp_full_name}</h4>
          <h4>FTS Id : {userdata.indicomp_fts_id}</h4>
          <h4>Pan No : {pan}</h4>

        </div>

        <form noValidate autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="full-width"
                  label="Receipt Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Receipt Date"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="text" fullWidth defaultValue="2020-21" label="Financial Year" disabled autoComplete="Financial Year" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="select-exemption" select label="Exemption Type"
                  // onChange={this.handleChange('exemption')}
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
                <TextField id="text" fullWidth label="Total Amount" autoComplete="Total Amount" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="select-pay_mode" select label="Transaction Type"
                  // onChange={this.handleChange('pay_mode')}
                  SelectProps={{
                    MenuProps: {
                    },
                  }}
                  helperText="Please select your Transaction Type"
                  fullWidth>
                  {pay_mode.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField id="select-donation_type" select label="Donation Type"
                  // onChange={this.handleChange('donation_type')}
                  SelectProps={{
                    MenuProps: {
                    },
                  }}
                  helperText="Please select your Donation Type"
                  fullWidth>
                  {donation_type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="full-width"
                  label="Realization Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Realization Date"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField id="text" fullWidth label="Transaction Pay Details" helperText="Cheque No / Bank Name / UTR / Any Other Details" autoComplete="Transaction Pay Details" />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField id="text" fullWidth label="Remarks" autoComplete="Remarks" />
              </div>
            </div>

          </div>
          <div className="receiptbuttons">
            <Button className="mr-10 mb-10" color="primary">Submit</Button>
            <Button className="mr-10 mb-10" color="danger">Cancel</Button>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  )
}
