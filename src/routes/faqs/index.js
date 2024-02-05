import React from "react";
import MUIDataTable from "mui-datatables";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import SearchIdeas from './components/SearchIdeas';
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// rct card box
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

// intl messages
import IntlMessages from "Util/IntlMessages";
import axios from "axios";

const option = {
  filterType: "textField",
  selectableRows: false,
};
const classes = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "70ch",
    },
    backdrop: {
      zIndex: "100",
      color: "#fff",
    },
  },
});

export default class NewListChapter extends React.Component {
  state = {
    loader: true,
    users: [],
    faqsData: [],
    columnData: [
      "#",
      "header",
      "Text",
    ],
  };
	getData = () => {
    axios({
      url: baseURL+"/fetch-faqs",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        console.log("rest", res.data);
		let theFAQs = res.data.faqs;
        let tempRows = [];
        for (let i = 0; i < theFAQs.length; i++) {

			tempRows.push(theFAQs[i]);
        }

        this.setState({ faqsData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };

  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    this.getData();
  }

  render() {
    const { loader } = this.state;
    return (
    	<div className="faq-page-wrapper">
			<Helmet>
				<title>FTS | Faqs</title>
				<meta name="description" content="Reactify Faqs Page" />
			</Helmet>
			{this.state.faqsData.map((faq, key) =>
				<Accordion className="mb-30 panel" defaultExpanded>
					<AccordionSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>} className="m-0 panel-heading">
						<h4>{faq['header']}</h4>
					</AccordionSummary>
					<AccordionDetails>
						<p>
							{faq['text']}
						</p>
					</AccordionDetails>
				</Accordion>
  			 )}  
		</div>
    );
  }
}
