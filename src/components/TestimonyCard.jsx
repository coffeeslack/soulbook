import React, { useState } from "react";
import "../css/testimonyCard.css";
import { MdDelete } from "react-icons/md";
import TestimonyCardModal from "../components/TestimonyCardModal";
import OptionModal from "./OptionModal";
import moment from "moment";

function TestimonyCard(props) {
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
  const Text = () => {
    if (props.text.length > 500) {
      return (
        <span>
          {props.text.slice(0, 500)}
          <span className="expandText" onClick={openModal}>
            ...continue reading
          </span>
        </span>
      );
    }
    if (props.text.length < 500) {
      return props.text;
    }
  };

  return (
    <div className="testimonyCardContainer">
      <div className="testimonyCardGradient"></div>
      <div className="testimonyCardHeader">
        <div className="testimonyCardDate">
          {moment(props.createdAt.toDate()).format("LL")}
        </div>
        <div className="testimonyCardOptions">
          <span
            className="testimonyCardOption"
            style={{
              display:
                props.store.accountType === "member" &&
                props.userId !== props.store.id &&
                "none",
            }}
          >
            <span className="testimonyCardOptionIcon">
              <MdDelete />
            </span>
            <span
              className="testimonyCardOptionText"
              onClick={() => displayDeleteModal(true)}
            >
              Delete
            </span>
          </span>
        </div>
      </div>
      <div className="testimonyCardTitle">{props.title}</div>
      <div className="testimonyCardText">
        <Text />
      </div>
      <div className="testimonyCardFrom">
        - {props.userName} from {props.satelliteChurch} satellite church
      </div>
      <div
        className="testimonyCardModalContainer"
        style={{ display: !showModal && "none" }}
      >
        <TestimonyCardModal {...props} closeModal={closeModal} />
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
            props.store.deleteTestimony(props.id);
            displayDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
}

export default TestimonyCard;
