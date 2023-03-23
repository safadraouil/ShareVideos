import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "./Tosats";
import "./Global.scss";

export default function Contact() {
  const textRef = React.useRef();
  const [value] = React.useState();
  const [inputs, setInputs] = useState({});
  const [showToast, setToast] = useState(false);
  const [infoText, setInfoText] = useState("");
  //
  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [value]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputs.text || !inputs.country || !inputs.subject || !inputs.mail) {
      setInfoText("MISSING INFORMATION : there is one or more empty fields ");
      setToast(true);
    } else {
      axios
        .post("https://Movies-api.onrender.com/users/mail", inputs)
        .then((data) => console.log(data))
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className="second-block-contact">
      <div className="Right-Card-contact">
        <div className="Software-Presentation-contact">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-25">
                  <label>Mail</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="mail"
                    name="mail"
                    value={inputs.mail || ""}
                    onChange={handleChange}
                    placeholder="Your Mail.."
                  ></input>
                </div>
              </div>{" "}
              <div className="row">
                <div className="col-25">
                  <label>Country</label>
                </div>
                <div className="col-75">
                  <select
                    id="country"
                    name="country"
                    value={inputs.country || ""}
                    onChange={handleChange}
                  >
                    <option value="tunisia">Tunisia</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Subject</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={inputs.subject || ""}
                    onChange={handleChange}
                    placeholder="Your Subject.."
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Text</label>
                </div>

                <div className="col-75">
                  <textarea
                    id="text"
                    name="text"
                    placeholder="Write something.."
                    value={inputs.text || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <input type="submit" value="Submit"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="Left-Card-contact">
        {showToast && (
          <Toast show={showToast} setToast={setToast} text={infoText}></Toast>
        )}
      </div>
    </div>
  );
}
