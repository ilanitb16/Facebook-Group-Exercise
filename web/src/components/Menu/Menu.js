import React from 'react';
import { useState } from "react";
import { useUser } from '../../providers/user_context';
import { useNavigate, Link } from "react-router-dom";

function Menu({toggleTheme, setNewPostInput, friendsList, setFriendsList}) {
  const [user, setUser] = useUser();
  const [mode, setMode] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const navigate = useNavigate()
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const logout = ()=> {
    navigate("/login");
  }

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
              <i className="bi bi-person-circle"></i>
              <label>
                <div className="textMenu">My account</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="logOut w-100 m-1 ms-3" onClick={() => { logout();}}>
            <i className="bi bi-box-arrow-right"></i>
              <label>
                <div className="textMenu">Log out</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
          <span className="ChangeTheme w-100 m-1 ms-3" onClick={() => { toggleTheme(); setMode(!mode); }}>
            <i
          className={`bi bi-toggle-${mode ? "on" : "off"}`}
        ></i>
              <label>
                <div className="textMenu">Change Mode</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myFriends w-100 m-1 ms-3" onClick={() => setShowFriends(!showFriends)}>
            <i className="bi bi-people-fill"></i>
              <label>
                <div className="textMenu">My friends</div>
              </label>
            </span>
          </div>
        </li>
      </ul>
      {showFriends && (
        <div>
          <div><label></label></div>
          <div><label></label></div>
          <h3>Friends</h3>
          <ul>
            {friendsList.map((friend, index) => (
              <li key={index}>{friend}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
