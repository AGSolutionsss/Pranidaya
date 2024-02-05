import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";

export default class NewListStock extends React.Component {
  state = {
    loader: true,
  };
  
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("user_type_id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
      this.setState({ loader: false });
    }
  };

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
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Stocks List ( in Kgs )"
              match={this.props.match}
            />
            <RctCollapsibleCard fullBlock >
              <div style={{textAlign:'center'}}>
                <h1 style={{padding:'20px'}}>Coming soon</h1>
              </div>
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
