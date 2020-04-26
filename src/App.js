import React, { Component } from "react";
import AppRouter from "./routes/AppRouter";
import "./css/App.css";
import moment from "moment";
import fb from "./config/config.jsx";
import firebase from "firebase/app";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.checkData();
        this.checkSlideShowPics();
      } else {
        this.setState({ user: null });
      }
    });
  }

  checkData = () => {
    firebase
      .firestore()
      .collection("members")
      .get()
      .then((data) =>
        data.forEach((member) => {
          if (member.data().id === this.state.user.uid) {
            this.setState((prevState) => ({
              ...prevState,
              ...member.data(),
              loading: false,
            }));
            this.checkSoulsWon();
            this.checkNotifications();
            this.checkTestimonies();
          }
        })
      );
  };
  checkSlideShowPics = () => {
    firebase
      .firestore()
      .collection("slideShowPics")
      .get()
      .then((data) => {
        let slideShowPics = [];
        data.forEach((pic) => {
          slideShowPics.push({ ...pic.data() });
        });
        slideShowPics.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        this.setState((prevState) => ({
          ...prevState,
          slideShowPics,
        }));
      });
  };
  checkNotifications = () => {
    firebase
      .firestore()
      .collection("notifications")
      .get()
      .then((data) => {
        let notifications = [];
        data.forEach((notification) => {
          if (
            notification.data().from.toLowerCase() ===
              this.state.satelliteChurch.toLowerCase() ||
            notification.data().from.toLowerCase() === "headquarters"
          ) {
            notifications.push({ ...notification.data() });
          }
        });
        notifications.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        this.setState((prevState) => ({
          ...prevState,
          notifications,
        }));
      });
  };
  checkSoulsWon = () => {
    firebase
      .firestore()
      .collection("soulsWon")
      .get()
      .then((data) => {
        let soulsWon = [];
        data.forEach((soul) => {
          soulsWon.push({ ...soul.data() });
        });
        this.setState((prevState) => ({
          ...prevState,
          soulsWon,
        }));
        this.checkMembers();
      });
  };
  checkTestimonies = () => {
    firebase
      .firestore()
      .collection("testimonies")
      .get()
      .then((data) => {
        let testimonies = [];
        data.forEach((testimony) => {
          testimonies.push({ ...testimony.data() });
        });
        this.setState((prevState) => ({
          ...prevState,
          testimonies,
        }));
      });
  };
  checkMembers = () => {
    firebase
      .firestore()
      .collection("members")
      .get()
      .then((data) => {
        let members = [];
        data.forEach((member) => {
          members.push({ ...member.data(), soulsWon: 0 });
        });
        members.map((member) => {
          this.state.soulsWon.map((soul) => {
            if (soul.wonBy === member.id) {
              member.soulsWon += 1;
            }
          });
        });
        this.setState((prevState) => ({
          ...prevState,
          members,
        }));
      });
  };
  addNotification = (notification) => {
    firebase
      .firestore()
      .collection("notifications")
      .doc(`${notification.id}`)
      .set(notification)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          notifications: [
            { ...notification, createdAt: moment() },
            ...prevState.notifications,
          ],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteNotification = (id) => {
    if (this.state.accountType !== "member") {
      firebase
        .firestore()
        .collection("notifications")
        .doc(`${id}`)
        .delete()
        .then(
          this.setState((prevState) => ({
            ...prevState,
            notifications: prevState.notifications.filter(
              (notification) => notification.id !== id
            ),
          }))
        )
        .catch((error) => console.log(error));
    }
  };
  addSoul = (soul) => {
    firebase
      .firestore()
      .collection("soulsWon")
      .doc(`${soul.id}`)
      .set(soul)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          soulsWon: [{ ...soul, createdAt: moment() }, ...prevState.soulsWon],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteSoul = (id) => {
    firebase
      .firestore()
      .collection("soulsWon")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          soulsWon: prevState.soulsWon.filter((soul) => soul.id !== id),
        }))
      )
      .catch((error) => console.log(error));
  };
  addTestimony = (testimony) => {
    firebase
      .firestore()
      .collection("testimonies")
      .doc(`${testimony.id}`)
      .set(testimony)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          testimonies: [
            { ...testimony, createdAt: moment() },
            ...prevState.testimonies,
          ],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteTestimony = (id) => {
    firebase
      .firestore()
      .collection("testimonies")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          testimonies: prevState.testimonies.filter(
            (testimony) => testimony.id !== id
          ),
        }))
      )
      .catch((error) => console.log(error));
  };
  addSlidePic = (pic) => {
    firebase
      .firestore()
      .collection("slideShowPics")
      .doc(`${pic.id}`)
      .set(pic)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          slideShowPics: [
            ...prevState.slideShowPics,
            { ...pic, createdAt: moment() },
          ],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteSlidePic = (id) => {
    firebase
      .firestore()
      .collection("slideShowPics")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          slideShowPics: prevState.slideShowPics.filter((pic) => pic.id !== id),
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteMember = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      members: prevState.members.filter((member) => member.id !== id),
    }));
  };
  editProfile = (profile) => {
    firebase
      .firestore()
      .collection("members")
      .doc(`${this.state.id}`)
      .update({
        name: profile.userName,
        address: profile.address,
        satelliteChurch: profile.satelliteChurch,
        profilePic: profile.profilePic,
        phoneNumber: profile.phoneNumber,
        occupation: profile.occupation,
        busStop: profile.busStop,
        gender: profile.gender,
        serviceGroup: profile.serviceGroup,
      })
      .then(
        this.setState((prevState) => ({
          ...prevState,
          name: profile.userName,
          address: profile.address,
          satelliteChurch: profile.satelliteChurch,
          profilePic: profile.profilePic,
          phoneNumber: profile.phoneNumber,
          occupation: profile.occupation,
          busStop: profile.busStop,
          gender: profile.gender,
          serviceGroup: profile.serviceGroup,
        }))
      )
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <AppRouter
          {...this.state}
          deleteNotification={this.deleteNotification}
          deleteSlidePic={this.deleteSlidePic}
          deleteTestimony={this.deleteTestimony}
          createNotification={this.addNotification}
          createTestimony={this.addTestimony}
          addSoul={this.addSoul}
          deleteSoul={this.deleteSoul}
          deleteMember={this.deleteMember}
          editProfile={this.editProfile}
          checkData={this.checkData}
          addSlidePic={this.addSlidePic}
          checkData={this.checkData}
        />
      </div>
    );
  }
}
