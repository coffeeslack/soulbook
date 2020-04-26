import React from "react";
import { MdNoteAdd } from "react-icons/md";

function TestimoniesSearchBar(props) {
  return (
    <div className="soulsWonSearchBarContainer testimonyMenu">
      <div className="soulsWonTabMenu">
        <div
          className={
            props.selectedTab === "allTestimonies"
              ? "soulsWonTabOption selectedSoulsWonTab"
              : "soulsWonTabOption"
          }
          onClick={() => props.changeTab("allTestimonies")}
        >
          All Testimonies
        </div>
        <div
          className={
            props.selectedTab === "myTestimonies"
              ? "soulsWonTabOption selectedSoulsWonTab"
              : "soulsWonTabOption"
          }
          onClick={() => props.changeTab("myTestimonies")}
        >
          My Testimonies
        </div>
      </div>
      <div className="soulsWonTabMenuMobile testimonyTabMenuMobile">
        <select
          name="tabMenuMobile"
          value={props.selectedTab}
          onChange={e => props.changeTab(e.target.value)}
        >
          <option value="allTestimonies">All Testimonies</option>
          <option value="myTestimonies">My Testimonies</option>
        </select>
      </div>
      <div
        className="soulsWonAddSoulBtn addTestimonyBtn"
        onClick={props.showTestimonyForm}
      >
        <span className="soulsWonAddSoulBtnText">Give Testimony</span>
        <span className="soulsWonAddSoulBtnIcon">
          <MdNoteAdd />
        </span>
      </div>
      <div className="soulsWonSortMenu">
        <span>Month</span>
        <select
          name="sortType"
          className="monthOptions"
          value={props.selectedMonth}
          onChange={e => props.changeMonth(e.target.value)}
        >
          <option value="all">All</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <span className="totalSoulsWonContainer">
          <span className="totalSoulsWonText">total</span>
          <span className="totalSoulsWonCount">{props.totalTestimonies}</span>
        </span>
      </div>
    </div>
  );
}

export default TestimoniesSearchBar;
