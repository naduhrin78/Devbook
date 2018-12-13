import spinner from "./spinner.gif";

import React from "react";

function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "200px", display: "block", margin: "auto" }}
      />
    </div>
  );
}

export default Spinner;
