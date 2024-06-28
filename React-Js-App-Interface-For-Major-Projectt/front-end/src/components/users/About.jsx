import React from "react";

const About = () => {
  return (
    <section className="section-about" id="call-me-about">
      <div className="container">
        <h2 className="section-common-heading">About Flow Sync :</h2>
        <p className="section-common-subheading">
          FlowSync utilizes computer vision algorithms to analyze traffic
          patterns in real-time. Cameras installed at intersections monitor
          traffic density and flow. This data is processed to dynamically adjust
          the traffic signals, optimizing the duration of green and red lights
          based on the current traffic conditions. The system ensures that
          high-density traffic areas are given priority, reducing wait times and
          improving overall traffic movement.
        </p>
      </div>
    </section>
  );
};

export default About;
