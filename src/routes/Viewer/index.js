import React from 'react';
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { getAppLayout } from "../../helpers/helpers";

// intl messages
import IntlMessages from 'Util/IntlMessages';
import axios from "axios";
import { Helmet } from "react-helmet";
import Modal from 'react-modal';


const option = {
	filterType: "textField",
	selectableRows: false,
  };
export default class NewListViewer extends React.Component {
	state={
		usertype:'',
		loader:true,
		user:[],
		receiptData:[],
		chapters:[],
		modalIsOpen:false,
		customStyles:  {content : {
             top: '45%',
             position:'absolute',
             left: '55%',
             width:'50%',
             height:'60%',
             right: 'auto',
             bottom: 'auto',
             zIndex:200,
             marginRight: '-50%',
             transform: 'translate(-50%, -50%)'
         }  } ,
		columnData:[
			"#",
			"Username",
			"First Name", 
			"Last Name", 
			"Email", 
			"Phone",
			"Chapters IDs",
			"Start Date",
			"End Date",
			{
				name: "Actions",
				options: {
				  filter: true,
				  customBodyRender: (value) => {
					return (	
					  <div>
					  <Helmet>
                        <title>FTS | Viewers</title>
                        <meta name="description" content="FTS Receipts" />
		              </Helmet>
						<Tooltip title="View" placement="top">
						  <IconButton aria-label="View">
						     <Link to={`/${getAppLayout(location)}/ecommerce/invoice?id=${value}`} >
							<VisibilityIcon />
							  </Link> 
						  </IconButton>
						</Tooltip>
						<Tooltip title="Edit" placement="top">
						<IconButton aria-label="Edit">
						<Link style={{display:this.state.usertype ==1?"none":""}} to={"editviewer?id=" + value}>
						  <EditIcon/>
						  </Link>
						</IconButton>
					  </Tooltip>
					  </div>
					);
				 },
			   },
		   }
		]
	}
	
	
	
	
	constructor(props) {
       super(props);  
       
       this.showAddViewerModal = this.showAddViewerModal.bind(this);
       this.closeModal = this.closeModal.bind(this);
       this.setChapters = this.setChapters.bind(this);      
       
   }
   
   showAddViewerModal(){
      this.setState({ modalIsOpen: true })      
	}
	
	closeModal(){   	

       this.setState({ modalIsOpen: false })          
   }

	getData=()=>{
		let result=[]
		axios({
			url:"https://ftschamp.trikaradev.xyz/api/superadmin-get-all-viewers",
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("login")}`, //access_token=login
			},
		}).then((res) => {
			//console.log("recept",res.data)
			let response = res.data.viewerUsers;
			//console.log("recept2",res.data.receipts)
			let tempRows = [];
			for(let i = 0; i < response.length; i++){
				tempRows.push([
					i + 1,
					response[i]["name"],
					response[i]["first_name"],
					response[i]["last_name"],
					response[i]["email"],
					response[i]["phone"],
					response[i]["viewer_chapter_ids"],
					response[i]["viewer_start_date"],
					response[i]["viewer_end_date"],
					response[i]["id"],
				]);
			}
			this.setState({ receiptData: tempRows, loader: false })
		}).catch((res) => {
			this.setState({ loader: false });
		  })
	}

	componentDidMount () {
		this.setState({usertype:localStorage.getItem("id")})
		this.getData();
		
		
		var theLoginToken = localStorage.getItem('login');       
        
      const requestOptions = {
            method: 'GET', 
            headers: {
               'Authorization': 'Bearer '+theLoginToken
            }         
            
      };     

        
       
  	     
  	   fetch('https://ftschamp.trikaradev.xyz/api/fetch-chapters', requestOptions)
         .then(response => response.json())
         .then(data => this.setChapters(data));      
	}


   setChapters(data){
   	
   	this.setState({chapters: data.chapters});
   }

	render() {
		console.log("printR",this.props.match)
		
		console.log(this.state.usertype)

		const {loader}=this.state
		return (
			<div className="data-table-wrapper">
			{loader && 
              <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px",marginBottom:"300px"}} />}
			  {!loader &&  
                <>
				
				<Button variant="contained" onClick={this.showAddViewerModal} className="text-white bg-success px-3 btn-xs" style={{marginBottom:30}}>
                   Add a New Viewer</Button>
				
				
				{/* <div className="alert alert-info">
					<p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
				</div> */}
				<RctCollapsibleCard  fullBlock>
					{this.state.receiptData.length > 0 && <MUIDataTable
						title={"Viewers List"}
						data={ this.state.receiptData }
						columns={ this.state.columnData }
						options={ option }
					/>}
				</RctCollapsibleCard>
				</>}
				
				<Modal
                 isOpen={this.state.modalIsOpen}
                 onRequestClose={this.closeModal}
                 style={this.state.customStyles}
                 contentLabel="Example Modal"
            >
 
               <h2>Adding a New Viewer</h2>



					    <div class="row">
					        <div class="col-md-4">
					            <div class="form-group">
						            <label>Person Name 
						                <span class="danger">*</span>
						            </label>
						            <input type="text" name="user_name" className="form-control cap" placeholder="User Name" required/>
						        </div>
					        </div>
					        <div class="col-md-4">
					            <div class="form-group">
						            <label>User Name ( Login Name )
						                <span class="danger">*</span>
						            </label>
						            <input type="text" name="user_username" className="form-control cap login-name" placeholder="User Login Name"/>
                                    <label class="error" style={{display: 'none',color:'red'}}></label>
						        </div>
					        </div>
					        
					        <div class="col-md-4">
		                        <div class="form-group">
		                            <label>
		                                  Mobile		                                
		                            </label>
		                            <input type="text" className="form-control" 
		                                   name="user_contact" placeholder="Mobile"/>
		                            <span id="lblError_phone" style={{color: 'red'}}></span>
		                        </div>
		                    </div>
					        
					    </div>
					    <div class="row">
		                    
		                    
		                    <div class="col-md-4">
		                        <div class="form-group">
		                            <label>
		                                Email
		                                <span class="danger">*</span>
		                            </label>
		                            <input type="email" className="form-control" name="user_email" placeholder="Email"/>
		                        </div>
		                    </div>
		                    
		                    
		                    <div class="col-md-4">
		                        <div class="form-group">
		                            <label>
		                                Viewer Start Date
		                                <span class="danger">*</span>
		                            </label>
		                            <input type="date" className="form-control" 
		                            name="viewer_start_date" placeholder="Viewer Start Date"/>
		                        </div>
		                    </div>
		                    
		                    
		                    <div class="col-md-4">
		                        <div class="form-group">
		                            <label>
		                                Viewer End Date
		                                <span class="danger">*</span>
		                            </label>
		                            <input type="date" 
		                                   class="form-control" 
		                                   name="viewer_end_date" placeholder="Viewer End Date"/>
		                        </div>
		                    </div>
		                    
		                    
		                </div>
		                
		               <hr/> 
		               <h3 style={{marginLeft:0}}>Chapters Associated</h3><br/> 
                     <div className="row" style={{flexDirection:'row'}}>                    

                     
                      {this.state.chapters.map((chapter, key) =>
                        <div style={{flexDirection:'row', width:'30%'}}>                      
                           <input type="checkbox" name={chapter.id} id={chapter.id}/>
                           <label for={chapter.id} style={{marginLeft:5}}>{chapter.chapter_name}</label>

                        </div>    
                      )}        

                        

                        
                     
                     </div>		                
		                
		                <hr/> 
		                
		                
				
                  <Button variant="contained" onClick={this.addTheViewer} className="text-white bg-success px-3 btn-xs" style={{marginLeft:10, marginBottom:10}}>
                     Submit
                  </Button>
                   
                  <Button variant="contained" onClick={this.closeModal} className="text-white bg-success px-3 btn-xs" style={{marginLeft:10, marginBottom:10}}>
                     Cancel</Button>

         </Modal>
				
			</div>
			
			
			
		);
	}
}