import React from "react";
import "../css/testimonyForm.css";
import "../css/modal.css";

function ImageModal(props) {
  return (
    <div className="Modal row p-2">
      {/* Modal Backdrop */}
      <div className="ModalBlind" onClick={props.closeModal}></div>
      {/* Modal Content */}
      <div className="ModalContainer ImageModalContainer col-lg-6 d-flex align-items-center justify-content-center">
        {/* Main Modal content */}
        <img src={props.src} width="100%" />
      </div>
    </div>
  );
}

export default ImageModal;
