import "./Social.css";
import React, { useState } from "react";
import Share from "./Share";
import Comment from "./Comment";



function Social({user_name, user_photo}) {
  
  const [likePressed, setLlikePressed] = useState(false);
  const [commentPressed, setCommentPressed] = useState(false);

  const handleClickLike = () => {
    setLlikePressed((pressed) => !pressed);
  };

  const handleClickComment = () => {
    setCommentPressed((pressed) => !pressed);
  };


  return (
    <div>
      <div className="icon social">
        <span className="likeButton">
          <i
            className={`bi bi-hand-thumbs-up${likePressed ? "-fill" : ""}`}
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={handleClickLike}
          ></i>
        </span>
        <span
        className="commentButton"
        onClick={() => {
          setCommentPressed(!commentPressed);
        }}
      >
        <i
          className={`bi bi-chat${commentPressed ? "-fill" : ""}`}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={handleClickComment}
        ></i>
      </span>
        <Share />
      </div>
      <div className="commentSection">
      <Comment commentPressed={commentPressed} user_name={user_name} user_photo={user_photo} />
      </div>
    </div>
  );
}
export default Social;
