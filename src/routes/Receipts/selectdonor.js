import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import {  NotificationManager } from "react-notifications";
import {baseURL} from '../../api';
import "./index.css";
import { useHistory } from "react-router-dom";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";

const Add = (props) =>  {
    let history = useHistory();
    const [donor, setDonor] = useState({
      donor_email: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
        
      });

      const onInputChange = (e) => {
        setDonor({
            ...donor,
            [e.target.name]: e.target.value,
          });
        };

        const onSubmit = (e) => {
            e.preventDefault();
            let data = {
              donor_email: donor.donor_email,
            };
        
            var url = new URL(window.location.href);
            var id = url.searchParams.get("id");
        
            if (id) {
              data.donor_related_id = id;
            }
        
            var v = document.getElementById("addComp").checkValidity();
            var v = document.getElementById("addComp").reportValidity();
            
            e.preventDefault();
        
            if (v) {
              setIsButtonDisabled(true)
              axios({
                url: baseURL+"/update-donor-email/"+localStorage.getItem("ftsid"),
                method: "PUT",
                data,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                if(res.data.code == '201'){
                  NotificationManager.success("Email Id Updated Sucessfully");
                  history.push("listing");
                }else{
                  NotificationManager.error("Duplicate Entry of Email Id");
                }
                  
              });
            }
          };
  
    return (
        <div className="textfields-wrapper">
            <RctCollapsibleCard fullBlock style={{height:'110px'}}>
                <form id="addComp" autoComplete="off">
                    <div class="row">
                        <div className="col-sm-12 col-md-12 col-xl-12" style={{paddingLeft:'30px',paddingRight:'30px'}}>
                            <div className="form-group">
                                <TextField
                                fullWidth
                                label="Email"
                                autoComplete="Name"
                                type="email"
                                required
                                name="donor_email"
                                value={donor.donor_email}
                                onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                    <div className="col-sm-12 col-md-12 col-xl-12" style={{justifyContent:'center',display:'flex',paddingTop:'30px',paddingBottom:'30px'}}>
                        <Button
                        type="submit"
                        
                        color="primary"
                        onClick={(e) => onSubmit(e) }
                        disabled={isButtonDisabled}
                        >
                        Update
                        </Button>
            
                    </div>
                    </div>
                </form>
            </RctCollapsibleCard>
      </div>
    );
  

};

export default Add;