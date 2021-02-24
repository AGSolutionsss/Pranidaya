/**
 * News Dashboard
 */

import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import Card1 from '../cards/card1';
import Card2 from '../cards/card2';
import Card3 from '../cards/card3';
import Card4 from '../cards/card4';



//Widgets
import {
	//TrendingNews,
	TopHeadlines,
	Visitors,
	Subscribers,
	NewslaterCampaign,
	CommentsWidget,
	SocialFeedsWidget,
	TopAuthors,
	RecentActivity,
	TopNews,
	TwitterFeedsV2,
	Notifications
} from "Components/Widgets";

// widgets data
import {
	newsVisitorsData,
	newslaterCampaignData
} from './data';

export default class NewsDashboard extends Component {
	render() {
		return (
			<div className="news-dashboard-wrapper">
				<Helmet>
					<title>FTS | Dashboard</title>
					<meta name="description" content="FTS Dashboard" />
				</Helmet>
				<div className="row">
					<div className="col-sm-6 col-md-4 w-xs-half-block">
						<Card1 ></Card1>
					</div>
					<div className="col-sm-6 col-md-4 w-xs-half-block">
						<Card2></Card2>
					</div>
					<div className="col-sm-6 col-md-4 w-xs-half-block">
						<Card3></Card3>
					</div>
				</div>
				{/* <TrendingNews /> */}
				<div className="row">
					<RctCollapsibleCard
						heading="Notices"
						colClasses="col-sm-12 col-md-12 col-lg-8"
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<TopHeadlines />
					</RctCollapsibleCard>
					<div className="col-sm-12 col-md-12 col-lg-4">
						<div className="row">
							<div className="col-sm-6 col-md-6 col-lg-12">
								<Card4 ></Card4>
							</div>

							<div className="col-sm-6 col-md-6 col-lg-12">
								<Card2 ></Card2>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-12">
								<Card3 ></Card3>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-12">
								<Card1 ></Card1>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-12">
								<Card2 ></Card2>
							</div>
						</div>
					</div>
				</div>
			
			</div>
		)
	}
}
