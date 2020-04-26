import React from "react";
import "../css/testimonyCardModal.css";
import moment from "moment";

function TestimonyCardModal(props) {
  return (
    <div className="testimonyCardModal">
      <div className="Modal">
        <div className="ModalBlind" onClick={props.closeModal}></div>
        <div className="ModalContainer testimonyCardModalContainer">
          <div className="testimonyCardDate">
            {moment(props.createdAt).format("LL")}
          </div>
          <div className="testimonyCardTitle">{props.title}</div>
          <div className="testimonyCardText">{props.text}</div>
          <div className="testimonyCardFrom">- {props.from}</div>
        </div>
      </div>
    </div>
  );
}

export default TestimonyCardModal;
