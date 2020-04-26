import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import SoulCard from "../components/SoulCard";
import SearchBar from "../components/SoulsWonSearchBar";
import AddSoulModal from "../components/AddSoulModal";
import moment from "moment";
import "../css/soulsWon.css";
import "../css/soulCard.css";
import Loader from "../components/Loader";

function SoulsWon(props) {
  const [selectedTab, setSelectedTab] = useState("evangelism");
  const [month, setMonth] = useState("all");
  const [searchValue, setSetSearchValue] = useState("");
  const allSouls = () => {
    if (props.soulsWon && props.accountType && props.accountType === "member") {
      return props.soulsWon.filter(soul => soul.wonBy === props.id);
    } else {
      return props.soulsWon;
    }
  };
  const displayedSouls =
    props.soulsWon && month !== "all"
      ? allSouls().filter(
          soul =>
            soul.wonThrough === selectedTab &&
            soul.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            moment(soul.createdAt.toDate()).month() === eval(month)
        )
      : props.soulsWon &&
        allSouls().filter(
          soul =>
            soul.wonThrough === selectedTab &&
            soul.name.toLowerCase().includes(searchValue.toLowerCase())
        );

  const soulsWon =
    props.soulsWon &&
    displayedSouls.map((soul, i) => (
      <SoulCard key={i} {...soul} store={props} />
    ));

  const totalSoulsWon = props.soulsWon && displayedSouls.length;

  const changeTab = value => {
    setSelectedTab(value);
    setMonth("all");
  };
  const changeMonth = value => {
    setMonth(value);
  };
  const changeSearchValue = value => {
    setSetSearchValue(value);
  };
  const showModal = () => {
    document.querySelector(".addSoulModal").style.display = "flex";
  };

  return (
    <>
      {!props.soulsWon ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <div className="soulsWonContainer">
          <Header {...props} page="Souls Won" />
          <SearchBar
            {...props}
            showModal={showModal}
            changeTab={changeTab}
            selectedTab={selectedTab}
            totalSouls={totalSoulsWon}
            selectedMonth={month}
            changeMonth={changeMonth}
            searchValue={searchValue}
            changeSearchValue={changeSearchValue}
          />
          <div className="soulsWonCardContainer">{soulsWon}</div>
          <Navbar page="soulsWon" />
          <SideNav page="soulsWon" {...props} />
          <AddSoulModal
            {...props}
            changeTab={changeTab}
            selectedTab={selectedTab}
          />
        </div>
      )}
    </>
  );
}

export default SoulsWon;
