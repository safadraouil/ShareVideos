import React, { useState, useEffect } from "react";
import "./Global.scss";
import Toast from "./Tosats";
import axios from "axios";

export default function Register() {
  const textRef = React.useRef();
  const [value] = React.useState();
  const [showToast, setToast] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [value]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.id === "Telephone"
        ? parseInt(event.target.value)
        : event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !inputs.Login ||
      !inputs.Mail ||
      !inputs.Telephone ||
      !inputs.Type ||
      !inputs.UserName ||
      !inputs.country ||
      !inputs.password
    ) {
      setInfoText("DATA ENTRY : try to complete all informations ");
      setToast(true);
    } else {
      axios
        .post("https://Movies-api.onrender.com/users/register", inputs)

        .then(() => {
          console.log();
        })
        .catch((err) => {
          console.error(err);
        });
      setInputs({});
      setInfoText("SUCCESS : account create with success");
      setToast(true);
    }
  };
  return (
    <div className="second-block-contact">
      <div className="Right-Card-contact">
        <div className="Software-Presentation-contact">
          <div className="container-Register">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-25">
                  <label>Name</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="UserName"
                    name="UserName"
                    value={inputs.UserName || ""}
                    onChange={handleChange}
                    placeholder="Your Name.."
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Télephone</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="Telephone"
                    name="Telephone"
                    value={inputs.Telephone || ""}
                    onChange={handleChange}
                    placeholder="Your Télephone.."
                  ></input>
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label>Login</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="Login"
                    name="Login"
                    value={inputs.Login || ""}
                    onChange={handleChange}
                    placeholder="Your Login.."
                  ></input>
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label>E-Mail</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="Mail"
                    name="Mail"
                    value={inputs.Mail || ""}
                    onChange={handleChange}
                    placeholder="Your Mail.."
                  ></input>
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label>Password</label>
                </div>
                <div className="col-75">
                  <input
                    type="password"
                    autoComplete="on"
                    id="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    placeholder="Your password.."
                  ></input>
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label>Type</label>
                </div>
                <div className="col-75">
                  <select
                    id="Type"
                    name="Type"
                    value={inputs.Type || ""}
                    onChange={handleChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>
              </div>

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
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                ></input>
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
