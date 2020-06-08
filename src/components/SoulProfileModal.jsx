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
import { FaTransgender, FaChurch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
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
              <MdClose />
            </div>
          </div>
          {/* Main content */}
          <div className="ModalBody">
            {/* Profile Pic */}
            <div
              className="soulProfileModalImageContainer"
              style={{ display: !props.serviceGroup && "none" }}
            >
              <div>
                <img src={props.profilePic ? props.profilePic : profilePic} />
              </div>
            </div>
            {/* Name*/}
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdPerson />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Name</span>
                {props.name}
              </div>
            </div>
            {/* Address */}
            <div
              className="soulProfileModalDetailContainer"
              style={{
                display: props.page && props.page === "leaderBoard" && "none",
              }}
            >
              <div className="soulProfileModalIcon">
                <MdLocationOn />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Address</span>
                {props.address}
              </div>
            </div>
            {/* Phone Number */}
            <div
              className="soulProfileModalDetailContainer"
              style={{
                display: props.page && props.page === "leaderBoard" && "none",
              }}
            >
              <div className="soulProfileModalIcon">
                <MdPhone />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Phone Number</span>
                {props.phoneNumber}
              </div>
            </div>
            {/* Occupation */}
            <div
              className="soulProfileModalDetailContainer"
              style={{
                display: props.page && props.page === "leaderBoard" && "none",
              }}
            >
              <div className="soulProfileModalIcon">
                <MdBusinessCenter />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Occupation</span>
                {props.occupation}
              </div>
            </div>
            {/* Bus stop */}
            <div
              className="soulProfileModalDetailContainer"
              style={{
                display: props.page && props.page === "leaderBoard" && "none",
              }}
            >
              <div className="soulProfileModalIcon">
                <MdDirectionsBus />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Bus Stop</span>
                {props.busStop}
              </div>
            </div>
            {/* Gender */}
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <FaTransgender />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Gender</span>
                {props.gender}
              </div>
            </div>
            {/* Souls Won */}
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
            {/* Satellite Church */}
            <div
              className="soulProfileModalDetailContainer"
              style={{ display: !props.satelliteChurch && "none" }}
            >
              <div className="soulProfileModalIcon">
                <FaChurch />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Satellite Church</span>
                {props.satelliteChurch}
              </div>
            </div>
            {/* Service Group */}
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
            {/* Prayer Request */}
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
        {/* Mobile Close Btn */}
        <div className="ModalCloseMobile" onClick={props.closeModal}>
          close
        </div>
      </div>
    </div>
  );
}

export default SoulProfileModal;
