import React, { useState } from "react";
import "../css/slideShowModal.css";
import { MdClose } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import firebase from "firebase/app";
import "firebase/storage";
import OptionModal from "./OptionModal";
import AlertBox from "./AlertBox";
import { v4 as uuidv4 } from "uuid";

function SlideShowModal(props) {
  const [uploading, setUploading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeModal = () => {
    document.querySelector(".slideShowModal").style.display = "none";
  };
  const handleSlideImageUpload = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = firebase
        .storage()
        .ref(`slideImages/${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploading(true);
          setAlertMessage(`uploading image...(${progress}%)`);
        },
        (error) => {
          console.log(error);
          setUploading(true);
          setAlertMessage(error.message);
          setTimeout(() => setUploading(false), 1000);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false);
            const pic = {
              id: uuidv4(),
              src: url,
              createdAt: new Date(),
            };
            props.addSlidePic(pic);
          });
        }
      );
    }
  };
  const BannerContainer = (props) => (
    <>
      <div className="bannerContainer col-lg-6 ">
        <img src={props.pic.src} alt="banner" />
        <div
          className="bannerDelete"
          onClick={() => setShowDeleteModal(true)}
          style={{
            display:
              props.slideShowPics && props.slideShowPics.length === 1 && "none",
          }}
        >
          <FaRegTrashAlt />
        </div>
      </div>
      <div
        className="deleteOptionModal"
        style={{ display: !showDeleteModal && "none" }}
      >
        <OptionModal
          type="delete"
          closeModal={() => setShowDeleteModal(false)}
          title="Delete Banner?"
          message={
            "banner would be permanently deleted and cannot be recovered"
          }
          action={() => {
            props.deleteSlidePic(props.pic.id);
            setShowDeleteModal(false);
          }}
        />
      </div>
    </>
  );
  return (
    <>
      <div className="slideShowModal">
        <div className="Modal row mobileContainer">
          <div className="ModalBlind" onClick={closeModal}></div>
          <div className="ModalContainer col-lg-6">
            <div style={{ display: !uploading && "none" }}>
              <AlertBox message={alertMessage} />
            </div>
            <div className="ModalHeader">
              <span className="ModalTitle">Banners</span>
              <div className="ModalCloseBtn" onClick={closeModal}>
                <MdClose />
              </div>
            </div>
            <div className="ModalBody">
              <div className="bannerContainerWrap">
                <div className="row">
                  {props.slideShowPics &&
                    props.slideShowPics.map((pic, i) => (
                      <BannerContainer pic={pic} key={i} {...props} />
                    ))}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center mt-3">
                <input
                  type="file"
                  name="imageInput"
                  id="slideShowInput"
                  accept="image/*"
                  onChange={handleSlideImageUpload}
                />
                <label htmlFor="slideShowInput" className="m-0">
                  <div className="mainBtn">Add picture</div>
                </label>
              </div>
            </div>
          </div>
          {/* Mobile Close Btn */}
          <div className="ModalCloseMobile" onClick={closeModal}>
            close
          </div>
        </div>
      </div>
    </>
  );
}

export default SlideShowModal;
