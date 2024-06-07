import img1 from "./images/1.jpg"
import img2 from "./images/2.jpg"
import img3 from "./images/3.jpg"

import React from 'react';

const Output = () => {
  return (
    <section className="section-course">
      <div className="container">
        <h2 className="section-common-heading">Output :</h2>
        <p className="section-common-subheading">
          FlowSync is an innovative traffic management system utilizing computer vision to dynamically adjust signals, reducing congestion and 
          improving efficiency in Nepal's urban areas. By automating traffic control, it minimizes manual labor, decreases fuel consumption, and enhances safety,
          contributing to a more sustainable and livable environment.
        </p>
      </div>
      <div className="img_11">
        <img src={img1} alt="Output" />
        <div className="container">
          <h2 className="section-common-heading">Modes & Chart :</h2>
          <p className="section-common-subheading">
            It presents users with real-time data visualization and control options through intuitive modes 
            and interactive charts. It enables monitoring traffic density, analyzing historical data, and adjusting signal timings, 
            empowering users to optimize traffic flow efficiently.
          </p>
        </div>
        <img src={img2} alt="Output" />
        <div className="container">
          <h2 className="section-common-heading">Problem :</h2>
          <p className="section-common-subheading">
            FlowSync project highlights the challenges and issues faced in traditional traffic management systems, particularly in Nepal's urban areas. 
            It addresses key concerns such as traffic congestion, manual traffic control, fuel consumption, carbon emissions, and air pollution. 
            Traditional methods often lead to inefficient traffic flow, increased travel times, and heightened environmental impact due to excessive vehicle 
            idling. Additionally, manual traffic management poses risks to the safety of both motorists and pedestrians, especially in congested intersections.
          </p>
        </div>
        <img src={img3} alt="Output" />
      </div>
    </section>
  );
};

export default Output;
