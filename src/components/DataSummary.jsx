import React from "react";
import "../css/dataSummary.css";
import { AiFillPlusCircle } from "react-icons/ai";
import AddSoulModal from "./AddSoulModal";

function DataSummary(props) {
  const showModal = () => {
    document.querySelector(".addSoulModal").style.display = "flex";
  };
  const firstTimers =
    props.soulsWon &&
    props.soulsWon.filter(soul => soul.wonThrough === "firstTimer");
  return (
    <div className="dataSummaryContainer">
      <div className="dataSummaryCard">
        <div className="dataCount">
          {props.soulsWon && props.soulsWon.length}
        </div>
        <div className="dataLabel">souls won</div>
      </div>
      <div
        className="dataSummaryCard"
        style={{
          display: props.accountType && props.accountType === "member" && "none"
        }}
      >
        <div className="dataCount">{firstTimers && firstTimers.length}</div>
        <div className="dataLabel">first timers</div>
      </div>
      <div
        className="dataSummaryCard"
        style={{
          display: props.accountType && props.accountType === "member" && "none"
        }}
      >
        <div className="dataCount">{props.members && props.members.length}</div>
        <div className="dataLabel">members</div>
      </div>
      <div className="dataSummaryCard addSoulCard" onClick={showModal}>
        <div className="dataCount">
          <AiFillPlusCircle />
        </div>
        <div className="dataLabel">Add soul</div>
      </div>
      <AddSoulModal {...props} />
    </div>
  );
}

export default DataSummary;
