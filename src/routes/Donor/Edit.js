/**
 * Material Text Field
 */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { SelectionState } from "draft-js";

const Edit = (props) => {
  let history = useHistory();
  const [donor, setDonor] = useState({
    indicomp_full_name: "",
    title: "",
    indicomp_type: "",
    indicomp_com_contact_name: "",
    indicomp_com_contact_designation: "",
    indicomp_father_name: "",
    indicomp_mother_name: "",
    indicomp_gender: "",
    indicomp_spouse_name: "",
    indicomp_remarks: "",
    indicomp_promoter: "",
    indicomp_source: "",
    indicomp_mobile_phone: "",
    indicomp_mobile_whatsapp: "",
    indicomp_email: "",
    indicomp_website: "",
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");

  // const { personName, userName, mobile, email } = user;
  const onInputChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-donor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      console.log("editdon",res.data)
      setDonor(res.data.individualCompany);
    });
  }, []);

  const onSubmit = () => {
    let data = {
      indicomp_full_name: donor.indicomp_full_name,
      title: donor.title,
      indicomp_type: donor.indicomp_type,
      indicomp_com_contact_name: donor.indicomp_com_contact_name,
      indicomp_com_contact_designation: donor.indicomp_com_contact_designation,
      indicomp_father_name: donor.indicomp_father_name,
      indicomp_mother_name: donor.indicomp_mother_name,
      indicomp_gender: donor.indicomp_gender,
      indicomp_spouse_name: donor.indicomp_spouse_name,
      indicomp_remarks: donor.indicomp_remarks,
      indicomp_promoter: donor.indicomp_promoter,
      indicomp_source: donor.indicomp_source,
      indicomp_mobile_phone: donor.indicomp_mobile_phone,
      indicomp_mobile_whatsapp: donor.indicomp_mobile_whatsapp,
      indicomp_email: donor.indicomp_email,
      indicomp_website: donor.indicomp_website,
    };
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/update-donor/" + id,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      console.log("editdonor", res.data);
      //alert("success");
      history.push('listing');
    });
  };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Update Donor" match={props.match} />
      <RctCollapsibleCard>
        <form noValidate autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Full Name"
                  autoComplete="Name"
                  name="indicomp_full_name"
                  value={donor.indicomp_full_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Title"
                  autoComplete="Name"
                  name="title"
                  value={donor.title}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Type"
                  autoComplete="Name"
                  name="indicomp_type"
                  value={donor.indicomp_type}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="City"
                  autoComplete="Name"
                  name="indicomp_city"
                  value={donor.indicomp_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Contact Name"
                  autoComplete="Name"
                  name="indicomp_contact_name"
                  value={donor.contact_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Contact Designation"
                  autoComplete="Name"
                  name="indicomp_contact_designation"
                  value={donor.contact_designation}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Father Name"
                  autoComplete="Name"
                  name="indicomp_father_name"
                  value={donor.indicomp_father_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mother Name"
                  autoComplete="Name"
                  name="indicomp_mother_name"
                  value={donor.indicomp_mother_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Gender"
                  autoComplete="Name"
                  name="indicomp_gender"
                  value={donor.indicomp_gender}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Spouse Name"
                  autoComplete="Name"
                  name="indicomp_spouse_name"
                  value={donor.indicomp_spouse_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="indicomp_remarks"
                  value={donor.indicomp_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Promoter"
                  autoComplete="Name"
                  name="indicomp_promoter"
                  value={donor.indicomp_promoter}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Source"
                  autoComplete="Name"
                  name="indicomp_source"
                  value={donor.indicomp_source}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile Phone"
                  autoComplete="Name"
                  name="indicomp_mobile_phone"
                  value={donor.indicomp_mobile_phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Whatsapp"
                  autoComplete="Name"
                  name="indicomp_mobile_whatsapp"
                  value={donor.indicomp_mobile_whatsapp}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  autoComplete="Name"
                  name="indicomp_email"
                  value={donor.indicomp_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Website"
                  autoComplete="Name"
                  name="indicomp_website"
                  value={donor.indicomp_website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <Button
              className="mr-10 mb-10"
              color="primary"
              style={{ width: "100%" }}
              onClick={() => onSubmit()}
            >
              Submit
            </Button>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Edit;
