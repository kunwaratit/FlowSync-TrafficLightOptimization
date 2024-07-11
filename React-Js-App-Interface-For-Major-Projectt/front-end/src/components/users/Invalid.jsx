import React from "react";
const Invalid = () => {
  return (
    <>
      <div className="dasheader">
        <h1>Bad Gateway</h1>
        <p>
          
        </p>
      </div>
      <hr />
      <div
        style={{
            textAlign:'center',
            alignContent:'center',
          height: "200px",
          background:
            "linear-gradient(140deg, rgb(202 170 4), #29775d, #3c8f2f, transparent)",
        }}
      >
        <h1 className="info" style={{ color: "#ffff", fontSize: "xx-large" }}>
          You are not supposed to be here!!!
        </h1>
      </div>
    </>
  );
};
export default Invalid;
