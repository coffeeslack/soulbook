import React from "react";
import Header from "../components/Header";
import "../css/home.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

function LiveStream(props) {
  return (
    <div className="homeContainer">
      <div>
        <Header {...props} page="SoulBook" />
        <Navbar page="home" />
        <SideNav page="home" {...props} />
        <div></div>
      </div>
    </div>
  );
}

export default LiveStream;
