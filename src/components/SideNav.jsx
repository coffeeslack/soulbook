import React, { useState } from "react";
import "../css/sideNav.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdPeopleOutline, MdChatBubbleOutline } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { NavLink, Redirect } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import fb from "../config/config.jsx";

function SideNav(props) {
  const hideSideNav = () => {
    document.querySelector(".sideNavContainer").style.display = "none";
  };
  const [redirect, setRedirect] = useState(false);
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };
  const logOut = () => {
    fb.auth()
      .signOut()
      .then(localStorage.clear("loginDetail"));

    setRedirect(true);
  };
  return (
    <div className="sideNavContainer">
      {renderRedirect()}
      <div className="sideNavBlind" onClick={hideSideNav}></div>
      <div className="sideNavPane">
        <NavLink to="/">
          <div
            className={
              props.page === "home"
                ? "sideNavIconContainer selected"
                : "sideNavIconContainer"
            }
          >
            <div className="sidenavIcon">
              <AiOutlineHome />
            </div>
            <div className="sideNavIconLabel">Home</div>
          </div>
        </NavLink>
        <NavLink to="/soulsWon">
          <div
            className={
              props.page === "soulsWon"
                ? "sideNavIconContainer selected"
                : "sideNavIconContainer"
            }
          >
            <div className="sidenavIcon">
              <MdPeopleOutline />
            </div>
            <div className="sideNavIconLabel">Souls won</div>
          </div>
        </NavLink>
        <NavLink to="/testimonies">
          <div
            className={
              props.page === "testimonies"
                ? "sideNavIconContainer selected"
                : "sideNavIconContainer"
            }
          >
            <div className="sidenavIcon">
              <MdChatBubbleOutline />
            </div>
            <div className="sideNavIconLabel">Testimonies</div>
          </div>
        </NavLink>
        {/* <NavLink to="/foundationClass">
          <div
            className={
              props.page === "foundationClass"
                ? "sideNavIconContainer selected"
                : "sideNavIconContainer"
            }
            style={{
              display:
                props.accountType && props.accountType === "member" && "none"
            }}
          >
            <div className="sidenavIcon">
              <FiBook />
            </div>
            <div className="sideNavIconLabel">Foundation class</div>
          </div>
        </NavLink> */}
        <NavLink to="/members">
          <div
            className={
              props.page === "members"
                ? "sideNavIconContainer selected"
                : "sideNavIconContainer"
            }
            style={{
              display:
                props.accountType && props.accountType === "member" && "none"
            }}
          >
            <div className="sidenavIcon">
              <MdPeopleOutline />
            </div>
            <div className="sideNavIconLabel">Members</div>
          </div>
        </NavLink>
        <NavLink to="/homeCell">
          <div
            className={
              props.page === "homecell"
                ? "sideNavIconContainer selected"
                : "sideNavIconContainer"
            }
          >
            <div className="sidenavIcon">
              <GoHome />
            </div>
            <div className="sideNavIconLabel">Homecell</div>
          </div>
        </NavLink>
        <div className="sideNavIconContainer sideNavLogOutBtn" onClick={logOut}>
          <div className="sidenavIcon">
            <IoMdLogOut />
          </div>
          <div className="sideNavIconLabel">Log Out</div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
