import React from "react";
import "./items.scss";
import "./items.scss";
import { Player } from "video-react";
function Items(props) {
  const { items, type, removeHandler } = props;
  const Admin = type === "Admin" ? true : false;
  return (
    <div className="boxItems">
      <div>
        <ol>
          {items.map((data, index) => (
            <li key={index} className="listVideos">
              <div className="videoBoxs">
                <Player>
                  <source
                    src={
                      data.Url !== undefined
                        ? data.Url
                        : "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    }
                  />
                </Player>
                <div className="list-group">
                  <a
                    href="_blank"
                    className="list-group-item list-group-item-action flex-column align-items-start active"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h3 className="mb-1">NAME: </h3>
                      <h5> {data.Name}</h5>
                    </div>
                  </a>
                  <a
                    href="_blank"
                    className="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1"> Description: </h5>
                    </div>
                    <p className="mb-1">{data.Description}</p>
                  </a>
                </div>
                {Admin && (
                  <button
                    onClick={() => removeHandler(data.Name)}
                    className="buttonDel btn btn-secondary"
                  >
                    <span role="img" aria-label="remove">
                      ❌
                    </span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export default Items;
