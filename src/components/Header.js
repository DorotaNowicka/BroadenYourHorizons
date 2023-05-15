import React from "react";

function Header(props) {
  return (
    <div>
      {" "}
      <p className="App-header" style={{ fontSize: 40 }}>
        Broaden Your Horizons
      </p>
      <p className="App-header italic" style={{ fontStyle: "italic" }}>
        Let your worldview go beyond one continent
      </p>
    </div>
  );
}

export default Header;
