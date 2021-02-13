/**
 * Material Text Field
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap';
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
        <RctCollapsibleCard heading="User">
          <form noValidate autoComplete="off">
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth label="Person Name" autoComplete="Person Name" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth type="text" label="User Name ( Login Name ) " autoComplete="User Name ( Login Name ) " />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                <TextField id="text" fullWidth type="text" label="User Type" autoComplete="User Type" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="number" type="number" fullWidth label="Mobile" autoComplete="Mobile" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="number" type="email" fullWidth label="Email" autoComplete="Email" />
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <TextField id="number" type="file" fullWidth label="Image" autoComplete="Image" />
                </div>
              </div>
            </div>
            <Button className="mr-10 mb-10" color="primary">Submit</Button>
            <Button className="mr-10 mb-10" color="danger">Cancel</Button>
          </form>
        </RctCollapsibleCard>
      </div>
    );
  }
}
