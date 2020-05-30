import React from "react";
import "../css/testimonyCardModal.css";
import moment from "moment";
import { IoMdCloseCircle } from "react-icons/io";

function TestimonyCardModal(props) {
  return (
    <div className="testimonyCardModal">
      <div className="Modal">
        <div className="ModalBlind" onClick={props.closeModal}></div>
        <div className="ModalContainer testimonyCardModalContainer">
          {/* Header */}
          <div className="ModalHeader m-0">
            <span className="ModalTitle">Testimony</span>
            <div className="ModalCloseBtn" onClick={props.closeModal}>
              <IoMdCloseCircle />
            </div>
          </div>
          <div className="ModalBody">
            <div className="testimonyCardDate">
              {moment(props.createdAt).format("LL")}
            </div>
            <div className="testimonyCardTitle">{props.title}</div>
            <div className="testimonyCardText">{props.text}</div>
            <div className="testimonyCardFrom">
              - {props.userName} from {props.satelliteChurch} satellite church
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonyCardModal;
