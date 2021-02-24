import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./index.css"

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
    loader:true,
    users: [],
    chaptersData: [],
    columnData: [
      "#",
      "Code",
      "Name",
      "Email",
      "State",
      "Whatsapp",
      {
        name: "Actions",
        options: {
          filter: true,
          customBodyRender: (value) => {
            return (
              <div>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link to={"view?id=" + value}>
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                  <IconButton aria-label="Edit">
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
   
  };

  getData = () => {
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-chapters",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      console.log("rest", res.data);
      let response = res.data.chapters;
      //console.log("chapleng", res.data.chapters);
      let tempRows = [];
      for (let i = 0; i < response.length; i++) {
        tempRows.push([
          i + 1,
          response[i]["chapter_code"],
          response[i]["chapter_name"],
          response[i]["chapter_email"],
          response[i]["chapter_state"],
          response[i]["chapter_whatsapp"],
          response[i]["id"],
        ]);
      }
      this.setState({ chaptersData: tempRows, loader: false });
    }).catch((res) => {
      this.setState({ loader: false });
    })
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {loader}=this.state
    return (
      <div className="data-table-wrapper">
      {loader && 
       <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} />}
        {!loader &&  
        <>
        <PageTitleBar
          title={<IntlMessages id="sidebar.dataTable" />}
          match={this.props.match}
        /> 
        {/* <div className="alert alert-info">
					<p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
				</div> */}

        {/* <Link className="btn btn-outline-light" to="addchapter">
          <Button className="mr-10 mb-10 btn-get-started" color="danger">
            + Add User
          </Button>
        </Link> */}
        <div className="donorbtns">
        <Link className="btn btn-outline-light" to="addchapter">
          <Button  className="mr-10 mb-10 btn-get-start" color="danger">
            + Add Chapter
          </Button>
        </Link>
        </div>
        <RctCollapsibleCard fullBlock>
        {this.state.chaptersData.length > 0 && (
          <MUIDataTable
            title={"Employee list"}
            data={this.state.chaptersData}
            columns={this.state.columnData}
            options={option}
          />
        )}
         </RctCollapsibleCard> 
         </>}
      </div>
    );
  }
}
