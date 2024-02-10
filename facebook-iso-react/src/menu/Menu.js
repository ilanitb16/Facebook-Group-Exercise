import "./Menu.css";
import { useState } from "react";
import React from 'react';

function Menu({toggleTheme, setNewPostInput}) {

  const [mode, setMode] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="menu col-2 vh-100">
      <div>
        <h1>
          <font color="blue">
            <b>facebook</b>
          </font>
        </h1>
      </div>

      <ul className="list-group">
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="home w-100 m-1 ms-3" onClick={handleScrollToTop}>
              <i className="bi bi-house-fill"></i>
              <label>
                <div className="textMenu">Home</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
          <span className="newPost w-100 m-1 ms-3" onClick={() => {setNewPostInput(true);handleScrollToTop()}}>
              <i className="bi bi-plus-circle-fill"></i>
              <label>
                <div className="textMenu">New Post</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myAccount w-100 m-1 ms-3">
              <i class="bi bi-person-circle"></i>
              <label>
                <div className="textMenu">My account</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myAccount w-100 m-1 ms-3">
            <i class="bi bi-box-arrow-right"></i>
              <label>
                <div className="textMenu">Log out</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
          <span className="myAccount w-100 m-1 ms-3" onClick={() => { toggleTheme(); setMode(!mode); }}>
            <i
          className={`bi bi-toggle-${mode ? "on" : "off"}`}
        ></i>
              <label>
                <div className="textMenu">change mode</div>
              </label>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
