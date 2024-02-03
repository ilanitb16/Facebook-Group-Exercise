import "./PostItem.css";
import React, { useState } from "react";
import Social from "./social/Social";
import EditPost from "./EditPost";


function PostItem({ postList, setPostList, title, author, description, date, author_photo, img}) {
  return (
    <div className="row post">
      <div className="col-5"></div>
      <div className="col-6 main-content">
        <div className="card" href="details.html">
          <div className="row top-card">
            <div className="col-9">
              <p className="card-author">
                <img src={author_photo} className="img-profile" alt="..." />
                <b>{"@" + author}</b>
                {" " + date}
              </p>
            </div>
            <EditPost title={title} postList={postList} setPostList={setPostList}/>
          </div>
          <img src={img} className="card-img" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <Social />
        </div>
      </div>
    </div>
  );
}
export default PostItem;
