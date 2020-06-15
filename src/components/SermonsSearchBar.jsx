import React from "react";
import { MdNoteAdd, MdSearch } from "react-icons/md";

function SermonsSearchBar(props) {
  return (
    <div className="searchBarContainer">
      <div className="searchBar">
        <input
          type="text"
          name="soulsWonSearchBar"
          placeholder="search..."
          onChange={(e) => props.changeSearchValue(e.target.value)}
        />
        <MdSearch />
      </div>
      {/* Add Sermon Button */}
      <div
        className="soulsWonAddSoulBtn addSermonBtn"
        onClick={props.displayForm}
        style={{
          display:
            props.accountType === "member" || ("soulEstablishment" && "none"),
        }}
      >
        <span className="soulsWonAddSoulBtnText">Add Sermon</span>
        <span className="soulsWonAddSoulBtnIcon">
          <MdNoteAdd />
        </span>
      </div>
    </div>
  );
}

export default SermonsSearchBar;
