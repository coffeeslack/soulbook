import React, { useState } from "react";
import "../css/profileEditForm.css";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBusinessCenter,
  MdMyLocation,
  MdClose,
  MdLocationCity,
  MdFlag
} from "react-icons/md";
import { FaTransgender, FaRegImage, FaChurch } from "react-icons/fa";
import firebase from "firebase/app";
import "firebase/storage";
import AlertBox from "./AlertBox";
import profilePic from "../pics/pic1.png";

function ProfileEditForm(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const handleEditProfile = e => {
    e.preventDefault();
    const form = document.querySelector("form.profileEditForm");
    const profile = {
      userName: form.userName.value,
      address: form.address.value,
      satelliteChurch: form.satelliteChurch.value,
      profilePic: imageUrl,
      phoneNumber: form.phoneNumber.value,
      occupation: form.occupation.value,
      busStop: form.busStop.value,
      gender: form.gender.value,
      serviceGroup: form.serviceGroup.value
    };
    props.editProfile(profile);
    setAlertMessage(`saved`);
    setTimeout(() => setAlertMessage(null), 1000);
  };

  const handleProfileImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      const uploadTask = firebase
        .storage()
        .ref(`images/${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setAlertMessage(`uploading image...(${progress})%`);
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
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
              serviceGroup: props.serviceGroup
            };
            props.editProfile(profile);
          });
        }
      );
    }
    previewProfileImage(e.target.files[0]);
  };
  const previewProfileImage = img => {
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
    <div className="profileEditFormContainer">
      <div className="profileEditModalBlind"></div>
      <div className="profileEditModalContainer">
        <form className="profileEditForm" onSubmit={handleEditProfile}>
          <div style={{ display: !alertMessage && "none" }}>
            <AlertBox message={alertMessage} />
          </div>
          <input
            type="file"
            name="imageInput"
            id="profileImageInput"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <div className="profileEditPicContainer">
            <img
              src={props.profilePic ? props.profilePic : profilePic}
              alt="profilePic"
              id="profile-image-field"
            />
            <div
              className="profileEditFormCloseBtnContainer"
              onClick={props.closeForm}
            >
              <MdClose className="profileEditFormCloseBtn" />
            </div>
            <label htmlFor="profileImageInput">
              <div className="profileEditFormEditBtnContainer">
                <FaRegImage className="profileEditFormEditBtn" />
              </div>
            </label>
          </div>
          <div className="profileDetailsContainer">
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdPerson />
              </div>
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
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdLocationOn />
              </div>
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
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdPhone />
              </div>
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
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdFlag />
              </div>
              <div className="profileDetail">
                {" "}
                <div className="profileEitFormLInputLabel">country</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    name="country"
                    className="profileEditFormInputBox"
                    defaultValue={props.country}
                  >
                    <option value="Nigeria">Nigeria</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdLocationCity />
              </div>
              <div className="profileDetail">
                {" "}
                <div className="profileEitFormLInputLabel">state</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    name="state"
                    className="profileEditFormInputBox"
                    defaultValue={props.state}
                  >
                    <option value="Rivers state">Rivers state</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <FaChurch />
              </div>
              <div className="profileDetail">
                {" "}
                <div className="profileEitFormLInputLabel">
                  satellite church
                </div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    name="satelliteChurch"
                    className="profileEditFormInputBox"
                    defaultValue={props.satelliteChurch}
                  >
                    <option value="odili road">Odili road</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdBusinessCenter />
              </div>
              <div className="profileDetail">
                {" "}
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
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdDirectionsBus />
              </div>
              <div className="profileDetail">
                {" "}
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
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <FaTransgender />
              </div>
              <div className="profileDetail">
                {" "}
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
              className="profileDetailContainer"
              style={{ display: props.accountType === "admin" && "none" }}
            >
              <div className="profileDetailIcon">
                <MdMyLocation />
              </div>
              <div className="profileDetail">
                {" "}
                <div className="profileEitFormLInputLabel">service group</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    name="serviceGroup"
                    className="profileEditFormInputBox"
                    defaultValue="props.serviceGroup"
                  >
                    <option value="none">None</option>
                    <option value="childrenMinistry">Children Ministry</option>
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
          <button className="profileEditFormSaveBtn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditForm;
