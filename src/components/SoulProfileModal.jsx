import React from "react";
import "../css/soulProfileModal.css";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBusinessCenter,
  MdPeople,
  MdMyLocation,
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import profilePic from "../pics/avatar.png";

function SoulProfileModal(props) {
  return (
    <div className="soulProfileModal">
      <div className="Modal">
        <div className="ModalBlind" onClick={props.closeModal}></div>
        <div className="ModalContainer soulProfileModalContainer">
          {/* Header */}
          <div className="ModalHeader m-0">
            <span className="ModalTitle">Profile</span>
            <div className="ModalCloseBtn" onClick={props.closeModal}>
              <IoMdCloseCircle />
            </div>
          </div>
          {/* Main content */}
          <div className="soulProfileModalBody">
            <div
              className="soulProfileModalImageContainer"
              style={{ display: !props.serviceGroup && "none" }}
            >
              <div>
                <img src={props.profilePic ? props.profilePic : profilePic} />
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdPerson />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Name</span>
                {props.name}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdLocationOn />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Address</span>
                {props.address}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdPhone />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Phone Number</span>
                {props.phoneNumber}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdBusinessCenter />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Occupation</span>
                {props.occupation}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdDirectionsBus />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Bus Stop</span>
                {props.busStop}
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <FaTransgender />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Gender</span>
                {props.gender}
              </div>
            </div>
            <div
              className="soulProfileModalDetailContainer"
              style={{ display: !props.soulsWon && "none" }}
            >
              <div className="soulProfileModalIcon">
                <MdPeople />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Souls Won</span>
                {props.soulsWon}
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
                <span>Service Group</span>
                {props.serviceGroup}
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
