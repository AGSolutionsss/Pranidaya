/**
** Session Slider
**/
import React, { Component } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

export default class SessionSlider extends Component {

   // state = {
   //    sessionUsersData: null
   // }

   // componentDidMount() {
   //    this.getSessionUsersData();
   // }

   // // session users data
   // getSessionUsersData() {
   //    api.get('testimonials.js')
   //       .then((response) => {
   //          //console.log(response)
   //          this.setState({ sessionUsersData: response.data });
   //       })
   //       .catch(error => {
   //          // error handling
   //       })
   // }

   render() {
      const settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         autoplay: true,
         swipe: true,
         touchMove: true,
         swipeToSlide: true,
         draggable: true
      };
      // const { sessionUsersData } = this.state;
      return (
         <div className="session-slider">
            <Slider {...settings}>
               {/* {(sessionUsersData && sessionUsersData !== null) && sessionUsersData.map((data, key) => ( */}
                  <div >
                     <img
                        src={require("Assets/img/1.jpg")}
                        alt="session-slider"
                        className="img-fluid"
                        width="377"
                        height="588"
                     />
                     <div className="rct-img-overlay">
                        <h5 className="client-name">Functional Literacy</h5>
                        {/* <span>Web Developer</span> */}
                        <p className="mb-0 fs-14">Ekal Vidyalaya or One Teacher School (OTS) is one of the most important part of FTS’ five -fold education for imparting primary education to the children in a tribal village.</p>
                     </div>
                  </div>
                  <div >
                     <img
                        src={require("Assets/img/2.jpg")}
                        alt="session-slider"
                        className="img-fluid"
                        width="377"
                        height="588"
                     />
                     <div className="rct-img-overlay">
                        <h5 className="client-name">Health Care / Arogya</h5>
                        {/* <span>Web Developer</span> */}
                        <p className="mb-0 fs-14">Health Care / Arogya was introduced under the five fold education of ‘Ekal’ after setting up OTSs in villages after realising the need to address the health issues of the children and / or their parents, so as to ensure their regular attendance in the school. </p>
                     </div>
                  </div>
                  <div >
                     <img
                        src={require("Assets/img/3.jpg")}
                        alt="session-slider"
                        className="img-fluid"
                        width="377"
                        height="588"
                     />
                     <div className="rct-img-overlay">
                        <h5 className="client-name">Empowerment / Jagran</h5>
                        {/* <span>Web Developer</span> */}
                        <p className="mb-0 fs-14">FTS, under its five – fold education system, has taken up the initiative to spread awareness amongst the illiterate and economically poor people about the government welfare schemes so to protect them not only from deprivation but also get access to the benefits of such schemes.</p>
                     </div>
                  </div>
                  <div >
                     <img
                        src={require("Assets/img/4.jpg")}
                        alt="session-slider"
                        className="img-fluid"
                        width="377"
                        height="588"
                     />
                     <div className="rct-img-overlay">
                        <h5 className="client-name">Ethics & Value Education / Sanskar</h5>
                        {/* <span>Web Developer</span> */}
                        <p className="mb-0 fs-14">FTS places utmost emphasis on Ethics & Value Education or ‘SanskarShiksha’ which is all about Indian culture, heritage and values; the village community is directed towards a value – based education surrounded and enhanced with religious environment.</p>
                     </div>
                  </div>
               {/* ))} */}
            </Slider>
         </div>
      );
   }
}
