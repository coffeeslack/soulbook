import React, { useState } from "react";
import "../css/testimonyForm.css";
import "../css/modal.css";
import { IoMdCloseCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import placeholder from "../pics/profilePic.png";
import { AiOutlinePlusCircle } from "react-icons/ai";

function TestimonyForm(props) {
  const [images, setImages] = useState([]);
  const createTestimony = (e) => {
    e.preventDefault();
    const title = document.querySelector("input.testimonyFormTitle");
    const text = document.querySelector("textarea.testimonyFormText");
    const name = document.querySelector("input.inputName");
    const testimony = {
      id: uuidv4(),
      userId: props.id,
      title: title.value,
      text: text.value,
      userName: name.value,
      satelliteChurch: props.satelliteChurch,
      createdAt: new Date(),
      images: [...images],
    };
    props.createTestimony(testimony);
    props.closeModal();
    setImages([]);
    title.value = "";
    text.value = "";
  };
  const addImage = () => {
    setImages((prevState) => [...prevState, { src: placeholder }]);
  };
  // const uploadAttachment = (e) => {
  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];

  //     const uploadTask = firebase
  //       .storage()
  //       .ref(`images/${image.name}`)
  //       .put(image);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setAlertMessage(`uploading image...(${progress})%`);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //           setAlertMessage(null);
  //           setImageUrl(url);
  //           const profile = {
  //             userName: props.name,
  //             address: props.address,
  //             satelliteChurch: props.satelliteChurch,
  //             profilePic: url,
  //             phoneNumber: props.phoneNumber,
  //             occupation: props.occupation,
  //             busStop: props.busStop,
  //             gender: props.gender,
  //             serviceGroup: props.serviceGroup,
  //           };
  //           props.editProfile(profile);
  //         });
  //       }
  //     );
  //   }
  //   previewAttachment(e.target.files[0]);
  // };
  // const previewAttachment = img => {
  //   var reader = new FileReader();
  //   var imageField = document.getElementById("profile-image-field");

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       imageField.src = reader.result;
  //     }
  //   };
  //   reader.readAsDataURL(img);
  // };

  return (
    <div className="Modal row">
      {/* Modal Backdrop */}
      <div className="ModalBlind"></div>
      {/* Modal Content */}
      <div className="ModalContainer col-lg-6">
        {/* Modal Header */}
        <div className="ModalHeader">
          <span className="ModalTitle">Add Testimony</span>
          <div
            className="ModalCloseBtn"
            onClick={() => {
              props.closeModal();
              setImages([]);
            }}
          >
            <IoMdCloseCircle />
          </div>
        </div>
        {/* Main Modal content */}
        <div className="ModalBody">
          <form onSubmit={createTestimony} className="row no-gutters">
            {/*  */}
            <div className="col-md-6 pr-md-3">
              {/* Name */}
              <div className="testimonyFormInputLabel">Name</div>
              <input
                type="text"
                name="name"
                className="testimonyFormInput inputName"
                defaultValue={props.name}
                readOnly={props.accountType && props.accountType === "member"}
              />
            </div>
            {/* Testimony Title */}
            <div className="col-md-6">
              <div className="testimonyFormInputLabel">Testimony title</div>
              <input
                type="text"
                name="testimonyTitle"
                className="testimonyFormInput testimonyFormTitle"
                placeholder="e.g divine breakthrough (optional)"
              />
            </div>
            {/*  */}
            {/* Testimony Content */}
            <div className="col-12">
              <div className="testimonyFormInputLabel">Testimony</div>
              <textarea
                name="testimony"
                className="testimonyFormTextArea testimonyFormText"
                required
              />
            </div>
            <div className="col-12">
              {/* Testimony Images */}
              <div className="testimonyFormInputLabel">Testimony Images</div>
              {/* Attached Images */}
              <div className="testimonyAttachmentContainer row ">
                {images.map((image, i) => (
                  <div
                    className="testimonyAttachmentWrapper col-md-2 col-4"
                    key={i}
                  >
                    <div className="testimonyAttachmentImage">
                      <img src={image.src} />
                    </div>
                  </div>
                ))}
                {/* Add Image Button */}
                <div className="testimonyAttachmentWrapper col-md-2 col-4">
                  <div
                    className="testimonyAttachmentImage testimonyAttachmentBtn"
                    onClick={addImage}
                  >
                    <AiOutlinePlusCircle />
                    <div>Add Image</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Send Button */}
            <button className="mainBtn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TestimonyForm;
