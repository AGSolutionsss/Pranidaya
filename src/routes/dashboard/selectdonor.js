import React from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
import "./index.css";
import { useHistory, useParams } from "react-router-dom";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";

const option = {
  filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen:true,
  download:false,
  selectableRows: false,
};

export default class AddToGroup extends React.Component {
  
  state = {
    loader: true,
    chapter: [],
    chapterData: [],
    columnData: [
      "Chapter",
      
      {
        name: "Actions",
        options: {
          filter: true,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" }}>
                    <input type="checkbox"
                    onChange={this.handleChange}
                  value ={value}  className='mr-3'/>
              </div>
            );
          },
        },
      },
    ],
  };

    handleChange = (e) => {
        const { value, checked } = e.target;
        
        if (checked) {
            var temparray = this.state.chapter;
            temparray.push(value);
            this.setState({ chapter: temparray })
           
          }else {
            this.setState({ chapter: this.state.chapter.filter((e) => e !== value) })
          }
    }
  
  addChapter(e) {
    e.preventDefault();
    let data = {
        viewer_chapter_ids : this.state.chapter.join(),
    };
    axios({
        url: baseURL+"/update-profile-chapter",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
        NotificationManager.success("Chapter Updated Sucessfully");
        window.location = '/app/dashboard';
      });
  }

  getData = () => {
    axios({
      url: baseURL+"/fetch-chapters",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        let response = res.data.chapters;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          tempRows.push([
            response[i]["chapter_name"],
            response[i]["id"],
          ]);
        }
        this.setState({ chapterData: tempRows, loader: false });
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
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <RctCollapsibleCard fullBlock>
                <div className="donorbtns" style={{marginTop:'-62px',marginRight:'56px'}}>
                    <Button color="primary" className="btn-block text-white w-100" variant="contained" id="signin" onClick={(e) => this.addChapter(e)}>
                        Submit
                    </Button>
                </div>
              {this.state.chapterData.length > 0 && (
                <MUIDataTable
                  data={this.state.chapterData}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
