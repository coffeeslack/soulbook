import React, { useState } from "react";
import Header from "../components/Header";
import "../css/testimonies.css";
import "../css/sermon.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import SermonCard from "../components/SermonCard";
import SearchBar from "../components/SermonsSearchBar";
import Loader from "../components/Loader";
import { MdAdd } from "react-icons/md";
import SermonForm from "../components/SermonForm";

function Sermons(props) {
  const [displayForm, setDisplayForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const sermons =
    props.sermons &&
    props.sermons.filter((sermon) =>
      sermon.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
      <div className="testimoniesPageContainer">
        <div className=" row section">
          {/* Header */}
          <div className="mobileContainer col-12">
            <Header {...props} page="Sermons" />
          </div>
          {/* Sidenav */}
          <div className="mobileContainer col-lg-2">
            <SideNav page="sermons" {...props} />
          </div>
          <div className="mobileContainer col-lg-10">
            {/* Top Menu */}
            <SearchBar
              {...props}
              changeSearchValue={(value) => setSearchValue(value)}
              displayForm={() => setDisplayForm(true)}
            />
            {!props.sermons && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {/* Displayed Testimonies */}
            <div
              className="soulsWonCardContainer sermonCardContainer row no-gutters"
              style={{ display: !props.sermons && "none" }}
            >
              {props.sermons && sermons.length > 0 ? (
                sermons
                  .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                  .map((sermon, i) => (
                    <SermonCard key={i} {...sermon} store={props} />
                  ))
              ) : (
                <div className="emptyDisplayText">no sermon found...</div>
              )}
            </div>
          </div>
          {/* Mobile Navbar */}
          <div className="mobileContainer col-12">
            <Navbar page="sermons" />
          </div>
        </div>
        {/* Sermon Form */}
        <div
          className="mobileContainer col-12"
          style={{ display: !displayForm && "none" }}
        >
          <SermonForm {...props} closeModal={() => setDisplayForm(false)} />
        </div>
        {/* Mobile Testimony Add Button */}
        <div
          className="addTestimonyBtnMobile"
          onClick={() => setDisplayForm(true)}
          style={{ display: props.accountType === "member" && "none" }}
        >
          <MdAdd />
        </div>
      </div>
    </>
  );
}

export default Sermons;
