import React, { useState, useEffect } from "react";
import "./Global.scss";
import axios from "axios";
import Modal from "./Modal";
import Toast from "./Tosats";

const Connexion = ({ setToken }) => {
  const textRef = React.useRef();
  const [value] = React.useState();
  const [inputs, setInputs] = useState({});
  const [tokenValue, setTokenValue] = useState();
  const [showToast, setToast] = useState(false);
  const [infoText, setInfoText] = useState("");

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
  useEffect(() => setToken(tokenValue));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputs.Login || !inputs.Password) {
      setInfoText("INCORRECT CREDENTIALS: Incorrect Username or password ");
      setToast(true);
    } else {
      axios
        .post("https://Movies-api.onrender.com/users/login", inputs)

        .then((data) => {
          const tokenValue = {
            username: data.data.UserName,
            password: data.data.UserPassword,
            type: data.data.UserType
          };

          localStorage.setItem("token", JSON.stringify(tokenValue));

          setTokenValue(tokenValue);
        })
        .catch((er) => {
          if (er.response) {
            setInfoText(
              "INCORRECT CREDENTIALS: Incorrect Username or password "
            );

            if (er) setToast(true);
          } else if (er.request) {
            setInfoText(
              "INCORRECT CREDENTIALS: Incorrect Username or password "
            );

            if (er) setToast(true);
          } else if (er.message) {
            setInfoText(
              "INCORRECT CREDENTIALS: Incorrect Username or password "
            );

            if (er) setToast(true);
          }
        });
    }
  };

  console.log("showToast", showToast);
  return (
    <div className="second-block-contact">
      <div className="Right-Card-contact">
        <div className="Software-Presentation-contact">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-25">
                  <label>Login</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="fname"
                    name="Login"
                    value={inputs.Login || ""}
                    onChange={handleChange}
                    placeholder="Your Login.."
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Password</label>
                </div>
                <div className="col-75">
                  <input
                    autoComplete="on"
                    type="password"
                    id="password1"
                    name="Password"
                    value={inputs.Password || ""}
                    onChange={handleChange}
                    placeholder="Your last Password.."
                  ></input>
                </div>
              </div>{" "}
              <div className="row">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary "
                ></input>
              </div>
            </form>
          </div>

          <div className="row">
            <Modal></Modal>
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
};
export default Connexion;
//
