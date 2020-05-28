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
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import OptionModal from "./OptionModal";
import moment from "moment";

function SoulCard(props) {
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
    <div className=" col-lg-4 col-md-6 col-xl-3 pl-0 pl-md-2 pl-lg-0 mobileContainer">
      <div className="soulCardContainer">
        <div className="soulCardGradient"></div>
        <div onClick={openModal}>
          <div className="soulCardDate">
            {moment(props.createdAt.toDate()).format("LL")}
          </div>
          <div className="soulCardNameContainer">
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
            <div className="soulProfileModalPrayerRequestContainer">
              <div
                className="soulProfileModalPrayerRequestHeader"
                style={{ display: !props.prayerRequest && "none" }}
              >
                PRAYER REQUEST
              </div>
              <div className="soulProfileModalPrayerRequest">
                {props.prayerRequest.length > 25 ? (
                  <span>
                    {props.prayerRequest.slice(0, 25)}
                    <span className="expandText" onClick={openModal}>
                      ...continue reading
                    </span>
                  </span>
                ) : (
                  props.prayerRequest
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="soulCardOptions">
          <span className="soulCardOptionIcon">
            <a
              href={`tel:${props.phoneNumber}`}
              style={{ display: !props.phoneNumber && "none" }}
            >
              <MdPhone />
            </a>
          </span>
          <span className="soulCardOptionIcon">
            <a href={`sms:${props.phoneNumber}`}>
              <MdTextsms />
            </a>
          </span>
          <span className="soulCardOptionIcon">
            <a onClick={() => displayDeleteModal(true)}>
              <MdDelete />
            </a>
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
            type="delete"
            closeModal={() => displayDeleteModal(false)}
            title="Delete Soul?"
            message={
              "soul would be permanently deleted and cannot be recovered"
            }
            action={() => {
              props.store.deleteSoul(props.id);
              displayDeleteModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SoulCard;
