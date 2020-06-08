import React, { useState } from "react";
import "../css/profileEditForm.css";
import { MdClose } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import firebase from "firebase/app";
import "firebase/storage";
import AlertBox from "./AlertBox";
import profilePic from "../pics/pic1.png";

function ProfileEditForm(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEditProfile = (e) => {
    e.preventDefault();
    const form = document.querySelector("form.profileEditForm");
    const profile = {
      userName: form.userName.value,
      address: form.address.value,
      satelliteChurch: form.satelliteChurch.value,
      profilePic: imageUrl,
      phoneNumber: form.phoneNumber.value,
      country: form.country.value,
      state: form.state.value,
      occupation: form.occupation.value,
      busStop: form.busStop.value,
      gender: form.gender.value,
      serviceGroup: form.serviceGroup.value,
    };
    props.editProfile(profile);
    setAlertMessage(`saved`);
    setTimeout(() => setAlertMessage(null), 2000);
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      const uploadTask = firebase
        .storage()
        .ref(`images/${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setAlertMessage(`uploading image...(${progress}%)`);
        },
        (error) => {
          console.log(error);
          setAlertMessage(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setAlertMessage(null);
            setImageUrl(url);
            const profile = {
              userName: props.name,
              address: props.address,
              satelliteChurch: props.satelliteChurch,
              profilePic: url,
              phoneNumber: props.phoneNumber,
              occupation: props.occupation,
              busStop: props.busStop,
              gender: props.gender,
              serviceGroup: props.serviceGroup,
            };
            props.editProfile(profile);
          });
        }
      );
    }
    previewProfileImage(e.target.files[0]);
  };
  const previewProfileImage = (img) => {
    var reader = new FileReader();
    var imageField = document.getElementById("profile-image-field");

    reader.onload = () => {
      if (reader.readyState === 2) {
        imageField.src = reader.result;
      }
    };
    reader.readAsDataURL(img);
  };

  return (
    <div className="Modal">
      <div className="ModalBlind" onClick={props.closeForm}></div>
      <div className="ModalContainer profileModalContainer">
        {/* Header */}
        <div className="ModalHeader m-0">
          <span className="ModalTitle">Edit Profile</span>
          <div className="ModalCloseBtn" onClick={props.closeForm}>
            <MdClose />
          </div>
        </div>
        {/* Main content */}
        <div className="ModalBody profileModalBody">
          <form className="profileEditForm" onSubmit={handleEditProfile}>
            <div style={{ display: !alertMessage && "none" }}>
              <AlertBox message={alertMessage} />
            </div>
            {/* profile image input */}
            <input
              type="file"
              name="imageInput"
              id="profileImageInput"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
            {/* profile image */}
            <div className="profileEditPicContainer">
              <img
                src={props.profilePic ? props.profilePic : profilePic}
                alt="profilePic"
                id="profile-image-field"
              />
              <label htmlFor="profileImageInput">
                <div
                  className="profileEditFormEditBtnContainer"
                  title="change profile picture"
                >
                  <FaRegImage className="profileEditFormEditBtn" />
                </div>
              </label>
            </div>
            {/* profile details */}
            <div className="profileDetailsContainer  row no-gutters">
              {/* profile name */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">name</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="userName"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.name}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* profile address */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">address</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="address"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.address}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* phone number */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  {" "}
                  <div className="profileEitFormLInputLabel">phone number</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="phoneNumber"
                      className="profileEditFormInputBox"
                      type="number"
                      defaultValue={props.phoneNumber}
                      maxLength="11"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* country */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">country</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="country"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.country}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* state */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">state</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="state"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.state}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* satellite church */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">
                    satellite church
                  </div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="satelliteChurch"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.satelliteChurch}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* occupation */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">occupation</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="occupation"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.occupation}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* bus stop */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">bus stop</div>
                  <div className="profileEditFormInputBoxContainer">
                    <input
                      name="busStop"
                      className="profileEditFormInputBox"
                      type="text"
                      defaultValue={props.busStop}
                    />
                  </div>
                </div>
              </div>
              {/* gender */}
              <div className="profileDetailContainer col-12">
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">gender</div>
                  <div className="profileEditFormInputBoxContainer">
                    <select
                      name="gender"
                      className="profileEditFormInputBox"
                      defaultValue={props.gender}
                    >
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="profileDetailContainer col-12"
                style={{ display: props.accountType === "admin" && "none" }}
              >
                <div className="profileDetail">
                  <div className="profileEitFormLInputLabel">service group</div>
                  <div className="profileEditFormInputBoxContainer">
                    <select
                      name="serviceGroup"
                      className="profileEditFormInputBox"
                      defaultValue="props.serviceGroup"
                    >
                      <option value="none">None</option>
                      <option value="childrenMinistry">
                        Children Ministry
                      </option>
                      <option value="specialCare">Special Care</option>
                      <option value="miracleSquad">Miracle Squad</option>
                      <option value="prayerSquad">Prayer Squad</option>
                      <option value="crowdControl">Crowd Control</option>
                      <option value="transport">Transport</option>
                      <option value="safety">Safety</option>
                      <option value="decoration">Decoration</option>
                      <option value="praise">Praise</option>
                      <option value="peaceKeepers">Peace Keepers</option>
                      <option value="medical">Medical</option>
                      <option value="editorial">Editorial</option>
                      <option value="technical">Technical</option>
                      <option value="sanctuary">Sanctuary</option>
                      <option value="ushering">Ushering</option>
                      <option value="soul establishment">
                        Soul Establishment
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button className="mainBtn">Save</button>
          </form>
        </div>
      </div>
      {/* Mobile Close Btn */}
      <div className="ModalCloseMobile" onClick={props.closeForm}>
        close
      </div>
    </div>
  );
}

export default ProfileEditForm;
