import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Button } from "reactstrap";

export default function View() {
  const [user, setUser] = useState([]);
  const [loader, setLoader]= useState(true);

  useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-chapter-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      // console.log("view",res.data)
      setUser(res.data.chapter);
      setLoader(false)
      console.log("view", res.data.chapter);
    });
  }, []);

  const hr = {
    marginTop: "0rem"
  };

  const label1 = {
    fontSize: "0.875rem",
    fontWeight: "400"
  };

  const label2 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif"
  };

  const butn = {
    float: "right"
  };

  return (
    <div>
    { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
          <RctCollapsibleCard>
            <h1>Chapter Details</h1><hr style={hr} />
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Chapter Name</p> <p style={label2}>{user.chapter_name}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Region Code</p> <p style={label2}>{user.chapter_region_code}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Date Of Incorporation</p> <p style={label2}>{user.chapter_date_of_incorporation}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Phone</p> <p style={label2}>{user.chapter_phone}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6 col-xl-6">
                <div className="form-group">
                  <p style={label1}>Address</p> <p style={label2}>{user.chapter_address}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>City</p> <p style={label2}>{user.chapter_city}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>PIN</p> <p style={label2}>{user. chapter_pin}</p>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>State</p> <p style={label2}>{user.chapter_state}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Email</p> <p style={label2}>{user.chapter_email}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>Website</p> <p style={label2}>{user.chapter_website}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                  <p style={label1}>What's App</p> <p style={label2}>{user.chapter_whatsapp}</p>
                </div>
              </div>
            </div>
          </RctCollapsibleCard>
        </div>
      </div>
     </>}
     <div className="row">
        <div className="textfields-wrapper col-sm-12 col-md-12 col-lg-12">
          <RctCollapsibleCard>
          <h1>User Details
          <div className="d-flex" style={{float: 'right'}}>
							<div>
								<a href="#" onClick={(e) => this.opnAddNewUserModal(e)} color="primary" className="caret btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
							</div>
						</div>
            
            </h1><hr style={hr} />
          
          <table className="donortable">
            <tr>
              <th><p>Name</p></th>
              <th><p>User Type</p></th>
              <th><p>Image</p></th>
              <th><p>Mobile</p></th>
              <th><p>Email</p></th>
              <th><p>Action</p></th>
            </tr>
          </table>
          </RctCollapsibleCard>
        </div>
      </div>
    </div>
  );
}
