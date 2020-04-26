import React from "react";
import "../css/optionModal.css";

function OptionModal(props) {
  return (
    <div className="optionModal">
      <div className="optionModalBlind" onClick={props.closeModal}></div>
      <div className="optionModalContainer">
        <div className="optionModalMessage">{props.message}</div>
        <div className="optionModalOptions">
          <div
            className="optionModalOption"
            onClick={props.action && props.action}
          >
            Yes
          </div>
          <div className="optionModalOption" onClick={props.closeModal}>
            No
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionModal;
