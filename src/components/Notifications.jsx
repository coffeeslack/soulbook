import React from "react";
import "../css/notifications.css";
import Notification from "./Notification";
import NotificationModal from "./NotificationModal";
import ReactLoading from "react-loading";

function Notifications(props) {
  const showModal = () => {
    document.querySelector(".notificationModal").style.display = "flex";
  };
  return (
    <div className="notificationsContainer">
      <div className="notificationsHeader">
        <div className="notificationsHeaderTitle">Notifications</div>
        <div
          className="notificationsSendBtn"
          onClick={showModal}
          style={{ display: props.accountType === "member" && "none" }}
        >
          Send
        </div>
      </div>
      <div className="notificationsCardContainer">
        {!props.notifications && (
          <div className="reactLoaderContainer">
            <ReactLoading
              type="bars"
              color="#29abe2"
              height={30}
              width={30}
              className="reactLoader"
            />
          </div>
        )}
        {props.notifications &&
          props.notifications.map((notification, i) => (
            <Notification key={i} {...notification} store={props} />
          ))}
      </div>
      <NotificationModal {...props} />
    </div>
  );
}

export default Notifications;
