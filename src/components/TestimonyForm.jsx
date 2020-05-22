import React from "react";
import "../css/testimonyForm.css";
import { IoMdCloseCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

function TestimonyForm(props) {
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
    };
    props.createTestimony(testimony);
    props.hideTestimonyForm();
    title.value = "";
    text.value = "";
  };
  return (
    <div className="testimonyFormContainer">
      <div className="testimonyForm">
        <div className="testimonyFormHeader">
          <span>Give Testimony</span>
          <span
            className="testimonyFormCloseBtn"
            onClick={props.hideTestimonyForm}
          >
            <IoMdCloseCircle />
          </span>
        </div>
        <div className="testimonyFormBody">
          <form onSubmit={createTestimony}>
            <div className="testimonyFormInputLabel">Name</div>
            <input
              type="text"
              name="name"
              className="testimonyFormInput inputName"
              defaultValue={props.name}
              readOnly={props.accountType && props.accountType === "member"}
            />
            <div className="testimonyFormInputLabel">Satellite Church</div>
            <input
              type="text"
              name="satelliteChurch"
              className="testimonyFormInput"
              value={props.satelliteChurch}
              readOnly
            />
            <div className="testimonyFormInputLabel">Testimony title</div>
            <input
              type="text"
              name="testimonyTitle"
              className="testimonyFormInput testimonyFormTitle"
              placeholder="e.g Testimony on Healing from cancer..."
            />
            <div className="testimonyFormInputLabel">Testimony</div>
            <textarea
              name="testimony"
              className="testimonyFormTextArea testimonyFormText"
              required
            />
            <button className="testimonyFormBtn">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TestimonyForm;
