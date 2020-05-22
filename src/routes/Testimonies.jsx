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

function Testimonies(props) {
  const [showForm, setShowForm] = useState(false);
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

  const displayForm = (option) => {
    setShowForm(option);
  };
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
            <div className="mobileContainer col-12">
              <Header {...props} page="Testimonies" />
            </div>
            <div className="mobileContainer col-lg-2">
              <SideNav page="testimonies" {...props} />
            </div>
            <div className="mobileContainer col-lg-10">
              <SearchBar
                {...props}
                showTestimonyForm={() => displayForm(true)}
                selectedTab={selectedTab}
                changeTab={changeTab}
                totalTestimonies={
                  props.testimonies && displayedTestimonies.length
                }
                changeMonth={changeMonth}
                selectedMonth={month}
              />
              <div className="row">
                <div className="col-lg-8 mobileContainer p-0">
                  <div className="soulsWonCardContainer testimoniesCardContainer">
                    {displayedTestimonies.length > 0 ? (
                      displayedTestimonies.map((testimony, i) => (
                        <TestimonyCard key={i} {...testimony} store={props} />
                      ))
                    ) : (
                      <div className="emptyDisplayText">
                        no testimony found...
                      </div>
                    )}
                  </div>
                </div>
                <div className="mobileContainer col-lg-4 testimonyFormCol">
                  <div
                    className="testimonyFormWrapper"
                    style={{ display: !showForm && "none" }}
                  >
                    <TestimonyForm
                      {...props}
                      hideTestimonyForm={() => displayForm(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mobileContainer col-12">
              <Navbar page="testimonies" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Testimonies;
