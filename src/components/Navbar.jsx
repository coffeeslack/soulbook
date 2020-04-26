import React from "react";
import "../css/navbar.css";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillPlusCircle,
  AiOutlinePlusCircle
} from "react-icons/ai";
import {
  MdPeopleOutline,
  MdPeople,
  MdChatBubbleOutline,
  MdChatBubble
} from "react-icons/md";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="navbarContainer">
      <NavLink to="/">
        <div className="navbarIconContainer">
          <div className="navIcon ">
            {props.page === "home" ? <AiFillHome /> : <AiOutlineHome />}
          </div>
          <div className="navIconLabel">Home</div>
        </div>
      </NavLink>
      <NavLink to="/soulsWon">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "soulsWon" ? <MdPeople /> : <MdPeopleOutline />}
          </div>
          <div className="navIconLabel">Souls won</div>
        </div>
      </NavLink>
      <NavLink to="/testimonies">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "testimonies" ? (
              <MdChatBubble />
            ) : (
              <MdChatBubbleOutline />
            )}
          </div>
          <div className="navIconLabel">Testimonies</div>
        </div>
      </NavLink>
      <NavLink to="/addSoul">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "addSoul" ? (
              <AiFillPlusCircle />
            ) : (
              <AiOutlinePlusCircle />
            )}
          </div>
          <div className="navIconLabel">Add soul</div>
        </div>
      </NavLink>
    </div>
  );
}

export default Navbar;
