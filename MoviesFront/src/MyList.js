import React, { useState, useEffect } from "react";
import Items from "./items";
import axios from "axios";
import "./MyList.scss";

function MyList() {
  const [items, setItems] = useState([]);
  //var tokenString = localStorage.getItem("token");

  useEffect(() => {
    // var tokenString = localStorage.getItem("token");
    // var userToken = JSON.parse(tokenString);
  });

  useEffect(() => {
    axios
      .get("https://Movies-api.onrender.com/users/findVideo")
      .then((data) => {
        setItems(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="TitleList">
            <h1>Welcome To my Videos List</h1>
            <p>
              {" "}
              You can share video files online for free using tools like
              WeTransfer, Dropbox, and Google Drive. But if you need to review
              your videos with teammates and stakeholders, you're better off
              with VideoSahre".
            </p>
          </div>

          {
            <Items
              items={items}
              removeHandler={(index) =>
                setItems((items) => items.filter((_, idx) => idx !== index))
              }
            />
          }
        </div>
      </div>
    </>
  );
}

export default MyList;
/* */
