import React from "react";
import Header from "../components/Header";
import "../css/home.css";
import SlideShow from "../components/SlideShow";
import Notifications from "../components/Notifications";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import DataSummary from "../components/DataSummary";
import Loader from "../components/Loader";

function Home(props) {
  return (
    <div className="homeContainer">
      {props.loading ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <div>
          <Header {...props} page="SoulBook" />
          <SlideShow {...props} />
          <Notifications {...props} />
          <Navbar page="home" />
          <SideNav page="home" {...props} />
          <DataSummary {...props} />
        </div>
      )}
    </div>
  );
}

export default Home;
