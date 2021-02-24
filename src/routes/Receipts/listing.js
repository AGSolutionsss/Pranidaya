import React from 'react';
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

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
import "./index.css"


const option = {
	filterType: "textField",
	selectableRows: false,
  };
export default class NewListReceipts extends React.Component {
	state={
		usertype:'',
		loader:true,
		user:[],
		receiptData:[],
		columnData:[
			"SlNo",
			"Receipt No",
			"Name", 
			"Date", 
			"Exemption Type", 
			"Amount",
			{
				name: "Actions",
				options: {
				  filter: true,
				  customBodyRender: (value) => {
					return (	
					  <div>
					  <Helmet>
                        <title>FTS | Receipts</title>
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
						<Link style={{display:this.state.usertype ==1?"none":""}} to={"editreceipt?id=" + value}>
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

	getData=()=>{
		let result=[]
		axios({
			url:"https://ftschamp.trikaradev.xyz/api/fetch-receipts",
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("login")}`, //access_token=login
			},
		}).then((res) => {
			//console.log("recept",res.data)
			let response = res.data.receipts;
			console.log("recept2",res.data.receipts)
			let tempRows = [];
			for(let i = 0; i < response.length; i++){
				tempRows.push([
					i + 1,
					response[i]["receipt_no"],
					// response[i]["receipt_created_by"],
					response[i]["individual_company"]["indicomp_full_name"],

					response[i]["receipt_date"],
					response[i]["receipt_exemption_type"],
					response[i]["receipt_total_amount"],
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
	}


	render() {
		console.log("printR",this.props.match)
		
		console.log(this.state.usertype)
		console.log(this.state.receiptData)

		const {loader}=this.state
		return (
			<div className="data-table-wrapper">
			{loader && 
              <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px",marginBottom:"300px"}} />}
			  {!loader &&  
                <>
				<PageTitleBar title={<IntlMessages id="sidebar.dataTable" />} match={this.props.match} />
				{/* <div className="alert alert-info">
					<p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
				</div> */}
				<RctCollapsibleCard  fullBlock>
					{this.state.receiptData.length > 0 && <MUIDataTable
						title={"Receipts List"}
						data={ this.state.receiptData }
						columns={ this.state.columnData }
						options={ option }
					/>}
				</RctCollapsibleCard>
				</>}
			</div>
		);
	}
}