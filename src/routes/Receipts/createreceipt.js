import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';





// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
  const honorific = [
    {
      value: 'Shri',
      label: 'Shri',
    },
    {
      value: 'Smt.',
      label: 'Smt.',
    },
    {
      value: 'Kum',
      label: 'Kum',
    },
    {
      value: 'Dr.',
      label: 'Dr.',
    },
  ];
  
  const gender = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
  ];
  
  const corr_preffer = [
    {
      value: 'Registered',
      label: 'Registered',
    },
    {
      value: 'Branch Office',
      label: 'Branch Office',
    },
    {
      value: 'Digital',
      label: 'Digital',
    },
  ];
  
  const donor_type = [
    {
      value: 'Member',
      lablel: 'Member',
    },
    {
      value: 'Donor',
      label: 'Donor',
    },
    {
      value: 'Member+Donor',
      label: 'Member+Donor',
    },
    {
      value: 'None',
      label: 'None',
    },
  ];
  
  const source = [
    {
      value: 'Ekal Run',
      label: 'Ekal Run',
    },
    {
      value: 'Sakranti',
      label: 'Sakranti',
    },
  ];
  
  const belongs_to = [
  {
    value: 'Chapter',
    label: 'Chapter',
  },
  {
    value: 'Mahila',
    label: 'Mahila',
  },
  {
    value: 'Yuva',
    label: 'Yuva',
  },
  ];
  
  const company_type = [
    {
      value: 'Private',
      label: 'Private',
    },
    {
      value: 'Public',
      label: 'Public',
    },
    {
      value: 'Public',
      label: 'Public',
    },
    {
      value: 'Trust',
      label: 'Trust',
    },
    {
      value: 'Society',
      label: 'Society',
    },
    {
      value: 'Others',
      label: 'Others',
    },
  ];
  
  const csr = [
    {
      value: '0',
      label: 'No',
    },
    {
      value: '1',
      label: 'Yes',
    },
  ];
  
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
    {
      value: 'Others',
      label: 'Others',
    },
  ];
  
export default function Createreceipt() {
    return (
        <div>
             <RctCollapsibleCard heading="Receipt">
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
                  <TextField id="number" type="number" fullWidth label="Total Amount" autoComplete="Total Amount" />
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
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Transaction Pay Details" helperText="Cheque No / Bank Name / UTR / Any Other Details" autoComplete="Transaction Pay Details" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Remarks" autoComplete="Remarks" />
                </div>
              </div>
            </div>
          </form>
        </RctCollapsibleCard>
        </div>
    )
}
