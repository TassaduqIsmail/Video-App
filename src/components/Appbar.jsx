import React from "react";

function Appbar() {
  return (
    <div className="flex justify-between p-5">
      <img src="smalllogo.png" />

      <div className="flex gap-2">
        <a href="search">
          <img src="searchicon.png" alt="" className="mr-2" />
        </a>
        <a href="/">
          <img src="logouticon.png" alt="" />
        </a>
      </div>
    </div>
  );
}

export default Appbar;
