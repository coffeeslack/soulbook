import React from "react";
import { MdSearch } from "react-icons/md";

function MembersSearchBar(props) {
  return (
    <div className="soulsWonSearchBarContainer membersSearchBarContainer">
      <div className="soulsWonSearchBar membersSearchBar">
        <input
          type="text"
          name="soulsWonSearchBar"
          placeholder="search..."
          value={props.searchValue}
          onChange={e => props.changeSearchValue(e.target.value)}
        />
        <MdSearch />
      </div>
      <div className="soulsWonSortMenu membersSortMenu">
        <span>Sort by</span>
        <select
          name="sortType"
          value={props.sortBy}
          onChange={e => props.setSortType(e.target.value)}
        >
          <option value="soulsWon">Souls won</option>
          <option value="name">Name</option>
        </select>
        <span className="selectLabel">Month</span>
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
        <span className="selectLabel">Service group</span>
        <select
          name="sortType"
          value={props.serviceGroup}
          onChange={e => props.setServiceGroup(e.target.value)}
        >
          <option value="all">All</option>
          <option value="technical">Technical</option>
          <option value="ushering">Ushering</option>
          <option value="sanctuary">Sanctuary</option>
          <option value="editorial">Editorial</option>
          <option value="cc1">CC1</option>
          <option value="cc2">CC2</option>
        </select>
        <span className="totalSoulsWonContainer">
          <span className="totalSoulsWonText">total </span>
          <span className="totalSoulsWonCount">{props.totalMembers}</span>
        </span>
      </div>
    </div>
  );
}

export default MembersSearchBar;
