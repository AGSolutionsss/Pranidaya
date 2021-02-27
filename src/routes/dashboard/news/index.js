/**
 * News Dashboard
 */

import React, { Component } from "react";
import { Helmet } from "react-helmet";
// rct collapsible card
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import Card1 from "../cards/card1";
import Card2 from "../cards/card2";
import Card3 from "../cards/card3";
import Card4 from "../cards/card4";
import Card5 from "../cards/card5";
import Card6 from "../cards/card6";
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
  Notifications,
} from "Components/Widgets";

// widgets data
import { newsVisitorsData, newslaterCampaignData } from "./data";
import axios from "axios";

export default class NewsDashboard extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-dashboard-data",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        this.setState({ results: res.data });
        console.log(res.data);
      })
      .catch((res) => {
        alert("Something Went Wrong!");
      });
  }

  render() {
    return (
      <div className="news-dashboard-wrapper">
        <Helmet>
          <title>FTS | Dashboard</title>
          <meta name="description" content="FTS Dashboard" />
        </Helmet>
        <div className="row">
          <div className="col-sm-6 col-md-4 w-xs-half-block">
            {this.state.results.length != 0 && (
              <Card1
                individualCompanyCount={
                  this.state.results.individual_company_count
                }
                cardTitle="Individual Company Count"
              ></Card1>
            )}
          </div>
          <div className="col-sm-6 col-md-4 w-xs-half-block">
            {this.state.results.length != 0 && (
              <Card2
                totalCompaniesCount={this.state.results.total_companies_count}
                cardTitle="Total Companies Count"
              ></Card2>
            )}
          </div>
          <div className="col-sm-6 col-md-4 w-xs-half-block">
            {this.state.results.length != 0 && (
              <Card3
                otherCompaniesCount={this.state.results.other_companies_count}
                cardTitle="Other Companies Count"
              ></Card3>
            )}
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
                {this.state.results.length != 0 && (
                  <Card4
                    totalDonation={this.state.results.total_donation}
                  ></Card4>
                )}
              </div>

              <div className="col-sm-6 col-md-6 col-lg-12">
                {this.state.results.length != 0 && (
                  <Card5
                    totalMembershipDonation={
                      this.state.results.total_membership_donation
                    }
                  ></Card5>
                )}
              </div>
              <div className="col-sm-6 col-md-6 col-lg-12">
                {this.state.results.length != 0 && (
                  <Card6
                    totalOtsDonation={this.state.results.total_ots_donation}
                  ></Card6>
                )}
              </div>
              {/* <div className="col-sm-6 col-md-6 col-lg-12">
                <Card3></Card3>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-12">
                <Card1></Card1>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-12">
                <Card2></Card2>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
