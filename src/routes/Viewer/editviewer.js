/**
 * Material Text Field
 */
 import React, { useEffect, useState } from "react";
 import TextField from "@material-ui/core/TextField";
 import { Link } from "react-router-dom";
 import { Button } from "reactstrap";
 import MenuItem from "@material-ui/core/MenuItem";
 // page title bar
 import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
 import {baseURL} from '../../api';
 // rct card box
 import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
 
 // intl messages
 import IntlMessages from "Util/IntlMessages";
 import axios from "axios";
 import { useHistory, useParams } from "react-router-dom";
 import { SelectionState } from "draft-js";
 import states from "../states";
 import { NotificationContainer, NotificationManager,} from "react-notifications";
 import CircularProgress from '@material-ui/core/CircularProgress';

 const EditViewer = (props) => {
   let history = useHistory();
 
   const [viewerId, setID] = useState(0);
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [userName, setUserName] = useState("");
   const [contact, setContact] = useState("");
   const [email, setEmail] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState(""); 
   const [viewerChapterIds, setViewerChapterIds] = useState([]); 
   const [chapterIds, setChapterIds] = useState('');  
   const[chapter_id,setchapter_id] = useState('');
   const [user_position, setuser_position] = useState([]);
   const [loader, setLoader]= useState(true);
   const [viewer, setViewer] = useState({});
 
   const [chapters, setChapters] = useState([])
   const [currentViewerChapterIds, setCurrentViewerChapterIds] = useState([])
 

   
   const handleClick = (e) => {
 
     var targetName = e.target.name;
 
     //alert(e.target.value+':'+e.target.name);
    // setFirstName(e.target.value);  
    //alert(e.target.value)
    //setViewerChapterIds(viewerChapterIds+','+e.target.name);
    if(e.target.checked==true){
      var temparray = viewerChapterIds;
      temparray.push(e.target.name);
      setViewerChapterIds(temparray);
    }else{
      //alert('sss')
      var temparray = viewerChapterIds;
     // alert(viewerChapterIds.findIndex(targetName))
      temparray.splice(temparray.indexOf(targetName), 1);
      setViewerChapterIds(temparray);
    }
 
    var theChapterIds = '';
    for(var i=0;i<viewerChapterIds.length;i++){
 
     theChapterIds = theChapterIds+','+viewerChapterIds[i]
    }
     
    //alert(theChapterIds)
    setChapterIds(theChapterIds);
 
    };
   
   const onFirstNameChange = (e) => {
     setFirstName(e.target.value);   
   };
 
   const onLastNameChange = (e) => {
     setLastName(e.target.value);   
   };
 
 
   const onUserNameChange = (e) => {
     setUserName(e.target.value);   
   };
   
   const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if(inputtxt.match(phoneno) || inputtxt.length==0){
      return true;
    }else{
      return false;
    }
  }

  const onContactChange = (e) => {
    if(e.target.name=="mobile_number"){
      if(validateOnlyDigits(e.target.value)){
        setContact(e.target.value);
      }
    }else{
      setContact(e.target.value); 
    }
      
  };
 
   const onEmailChange = (e) => {
     setEmail(e.target.value);   
   };
 
   const onStartDateChange = (e) => {
     setStartDate(e.target.value);   
   };
 
   const onEndDateChange = (e) => {
     setEndDate(e.target.value);   
   };
 
   const onuser_positionChange =(e)=>{
     setuser_position(e.target.value);
   };

   const onuser_chapteridChange = (e) =>{
    setchapter_id(e.target.value);
  };
 
   const position = [
     {
       value: "President",
       label: "President",
     },
     {
       value: "Vice President",
       label: "Vice President",
     },
     {
       value: "User",
       label: "User",
     },
     {
       value: "Admin",
       label: "Admin",
     },
   ];
 
   useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
 
     var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken
             }             
       };     
 
 
     fetch(baseURL+'/fetch-chapters', requestOptions)
     .then(response => response.json())
     .then(data => setChapters(data.chapters)); 
   }, []);

   var url = new URL(window.location.href);
  var id = url.searchParams.get("id");


   useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    axios({
      url: baseURL+"/fetch-viewer-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      console.log("editdon", res.data);
      setTheViewer(res.data.users);
      setLoader(false)
    });
  }, []);

  const setTheViewer = (users) => {
         setID(users.id)
         setFirstName(users.first_name);
         setLastName(users.last_name);
         setUserName(users.name);
         setEmail(users.email);
         setContact(users.phone);
         setuser_position(users.user_position)
         setStartDate(users.viewer_start_date);
         setEndDate(users.viewer_end_date);
         setChapterIds(users.viewer_chapter_ids);
         setchapter_id(users.chapter_id);
         var res = users.viewer_chapter_ids.split(","); 

         var tempChapterIds = [];

         for(var i=0;i<res.length;i++){
            tempChapterIds.push(res[i])
         }

         setCurrentViewerChapterIds(tempChapterIds);
    }
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

   const onSubmit = (e) => {
     e.preventDefault();
     let data = {
     id:viewerId,  
     first_name: firstName, 
     last_name: lastName,  
     chapter_id:chapter_id,
     name: userName,
     mobile_number: contact,
     email: email,
     viewer_start_date: startDate,
     viewer_end_date: endDate,
     chapter_ids_comma_separated:chapterIds,
     user_position:user_position
     };
     var v = document.getElementById('EditViewer').checkValidity();
     var v = document.getElementById('EditViewer').reportValidity();
     e.preventDefault();
 
 if(v){
  setIsButtonDisabled(true)
     axios({
       url: baseURL+"/update-viewer",
       method: "POST",
       data,
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     }).then((res) => {
       console.log("edit1", res.data);
       NotificationManager.success("Data Updated Sucessfully");
       setIsButtonDisabled(false)
       history.push('listing');
     });
   }
   
           
   };
 
       
   
 
 
   
 
   return (
     <div className="textfields-wrapper">
       { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
       <PageTitleBar title="Edit Viewer" match={props.match} />
       <RctCollapsibleCard>
                     <form id="EditViewer" noValidate autoComplete="off">
                         <div className="row">
                             <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                     <TextField
                                     fullWidth
                                     label="Full Name"
                                     autoComplete="Full Name"
                                     name="first_name"
                                     required
                                     value={firstName}
                                     onChange={(e) => onFirstNameChange(e)}
                                     />
                                 </div>
                             </div>
 
                             
 
 
                             <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                     <TextField
                                     fullWidth
                                     label="User Name ( Login Name )"
                                     autoComplete="Name"
                                     name="username"
                                     required
                                     value={userName}
                                     onChange={(e) => onUserNameChange(e)}
                                     
                                     />
                                 </div>
                             </div>
                             <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                     <TextField
                                     fullWidth
                                     label="Mobile"
                                     autoComplete="Name"
                                     name="mobile_number"
                                     type="text"
                                     required
                                     inputProps={{ maxLength: 10 }}
                                     value={contact}
                                     onChange={(e) => onContactChange(e)}
                                     />
                                 </div>
                             </div>
                             <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                     <TextField
                                     fullWidth
                                     label="Email"
                                     autoComplete="Name"
                                     name="email"
                                     type="email"
                                     required
                                     value={email}
                                     onChange={(e) => onEmailChange(e)}
                                     />
                                 </div>
                             </div>
                         </div>
                         <div className="row">
                         <div className="col-sm-6 col-md-6 col-xl-3">
                              <div className="form-group">
                              <TextField
                                id="select-corrpreffer"
                                required
                                select
                                label="Chapter"
                                SelectProps={{
                                  MenuProps: {},
                                }}
                                helperText="Please select your Chapter"
                                name="chapter_id"
                                value={chapter_id}
                                onChange={(e) => onuser_chapteridChange(e)}
                                fullWidth
                              >
                              {chapters.map((chapter, key) => (
                                <MenuItem key={chapter.id} value={chapter.id}>
                                  {chapter.chapter_name}
                                </MenuItem>
                              ))}
                            </TextField>
                              </div>
                            </div>
                             
                             <div className="col-sm-6 col-md-6 col-xl-3">
                               <div className="form-group">
                               <TextField
                                    fullWidth
                                    label="Designation"
                                    autoComplete="Name"
                                    name="user_position"
                                    type="text"
                                    required
                                    value={user_position}
                                    onChange={(e) => onuser_positionChange(e)}
                                    />
                               </div>
                             </div>
                             <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                     <TextField
                                     fullWidth
                                     
                                     autoComplete="Name"
                                     name="viewer_start_date"
                                     type="date"
                                     helperText="Please select Start Date"
                                     required
                                     value={startDate}
                                     onChange={(e) => onStartDateChange(e)}
                                     />
                                 </div>
                             </div>
                             <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                     <TextField
                                     fullWidth
                                     
                                     autoComplete="Name"
                                     name="viewer_end_date"
                                     type="date"
                                     helperText="Please select End Date"
                                     required
                                     value={endDate}
                                     onChange={(e) => onEndDateChange(e)}
                                     />
                                 </div>
                             </div>
                         </div>
                         <h3 style={{marginLeft:0}}>Chapters Associated</h3><br/> 
                         <div className="row" style={{flexDirection:'row'}}>                    
 

                        
                      
                       {chapters.map((chapter, key) =>
                         <div style={{flexDirection:'row', width:'20%'}}> 

                        
                           {currentViewerChapterIds.includes(chapter.id+'') == true &&
                            <input type="checkbox" defaultChecked={true} onChange={handleClick} name={chapter.id} id={chapter.id}/>
                           }

                           {currentViewerChapterIds.includes(chapter.id+'') == false &&
                            <input type="checkbox" defaultChecked={false} onChange={handleClick} name={chapter.id} id={chapter.id}/>
                           }

                            <label for={chapter.id} style={{marginLeft:5}}>{chapter.chapter_name}</label>
                         </div>  
                         )}        
                         </div>	
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
                    
                         <Link to="">
                             <Button variant="contained" className="text-white bg-success px-3 btn-xs" >
                                 Cancel
                             </Button>
                         </Link>
                     </form>
                 </RctCollapsibleCard>
                 </>}
     </div>
   );
 };
 
 export default EditViewer;
 