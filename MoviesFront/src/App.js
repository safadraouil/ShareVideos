import React, { useEffect, useState } from "react";

import axios from "axios";
import Items from "./items";
import { useForm } from "react-hook-form";

import "./App.scss";

function App() {
  const { register, handleSubmit } = useForm();
  const [item, setItem] = useState();
  const [items, setItems] = useState([]);
  var userToken = JSON.parse(localStorage.getItem("token"));
  const handleRemove = (items) => {
    axios
      .delete("https://Movies-api.onrender.com/users/removeVideo", {
        Name: items
      })
      .then((res) => console.log("OK"))
      .catch((err) => console.error(err));
  };
  const onSubmit = (data) => {
    axios
      .post("https://Movies-api.onrender.com/users/createVideo", data)
      .then((data) => {
        setItem(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    let timer = "";
    axios
      .get("https://Movies-api.onrender.com/users/findVideo")
      .then((data) => {
        timer = setTimeout(() => {
          setItems(data.data);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      clearTimeout(timer);
    };
  }, [item, items]);
  return (
    <>
      <div>
        <div className="Card">
          <div className="Titl col-form-label">
            <h1>Edit Videos List</h1>
          </div>
          <form className="Formscard" onSubmit={handleSubmit(onSubmit)}>
            <div className="List">
              <div className="form-group">
                <label className="col-form-label Labels" htmlFor="inputDefault">
                  Name
                </label>
                <input
                  className="Inputs form-control"
                  name="Name"
                  ref={register({
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i
                  })}
                  type="text"
                  placeholder="input Name"
                  id="inputDefault"
                />
              </div>
              <div className="List">
                <div className="form-group">
                  <label className="Labels" htmlFor="exampleTextarea">
                    Description
                  </label>
                  <textarea
                    className="Textareas form-control"
                    name="Description"
                    ref={register({
                      required: true
                    })}
                    id="exampleTextarea"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="List">
                <div className="form-group">
                  <label
                    className="col-form-label Labels"
                    htmlFor="inputDefault"
                  >
                    Url
                  </label>
                  <input
                    className="form-control Inputs"
                    name="Url"
                    ref={register({ required: true })}
                    type="text"
                    placeholder="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    id="inputDefault"
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary Buttons">
                  {" "}
                  ✅
                </button>
              </div>
            </div>
          </form>
          {
            <Items
              items={items}
              type={userToken.type}
              removeHandler={(dataa) => handleRemove(dataa)}
            />
          }
        </div>
      </div>
    </>
  );
}

export default App;
