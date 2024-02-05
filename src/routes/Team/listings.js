import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});
  
function TabContainer({ children }) {
    return (
       <Typography component="div" style={{ padding: 8 * 3 }}>
          {children}
       </Typography>
    );
}

const Team = (props) => {
  
   let history = useHistory();
    const [team, setTeam] = useState({
      name: "",
      full_name: "",
      email: "",
      phone: "",
      user_type_id: "3",
    });

    const [teamData, setTeamlistData] = useState([]);
    const [donorName, setDonorName] = useState('');
    const classes = useStyles();
   
    const check_id = localStorage.getItem("user_type_id");

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
 
    useEffect(() => {
       var isLoggedIn = localStorage.getItem("user_type_id");
       

       if(!isLoggedIn){
   
         window.location = "/signin";
         
       }else{
   
       }

       axios({
        url:
        baseURL+"/fetch-team-list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        setTeamlistData(res.data.users);
      });
    },[]);
 
    const onInputChange = (e) => {
        setTeam({
       ...team,
       [e.target.name]: e.target.value,
     });

      if(e.target.name == 'indicomp_fts_id'){

         setDonorName(e.target.value);
      }
   
    };

    const onSubmit = (e) => {
      e.preventDefault();
      let data = {
        name: team.name,
        full_name: team.full_name,
        email: team.email,
        phone: team.phone,
        user_type_id: "3",
      };
      
      var v = document.getElementById('addChap').checkValidity();
      var v = document.getElementById('addChap').reportValidity();
      e.preventDefault();
 
      if(v){
        setIsButtonDisabled(true)
        axios({
          url: baseURL+"/create-team",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          NotificationManager.success("Team is Created Successfully");
          setIsButtonDisabled(false)
          setTeamlistData(res.data.users);
        });
      }
    };

    

    const  deleteData = (value) => {
      axios({
        url: baseURL+"/update-team-status-by-id/"+value,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        
        NotificationManager.success("Status Updated Sucessfully");
        setTeamlistData(res.data.users);
        
      })
    };


  return (
     <div className="textfields-wrapper">
       {(check_id == "2") &&(

       
       <RctCollapsibleCard>
         
         <form id="addChap" autoComplete="off">
           <div className="row">
             <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                 <TextField
                  id="select-corrpreffer"
                  label="Full Name"
                  name="full_name"
                  required
                  value={team.full_name}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
               </div>
             </div>
             <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
               <TextField
                  id="select-corrpreffer"
                  label="Username"
                  required
                  helperText="Enter your Username"
                  name="name"
                  value={team.name}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
             </div>
             <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                 <TextField
                   fullWidth
                   label="Email"
                   type="email"
                   required
                   autoComplete="Name"
                   name="email"
                   value={team.email}
                   onChange={(e) => onInputChange(e)}
                />
               </div>
             </div>
             <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
                 <TextField
                   fullWidth
                   required
                   label="Mobile"
                    autoComplete="Name"
                   name="phone"
                   value={team.phone}
                   onChange={(e) => onInputChange(e)}
                 />
               </div>
             </div>
             
             
             <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
             
 
             <Button
               className="mr-10 mb-10"
               color="primary"
               type="submit"
               style={{ width: "100%" }}
               onClick={(e) => onSubmit(e)}
               disabled={isButtonDisabled}
             >
               Submit
             </Button>
             </div>
             </div>
           </div>
         </form>
       </RctCollapsibleCard>
       )}
       <RctCollapsibleCard>
        <div>
          <h1>Team List</h1>
          <br />

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamData.map((datalist, key) => (
                  <TableRow key={datalist.id}>
                    <TableCell component="th" scope="row">
                    {key + 1}
                    </TableCell>
                    <TableCell>{datalist.full_name}</TableCell>
                    <TableCell>{datalist.email}</TableCell>
                    <TableCell>{datalist.phone}</TableCell>
                    <TableCell>{datalist.user_status}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit" placement="top">
                        <IconButton aria-label="Edit">
                            
                            <a onClick={() => deleteData(datalist.id)} style={{color:'#5d92f4'}}>
                              <EditIcon />
                            </a>
                        </IconButton>
                        </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </RctCollapsibleCard>
      
     </div>
   );
 };
 
 export default Team;
 