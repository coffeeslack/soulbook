import React, { useState } from "react";
import SoulProfileModal from "../components/SoulProfileModal";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdTextsms,
  MdDelete,
  MdDirectionsBus,
  MdBusinessCenter,
  MdPeople,
  MdMyLocation,
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import "../css/memberCard.css";
import OptionModal from "./OptionModal";
import moment from "moment";
import profilePic from "../pics/avatar.png";

function MemberCard(props) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayDeleteModal = (option) => {
    setShowDeleteModal(option);
  };
  return (
    <div className=" col-lg-4 col-xl-3 col-md-6 pl-0 pl-md-2 pl-lg-0 m-0 mobileContainer">
      <div className="soulCardContainer memberCardContainer">
        <div className="soulCardGradient"></div>
        <div onClick={openModal}>
          <div className="soulCardDate memberCardDate">
            {moment(props.createdAt.toDate()).format("LL")}
          </div>
          <div className="memberProfilePicContainer">
            <img
              src={props.profilePic ? props.profilePic : profilePic}
              alt="memberProfilePic"
            />
          </div>
          <div className="soulCardNameContainer memberNameContainer">
            <span className="soulCardMainIcon">
              <MdPerson />
            </span>
            {props.name.length < 20 ? (
              <span className="soulCardName">{props.name}</span>
            ) : (
              <span className="soulCardName">{props.name.slice(0, 20)}...</span>
            )}
          </div>
          <div className="soulCardAddressContainer">
            <span className="soulCardMainIcon">
              <MdLocationOn />
            </span>
            {props.address.length < 20 ? (
              <span className="soulCardAddress">{props.address}</span>
            ) : (
              <span className="soulCardAddress">
                {props.address.slice(0, 20)}...
              </span>
            )}
          </div>
          <div className="soulCardOtherDetails">
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
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdPeople />
              </div>
              <div className="soulProfileModalIconDetail">
                Souls won -{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {props.soulsWon}
                </span>
              </div>
            </div>
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdMyLocation />
              </div>
              <div className="soulProfileModalIconDetail">
                Service group - {props.serviceGroup}
              </div>
            </div>
          </div>
        </div>
        <div className="soulCardOptions">
          <span className="soulCardOptionIcon">
            <a href={`tel:${props.phoneNumber}`}>
              <MdPhone />
            </a>
          </span>
          <span className="soulCardOptionIcon">
            <a href={`sms:${props.phoneNumber}`}>
              <MdTextsms />
            </a>
          </span>
          <span
            className="soulCardOptionIcon"
            // onClick={() => displayDeleteModal(true)}
            style={{ color: "lightgrey " }}
          >
            <MdDelete />
          </span>
        </div>
        <div
          className="soulProfileModalWrapper"
          style={{ display: showModal ? "flex" : "none" }}
        >
          <SoulProfileModal {...props} closeModal={closeModal} />
        </div>
        <div
          className="deleteOptionModal"
          style={{ display: !showDeleteModal && "none" }}
        >
          <OptionModal
            {...props}
            closeModal={() => displayDeleteModal(false)}
            message={"Are you sure you want to delete?"}
            action={() => {
              props.store.deleteMember(props.id);
              displayDeleteModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
