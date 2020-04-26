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
import fb from "../config/config.jsx";
import profilePic from "../pics/pic1.png";
import AlertBox from "../components/AlertBox";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";

function SignUpForm(props) {
  const [alertMessage, setAlertMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    accountType: "member",
    createdAt: new Date(),
    name: "",
    address: "",
    satelliteChurch: "odili road",
    profilePic: "",
    phoneNumber: "",
    occupation: "",
    country: "Nigeria",
    state: "Rivers state",
    busStop: "",
    gender: "male",
    serviceGroup: "none"
  });

  const handleRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = e => {
    let detail = { [e.target.name]: e.target.value };
    setUser(prevState => ({ ...prevState, ...detail }));
  };

  const signUp = e => {
    e.preventDefault();
    fb.auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then(data => {
        const profile = {
          id: data.user.uid,
          ...user
        };

        firebase
          .firestore()
          .collection("members")
          .doc(`${data.user.uid}`)
          .set(profile)
          .then(props.checkData())
          .catch(error => console.log(error));

        setRedirect(true);
      })
      .catch(error => {
        console.log(error);
        setAlertMessage(error.message);
        setTimeout(() => setAlertMessage(null), 5000);
      });
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
          setAlertMessage(error.message);
          setTimeout(() => setAlertMessage(null), 5000);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            setTimeout(() => setAlertMessage(null), 1000);
            setUser(prevState => ({ ...prevState, profilePic: url }));
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
      {handleRedirect()}
      <div className="profileEditModalBlind"></div>
      <div className="profileEditModalContainer">
        <div style={{ display: !alertMessage && "none" }}>
          <AlertBox message={alertMessage} />
        </div>
        <form className="profileEditForm" onSubmit={signUp}>
          <input
            type="file"
            name="imageInput"
            id="profileImageInput"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <div className="profileEditPicContainer">
            <img src={profilePic} alt="profilePic" id="profile-image-field" />
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
                <div className="profileEitFormLInputLabel">Name</div>
                <div className="profileEditFormInputBoxContainer">
                  <input
                    name="name"
                    className="profileEditFormInputBox"
                    type="text"
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">Address</div>
                <div className="profileEditFormInputBoxContainer">
                  <input
                    name="address"
                    className="profileEditFormInputBox"
                    type="text"
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">Phone number</div>
                <div className="profileEditFormInputBoxContainer">
                  <input
                    name="phoneNumber"
                    className="profileEditFormInputBox"
                    type="number"
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">Country</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    defaultValue="Nigeria"
                    name="country"
                    className="profileEditFormInputBox"
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">State</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    defaultValue="Rivers state"
                    name="state"
                    className="profileEditFormInputBox"
                    onChange={handleChange}
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
                  Satellite church
                </div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    defaultValue="odili road"
                    name="satelliteChurch"
                    className="profileEditFormInputBox"
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">Occupation</div>
                <div className="profileEditFormInputBoxContainer">
                  <input
                    name="occupation"
                    className="profileEditFormInputBox"
                    type="text"
                    required
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">Bus stop</div>
                <div className="profileEditFormInputBoxContainer">
                  <input
                    name="busStop"
                    className="profileEditFormInputBox"
                    type="text"
                    onChange={handleChange}
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
                <div className="profileEitFormLInputLabel">Gender</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    name="gender"
                    defaultValue="male"
                    className="profileEditFormInputBox"
                    onChange={handleChange}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdMyLocation />
              </div>
              <div className="profileDetail">
                {" "}
                <div className="profileEitFormLInputLabel">Service group</div>
                <div className="profileEditFormInputBoxContainer">
                  <select
                    name="serviceGroup"
                    className="profileEditFormInputBox"
                    onChange={handleChange}
                    defaultValue="none"
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
          <button className="profileEditFormSaveBtn">sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
