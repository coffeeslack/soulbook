import React, { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import OptionModal from "./OptionModal";
import moment from "moment";

function Notification(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayDeleteModal = option => {
    setShowDeleteModal(option);
  };
  return (
    <div className="notificationContainer">
      <div className="notificationIcon">
        <AiOutlineBell />
      </div>
      <div className="notificationMessage">{props.message}</div>
      <div className="notificationDate">
        {moment(props.createdAt.toDate()).calendar()}
        <div
          className="notificationDeleteBtn"
          onClick={() => displayDeleteModal(true)}
          style={{
            display:
              props.store.accountType &&
              props.store.accountType === "member" &&
              "none"
          }}
        >
          delete
        </div>
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
            props.store.deleteNotification(props.id);
            displayDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
}

export default Notification;
