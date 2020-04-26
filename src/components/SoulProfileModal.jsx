import React from "react";
import "../css/soulProfileModal.css";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBusinessCenter,
  MdPeople,
  MdMyLocation
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

function SoulProfileModal(props) {
  return (
    <div className="soulProfileModal">
      <div className="Modal">
        <div className="ModalBlind" onClick={props.closeModal}></div>
        <div className="ModalContainer soulProfileModalContainer">
          <div className="soulProfileModalHeader">
            <div className="soulProfileModalName">
              <div>
                <MdPerson />
              </div>
              {props.name}
            </div>
          </div>
          <div className="soulProfileModalBody">
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdLocationOn />
              </div>
              <div className="soulProfileModalIconDetail">{props.address}</div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdPhone />
              </div>
              <div className="soulProfileModalIconDetail">
                {props.phoneNumber}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdBusinessCenter />
              </div>
              <div className="soulProfileModalIconDetail">
                {props.occupation}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdDirectionsBus />
              </div>
              <div className="soulProfileModalIconDetail">{props.busStop}</div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <FaTransgender />
              </div>
              <div className="soulProfileModalIconDetail">{props.gender}</div>
            </div>
            <div
              className="soulProfileModalDetailContainer"
              style={{ display: !props.soulsWon && "none" }}
            >
              <div className="soulProfileModalIcon">
                <MdPeople />
              </div>
              <div className="soulProfileModalIconDetail">
                Souls won{" "}
                <span className="soulsWonCounterLabel">{props.soulsWon}</span>
              </div>
            </div>
            <div
              className="soulProfileModalDetailContainer"
              style={{ display: !props.serviceGroup && "none" }}
            >
              <div className="soulProfileModalIcon">
                <MdMyLocation />
              </div>
              <div className="soulProfileModalIconDetail">
                Service group - {props.serviceGroup}
              </div>
            </div>
            <div className="soulProfileModalPrayerRequestContainer">
              <div
                className="soulProfileModalPrayerRequestHeader"
                style={{ display: !props.prayerRequest && "none" }}
              >
                PRAYER REQUEST
              </div>
              <div className="soulProfileModalPrayerRequest">
                {props.prayerRequest}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoulProfileModal;
