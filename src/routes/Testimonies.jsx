import React, { useState } from "react";
import Header from "../components/Header";
import "../css/testimonies.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import TestimonyCard from "../components/TestimonyCard";
import TestimonyForm from "../components/TestimonyForm";
import SearchBar from "../components/TestimoniesSearchBar";
import moment from "moment";
import Loader from "../components/Loader";
import { AiOutlinePlus } from "react-icons/ai";

function Testimonies(props) {
  const [displayForm, setDisplayForm] = useState(false);
  const [month, setMonth] = useState("all");
  const [selectedTab, setSelectedTab] = useState("allTestimonies");
  const allTestimonies =
    month !== "all"
      ? props.testimonies &&
        props.testimonies.filter(
          (testimony) =>
            moment(testimony.createdAt.toDate()).month() === eval(month)
        )
      : props.testimonies && props.testimonies;

  const myTestimonies =
    month !== "all"
      ? props.testimonies &&
        props.testimonies.filter(
          (testimony) =>
            testimony.userId === props.id &&
            moment(testimony.createdAt.toDate()).month() === eval(month)
        )
      : props.testimonies &&
        props.testimonies.filter((testimony) => testimony.userId === props.id);

  const displayedTestimonies =
    selectedTab === "allTestimonies" ? allTestimonies : myTestimonies;
  const changeTab = (value) => {
    setSelectedTab(value);
    setMonth("all");
  };
  const changeMonth = (value) => {
    setMonth(value);
  };

  return (
    <>
      {!props.testimonies ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <div className="testimoniesPageContainer">
          <div className=" row section">
            {/* Header */}
            <div className="mobileContainer col-12">
              <Header {...props} page="Testimonies" />
            </div>
            {/* Sidenav */}
            <div className="mobileContainer col-lg-2">
              <SideNav page="testimonies" {...props} />
            </div>
            <div className="mobileContainer col-lg-10">
              {/* Top Menu */}
              <SearchBar
                {...props}
                selectedTab={selectedTab}
                changeTab={changeTab}
                totalTestimonies={
                  props.testimonies && displayedTestimonies.length
                }
                changeMonth={changeMonth}
                selectedMonth={month}
                displayForm={() => setDisplayForm(true)}
              />
              {/* Displayed Testimonies */}
              <div className="row">
                <div className="col-lg-8 mobileContainer p-0">
                  <div className="soulsWonCardContainer testimoniesCardContainer">
                    {displayedTestimonies.length > 0 ? (
                      displayedTestimonies
                        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                        .map((testimony, i) => (
                          <TestimonyCard key={i} {...testimony} store={props} />
                        ))
                    ) : (
                      <div className="emptyDisplayText">
                        no testimony found...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Navbar */}
            <div className="mobileContainer col-12">
              <Navbar page="testimonies" />
            </div>
          </div>
          {/* Testimony Form */}
          <div
            className="mobileContainer col-12"
            style={{ display: !displayForm && "none" }}
          >
            <TestimonyForm
              {...props}
              closeModal={() => setDisplayForm(false)}
            />
          </div>
          {/* Mobile Testimony Add Button */}
          <div
            className="addTestimonyBtnMobile"
            onClick={() => setDisplayForm(true)}
          >
            <AiOutlinePlus />
          </div>
        </div>
      )}
    </>
  );
}

export default Testimonies;
