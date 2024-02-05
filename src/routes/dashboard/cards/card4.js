import React from "react";
import CountUp from "react-countup";
import IntlMessages from "Util/IntlMessages";
import { RctCardContent } from "Components/RctCard";
import NumberFormat from 'react-number-format';

const TotalOrderStats = (props) => (
  <div className="current-widget bg-primary">
    <RctCardContent>
      <div className="d-flex justify-content-between">
        <div className="align-items-start">
          <h3 className="cardHead">Total Cash Donation</h3>
          <h2 className="mb-0">
            <NumberFormat 
                   thousandSeparator={true} 
                   displayType={'text'}
                   thousandsGroupStyle="lakh"
                   prefix={'₹ '} 
                   value={props.totalDonation}
                   
                   />


          </h2>
        </div>
        <div className="align-items-end">
          <i className="zmdi zmdi-time"></i>
        </div>
      </div>
    </RctCardContent>
  </div>
);

export default TotalOrderStats;
