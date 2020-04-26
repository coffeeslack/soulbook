import React from "react";
import "../css/slideshow.css";
import {
  MdEdit,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from "react-icons/md";
import SlideShowModal from "../components/SlideShowModal";

function SlideShow(props) {
  const openModal = () => {
    document.querySelector(".slideShowModal").style.display = "flex";
  };
  let slideIndex = 0;
  const nextSlide = num => {
    slideIndex += num;
    if (props.slideShowPics && slideIndex > props.slideShowPics.length - 1) {
      slideIndex = 0;
    }
    if (slideIndex < 0) {
      slideIndex = props.slideShowPics && props.slideShowPics.length - 1;
    }
    const images = document.querySelectorAll(".slideShowImage");
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = "none";
      images[slideIndex].style.display = "inline-block";
    }
  };

  const carousel = () => {
    if (props.slideShowPics && props.slideShowPics.length > 1) {
      nextSlide(1);
      setTimeout(carousel, 10000);
    }
  };
  carousel();
  return (
    <div className="slideShowContainer">
      <div className="slideShowImageContainer">
        {props.slideShowPics &&
          props.slideShowPics.map((pic, i) => (
            <img
              key={i}
              src={pic.src}
              alt="banner"
              className="slideShowImage"
            />
          ))}
      </div>
      <div
        className="slideShowEditBtn"
        onClick={openModal}
        style={{ display: props.accountType === "member" && "none" }}
      >
        <MdEdit />
      </div>
      <div
        className="slideShowBtnContainer"
        style={{
          display:
            props.slideShowPics && props.slideShowPics.length === 1 && "none"
        }}
      >
        <div className="slideShowNextBtn" onClick={() => nextSlide(1)}>
          <MdKeyboardArrowRight />
        </div>
        <div className="slideShowPrevBtn" onClick={() => nextSlide(-1)}>
          <MdKeyboardArrowLeft />
        </div>
      </div>
      <SlideShowModal {...props} />
    </div>
  );
}

export default SlideShow;
