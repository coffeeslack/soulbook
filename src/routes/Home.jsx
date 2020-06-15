import React from "react";
import Header from "../components/Header";
import "../css/home.css";
import SlideShow from "../components/SlideShow";
import Notifications from "../components/Notifications";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import DataSummary from "../components/DataSummary";
import Loader from "../components/Loader";
import OfflineError from "../components/OfflineError";

function Home(props) {
  return (
    <div className="homeContainer">
      <div>
        <div className="row section">
          <div className="mobileContainer col-12">
            <Header {...props} page="SoulBook" />
          </div>
          <div className="mobileContainer col-lg-2">
            <SideNav page="home" {...props} />
          </div>
          <div className="mobileContainer col-lg-10 contentContainer">
            {navigator.onLine && props.loading && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {!navigator.onLine && props.loading && <OfflineError />}
            <div className="row" style={{ display: props.loading && "none" }}>
              <div className="mobileContainer col-lg-8">
                <SlideShow
                  slideShowPics={props.slideShowPics}
                  accountType={props.accountType}
                  deleteSlidePic={props.deleteSlidePic}
                  addSlidePic={props.addSlidePic}
                />
                <DataSummary {...props} />
              </div>
              <div className="mobileContainer col-lg-4">
                <Notifications {...props} />
              </div>
            </div>
          </div>
          <div className="mobileContainer col-12">
            <Navbar page="home" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
