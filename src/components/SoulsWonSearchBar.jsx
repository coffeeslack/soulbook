import React from "react";
import { MdSearch, MdPersonAdd } from "react-icons/md";

function SoulsWonSearchBar(props) {
  return (
    <div className="soulsWonSearchBarContainer">
      <div className="soulsWonAddSoulBtn" onClick={props.showModal}>
        <span className="soulsWonAddSoulBtnText">Add Soul</span>
        <span className="soulsWonAddSoulBtnIcon">
          <MdPersonAdd />
        </span>
      </div>
      <div className="soulsWonTabMenu">
        <div
          className={
            props.selectedTab === "evangelism"
              ? "soulsWonTabOption selectedSoulsWonTab"
              : "soulsWonTabOption"
          }
          onClick={() => props.changeTab("evangelism")}
        >
          Evangelism
        </div>
        <div
          className={
            props.selectedTab === "altarCall"
              ? "soulsWonTabOption selectedSoulsWonTab"
              : "soulsWonTabOption"
          }
          onClick={() => props.changeTab("altarCall")}
          style={{ display: props.accountType === "member" && "none" }}
        >
          Altar call
        </div>
        <div
          className={
            props.selectedTab === "firstTimer"
              ? "soulsWonTabOption selectedSoulsWonTab"
              : "soulsWonTabOption"
          }
          onClick={() => props.changeTab("firstTimer")}
          style={{ display: props.accountType === "member" && "none" }}
        >
          First Timers
        </div>
      </div>
      <div
        className="soulsWonTabMenuMobile"
        style={{ display: props.accountType === "member" && "none" }}
      >
        <select
          name="tabMenuMobile"
          className="tabMenuMobile"
          value={props.selectedTab}
          onChange={e => props.changeTab(e.target.value)}
        >
          <option value="evangelism">Evangelism</option>
          <option value="altarCall">Altar call</option>
          <option value="firstTimer">first Timers</option>
        </select>
      </div>
      <div className="soulsWonSearchBar">
        <MdSearch />
        <input
          type="text"
          name="soulsWonSearchBar"
          placeholder="search..."
          onChange={e => props.changeSearchValue(e.target.value)}
        />
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
          <span className="totalSoulsWonText">total </span>
          <span className="totalSoulsWonCount">{props.totalSouls}</span>
        </span>
      </div>
    </div>
  );
}

export default SoulsWonSearchBar;
