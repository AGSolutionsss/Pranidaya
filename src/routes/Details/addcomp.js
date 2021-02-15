/**
 * Material Text Field
 */
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

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

export default class TextFields extends React.Component {

  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    return (
      <div className="textfields-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.textField" />} match={this.props.match} />
        <RctCollapsibleCard heading="Company">
          <form noValidate autoComplete="off">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Company Name" autoComplete="Company Name" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-company_type" select label="Company Type"
                    onChange={this.handleChange('company_type')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select your Company Type"
                    fullWidth>
                    {company_type.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Contact Name" autoComplete="Contact Name" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Contact Designation" autoComplete="Contact Designation" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-gender" select label="Gender"
                    onChange={this.handleChange('gender')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select your gender"
                    fullWidth>
                    {gender.map(option => (
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
                    label="Annual Day"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Annual Day"
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="PAN Number" autoComplete="PAN Number" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField
                    id="full-width"
                    label="Logo"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Logo"
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Remarks" autoComplete="Remarks" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Promoter" autoComplete="Promoter" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-belongs_to" select label="Belongs To"
                    onChange={this.handleChange('belongs_to')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select your Belongs To"
                    fullWidth>
                    {belongs_to.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-source" select label="Source"
                    onChange={this.handleChange('source')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select your Source"
                    fullWidth>
                    {source.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-donor_type" select label="Donor Type"
                    onChange={this.handleChange('donor_type')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select your Donor Type"
                    fullWidth>
                    {donor_type.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-csr" select label="CSR"
                    onChange={this.handleChange('csr')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select CSR"
                    fullWidth>
                    {csr.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="number" type="number" fullWidth label="Mobile" autoComplete="Mobile" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="number" type="number" fullWidth label="Whats App" autoComplete="Whats App" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="email" type="email" fullWidth label="Email" autoComplete="Email" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Website" autoComplete="Website" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="House & Street Number" autoComplete="House & Street Number" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Area" autoComplete="Area" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Landmark" autoComplete="Landmark" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="City" autoComplete="City" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="State" autoComplete="State" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" type="number" fullWidth label="Pin Code" autoComplete="Pin Code" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Office & Street Number" autoComplete="Office & Street Number" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Area" autoComplete="Area" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="Landmark" autoComplete="Landmark" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="City" autoComplete="City" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" fullWidth label="State" autoComplete="State" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="text" type="number"  fullWidth label="Pin Code" autoComplete="Pin Code" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="select-corr_preffer" select label="Corr Preffer"
                    onChange={this.handleChange('corr_preffer')}
                    SelectProps={{
                      MenuProps: {
                      },
                    }}
                    helperText="Please select your Corr Preffer"
                    fullWidth>
                    {corr_preffer.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </div>
          </form>
        </RctCollapsibleCard>
      </div>
    );
  }
}
