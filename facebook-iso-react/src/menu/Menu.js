import "./Menu.css";
import img1 from "../postItem/img/img1.jpg";
import profile1 from "../postItem/profile/profile1.jpg";
import DarkMode from "../DarkMode/DarkMode.js";
import React from 'react';

function Menu({ setPostList, postList, toggleTheme, newPostInput, setNewPostInput}) {

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const addPost = () => {
    const newPost = {
      title: "another car",
      author: "noam leibovich",
      description: "car",
      date: "31/1/2024",
      author_photo: profile1,
      img: img1,
    };
    setPostList([...postList, newPost]);
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
          <span className="badge bg-primary rounded-pill">1</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
          <span className="newPost w-100 m-1 ms-3" onClick={() => {setNewPostInput(true);handleScrollToTop()}}>
              <i className="bi bi-plus-circle-fill"></i>
              <label>
                <div className="textMenu">New Post</div>
              </label>
            </span>
            <span className="badge bg-primary rounded-pill"></span>
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
          <span className="badge bg-primary rounded-pill"></span>
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
          <span className="badge bg-primary rounded-pill"></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <DarkMode toggleTheme={toggleTheme} />
        </li>
      </ul>
    </div>
  );
}

export default Menu;
