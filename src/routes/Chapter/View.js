import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';



export default function View() {
  const [user, setUser] = useState([]);
  const [loader, setLoader]= useState(true);

  useEffect(() => {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    axios({
      url: "https://ftschamp.trikaradev.xyz/api/fetch-chapter-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      // console.log("view",res.data)
      setUser(res.data.chapter);
      setLoader(false)
      console.log("view", res.data.chapter);
    });
  }, []);

  return (
    <div>
    { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <p>Address : {user.chapter_address}</p>
      <p>City : {user.chapter_city}</p>
      <p>PIN : {user. chapter_pin}</p>
      <p>State : {user.chapter_state}</p>
      <p>Phone : {user.chapter_phone}</p>
      <p>Whatsapp : {user.chapter_whatsapp}</p>
      <p>Email : {user.chapter_email}</p>
      <p>Website : {user.chapter_website}</p>
      <p>Date Of Incorporation : {user.chapter_date_of_incorporation}</p>
      <p>Region Code : {user.chapter_region_code}</p>
      <p>Status : {user.chapter_status}</p>
      <p>Created By : {user.chapter_created_by}</p>
      <p>Created On : {user.chapter_created_on}</p>
      <p>Updated by : {user.chapter_updated_by}</p>
      <p>Updated On : {user.chapter_updated_on}</p>
      </>}
    </div>
  );
}
