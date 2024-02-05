import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Moment from 'moment';
import {baseURL} from '../../api';

export default function View() {
  const [school, setSchool] = useState({
        id: "",
        chapter_id: "",
        msid_District: "",
        msid_school_code: "",
        msid_school_name: "",
        msid_acharya_name: "",
        msid_School_Id: "",
        msid_Village: "",
        msid_Teacher: "",
        msid_teacher_sex: "",
        msid_Boys: "",
        msid_Girls: "",
        msid_total: "",
        msid_date_of_opening_old: "",
        msid_date_of_opening: "",
        msid_population: "",
        msid_Literacy_Rate_Male: "",
        msid_Literacy_Rate_Female: "",
        msid_Vidyalaya_Samity_Pramukh: "",
        msid_Nearest_Railway_Station: "",
        msid_Distance_Of_Vidyalaya_From_Cluster: "",
        msid_Distance_Cluster_From_Rly_Station: "",
        msid_VCF_Name: "",
        msid_VCF_Phone: "",
        msid_SCF_Name: "",
        msid_SCF_Email: "",
        msid_SCF_Phone: "",
        msid_fund: "",
        msid_Date_Of_Updation: "",
        msid_update: "",
        msid_school_reopen_date: "",
        msid_school_close_date: "",
        msid_status: "",
        msid_school_close_reason: "",
        msid_csr: "",
  
  });

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: baseURL+"/fetch-schools-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      // console.log("view",res.data)
      setSchool(res.data.schools);
      setLoader(false)
      console.log("view", res.data.schools);
    });
  }, []);


  const hr = {
    marginTop: "0rem",
  };

  const label1 = {
    fontSize: "0.875rem",
    fontWeight: "400",
  };

  const label2 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
    color: "#3e7dc4",
  };

  const label3 = {
    fontSize: "0.875rem",
    fontWeight: "400",
    paddingLeft: "10px",
  };

  const label4 = {
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "-10px",
    paddingLeft: "10px",
    fontFamily: "Roboto,Helvetica,Arial,Heebo,sans-serif",
    color: "#3e7dc4",
  };

  const color ={
    color: "#3e7dc4",
  };

  return (
    <div>
      {loader && (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      )}
      {!loader && (
        <>
          
            <div>
              <PageTitleBar title="School Details" />

              <div className="row">
                <div className="textfields-wrapper col-sm-12 col-md-8 col-lg-8">
                  <RctCollapsibleCard>
                    <div className="flexbox">
                      <h1 style={color}>{school.msid_fund}</h1>
                      <h3 style={color}>{school.msid_Village} - {school.msid_District}</h3>
                    </div>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-xl-6">
                        <div className="form-group">
                          <p style={label3}>School</p>
                          <p style={label4}>
                          {school.msid_school_name} - ( {school.msid_school_code} )
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-xl-6">
                        <div className="form-group">
                          <p style={label3}>Opening Date</p>
                            <p style={label4}>
                            {Moment(school.msid_date_of_opening).format('DD-MM-YYYY')}
                            
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-md-6 col-xl-6">
                          <div className="form-group">
                            <p style={label3}>Teacher Name</p>
                            <p style={label4}>{school.msid_Teacher} - ({school.msid_teacher_sex})</p>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-xl-6">
                          <div className="form-group">
                              <p style={label3}>Total - Boys/Girls</p>
                              <p style={label4}>
                              {school.msid_total} - ( {school.msid_Boys} / {school.msid_Girls})
                              </p>
                            </div>
                          </div>
                      </div>
                      <h1>Village</h1>
                      <hr style={hr} />
                      <div className="row">
                          <div className="col-sm-6 col-md-6 col-xl-4">
                            <div className="form-group">
                              <p style={label3}>Total Population</p>
                              <p style={label4}>{school.msid_population}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-4">
                            <div className="form-group">
                              <p style={label3}>Male Literacy</p>
                              <p style={label4}>{school.msid_Literacy_Rate_Male}</p>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-6 col-xl-4">
                            <div className="form-group">
                              <p style={label3}>Female Literacy</p>
                              <p style={label4}>{school.msid_Literacy_Rate_Female}</p>
                            </div>
                          </div>
                        </div>
                  </RctCollapsibleCard>
                </div>
                <div className="textfields-wrapper col-sm-12 col-md-4 col-lg-4">

                  <RctCollapsibleCard>
                    <div className="flexbox">
                      <h3>Contact Info</h3>
                      
                    </div>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-xl-12">
                        <div className="form-group">
                          <p style={label4}>Samiti Pramukh - {school.msid_Vidyalaya_Samity_Pramukh}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-xl-12">
                        <div className="form-group">
                        <p style={label4}>VCF - {school.msid_VCF_Name} - ( {school.msid_VCF_Phone} )
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12">
                          <div className="form-group">
                          <p style={label4}>SCF - {school.msid_SCF_Name} - ( {school.msid_SCF_Phone} )
                            </p>
                          </div>
                        </div>
                        
                      </div>
                      
                  </RctCollapsibleCard>

                  <RctCollapsibleCard>
                    <div className="flexbox">
                      <h3>Adoption Details</h3>
                      
                    </div>
                    <hr style={hr} />
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-xl-12">
                        <div className="form-group">
                          <p style={label4}>comming soon.. </p>
                        </div>
                      </div>
                      
                        
                      </div>
                      
                  </RctCollapsibleCard>


                </div>
              </div>
            </div>
          
        </>
      )}
      
      
    </div>
  );
}
