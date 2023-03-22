import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Contact from "./Contact";
import MyList from "./MyList";
import Register from "./Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import App from "./App";
import Connexion from "./Connexion";
const Navbar = () => {
  var tokenString = localStorage.getItem("token");
  var userToken = JSON.parse(tokenString);
  const [token, setToken] = useState(null);
  useEffect(() => {
    !token && setToken();
    !token && localStorage.removeItem("token");
  }, [token]);

  if (!userToken && !token) {
    return <Connexion setToken={setToken} />;
  }
  function handelDeconnect() {
    localStorage.removeItem("token");
    setToken(null);
  }
  const Admin = userToken && userToken?.type === "Admin" ? true : false;
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="_blank">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <Link className="nav-link active" to="/">
                  Videos
                </Link>
              </li>

              {Admin && (
                <li className="nav-item active">
                  <Link className="nav-link active" to="/App">
                    Edit
                  </Link>
                </li>
              )}

              {Admin && (
                <li className="nav-item active">
                  <Link className="nav-link active" to="/Register">
                    Register
                  </Link>
                </li>
              )}

              {!Admin && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/Contact">
                    Contact
                  </Link>
                </li>
              )}
              <li>
                {" "}
                <button
                  onClick={() => handelDeconnect()}
                  className="nav-link active"
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {" "}
                  <p className="nav-link active">Déconnexion</p>
                </button>
              </li>
            </ul>

            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>

        <div className="container-fluid">
          <Routes>
            <Route path="/" exact element={<MyList />} />
            <Route path="/Connexion" exact element={<Connexion />} />
            {Admin && <Route path="/Register" element={<Register />} />}
            {Admin && <Route path="/App" element={<App />}></Route>}
            <Route path="/Contact" element={<Contact />} />
            <Route path="/redirect" element={<Navigate to="/Contact" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Navbar;
