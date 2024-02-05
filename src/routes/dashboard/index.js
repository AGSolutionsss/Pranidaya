import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Badge } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ChartConfig from 'Constants/chart-config';
 import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
 import Card1 from "./cards/card1";
 import Card2 from "./cards/card2";
 import Card3 from "./cards/card3";
 import Card4 from "./cards/card4";
 import Bar from "./bar";
 import {baseURL} from '../../api';
 import NumberFormat from 'react-number-format';
 import dateyear from '.././dateyear';
 import Button from '@material-ui/core/Button';
 import { makeStyles } from '@material-ui/core/styles';
 import {
  OverallTrafficStatusWidget,
   TopHeadlines,
   SupportRequest,
   Visitors,
   Subscribers,
   NewslaterCampaign,
   CommentsWidget,
   SocialFeedsWidget,
   TopAuthors,
   RecentActivity,
   TopNews,
   TwitterFeedsV2,
   Notifications,
   CampaignPerformance,
   SalesDoughnutChart,
 } from "Components/Widgets";
 import { newsVisitorsData, newslaterCampaignData } from "./data";
 import axios from "axios";
 import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
 import Selectdonor from "./selectdonor";
 import { Doughnut } from 'react-chartjs-2'

 export default class NewsDashboard extends Component {
   state = {
     results: [],
     graph1: [],
     graph2: [],
     openModal : false,
     
   };

   onClickButton = e =>{
    e.preventDefault()
    this.setState({openModal : true})
  }

  onCloseModal = ()=>{
    this.setState({openModal : false})
  }

   componentDidMount() {

    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){
      browserHistory.push("/logout");
    }else{
    }
     axios({
       url: baseURL+"/fetch-dashboard-data-by/"+dateyear,
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         let test1 = [];
         let test2 = [];
         for(let i=0; i<res.data.graph1.length; i++){
          test1.push(res.data.graph1[i].receipt_donation_type);
          test2.push(parseInt(res.data.graph1[i].total_amount));
         }
         this.setState({ graph1: test1 });
         this.setState({ graph2: test2 });
       })
       .catch((res) => {
         
         
       });
   }

  

   
 
   render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>Pranidaya</title>
           <meta name="description" content="Pranidaya" />
         </Helmet>
         <div className="row">
         
         <div className="col-xs-6 col-sm-6 col-md-3 w-xs-half-block">
             {this.state.results.length != 0 && (
               <Card2
                 totalCompaniesCount={this.state.results.total_donor_count}
                 cardTitle="Total Donor Count"
               ></Card2>
             )}
           </div>

           <div className="col-sm-6 col-md-3 w-xs-half-block">
             {this.state.results.length != 0 && (
               <Card1
                 individualCompanyCount={this.state.results.total_website_donation}
                 cardTitle="Total Website Donation"
               ></Card1>
             )}
           </div>
           
           <div className="col-sm-6 col-md-3 w-xs-half-block">
             {this.state.results.length != 0 && (
               <Card3
                 otherCompaniesCount={this.state.results.total_material_donation}
                 cardTitle="Total Material Donation"
               ></Card3>
             )}
           </div>
           <div className="col-sm-6 col-md-3 w-xs-half-block">
                 {this.state.results.length != 0 && (

                <Card4                  

                     totalDonation={this.state.results.total_donation}
                                          
                   >
                     

                   </Card4>
                  )}
               </div>
         </div>
         <div className="row">
         <RctCollapsibleCard
						colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-half-block"
						heading={<IntlMessages id="Cash Receipts" />}
						collapsible
						reloadable
						closeable
					>
						<OverallTrafficStatusWidget
							chartData={{
                chartLabels:this.state.graph1,
                chartDatasets: [
                  {
                    backgroundColor: ChartConfig.color.primary,
                    borderColor: ChartConfig.color.primary,
                    borderWidth: 1,
                    hoverBackgroundColor: ChartConfig.color.primary,
                    hoverBorderColor: ChartConfig.color.primary,
                    data: this.state.graph2
                  },
               ],
              }}
						/>
					</RctCollapsibleCard>       
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-half-block"
						heading={<IntlMessages id="Cash Receipts" />}
						collapsible
						reloadable
						closeable
					>
            <Doughnut 
                width={1349}
                height={1349}
                data = {{
                  labels: this.state.graph1,
                  datasets: [{
                    data: this.state.graph2,
                    backgroundColor: ['red', 'green', 'blue','Orange','black']
                  }]
                }} 
            />
          </RctCollapsibleCard>
         
          </div>
       </div>
       
     );
   }
 }
 