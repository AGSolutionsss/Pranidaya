/**
 * Material Text Field
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class TextFields extends React.Component {


  render() {
    return (
      <div className="textfields-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.textField" />} match={this.props.match} />
        <RctCollapsibleCard heading="Chapter">
          <form noValidate autoComplete="off">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Chapter Name" autoComplete="Chapter Name" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Chapter Website" autoComplete="Chapter Website" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Address" autoComplete="Address" />
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
                  <TextField id="number" type="number" fullWidth label="Pincode" autoComplete="Pincode" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="number" type="number" fullWidth label="Phone" autoComplete="Phone" />
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
            </div>
          </form>
        </RctCollapsibleCard>
      </div>
    );
  }
}
