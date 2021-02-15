import React from 'react'

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
                    onChange={this.handleChange('exemption')}
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
                    onChange={this.handleChange('exemption')}
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
                    onChange={this.handleChange('pay_mode')}
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
                    onChange={this.handleChange('donation_type')}
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
