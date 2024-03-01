import React, { useState } from "react";
import Share from "./Share";
import Comment from "./Comment";

function Social({ user_name, user_photo }) {
  const [likePressed, setLikePressed] = useState(false);
  const [commentPressed, setCommentPressed] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleClickLike = () => {
    setLikePressed((prevLikePressed) => !prevLikePressed);
    setLikesCount((prevLikesCount) => (likePressed ? prevLikesCount - 1 : prevLikesCount + 1));
  };

  const handleClickComment = () => {
    setCommentPressed((prevCommentPressed) => !prevCommentPressed);
  };

  return (
    <div className="social-container">
      <div className="icon social">
        <b className="likeCount">{likesCount}</b> 
        <span className="likeButton" onClick={handleClickLike}>
          <i
            className={`bi bi-hand-thumbs-up${likePressed ? "-fill" : ""}`}
            style={{ fontSize: "2rem", cursor: "pointer" }}
          ></i>
          {}
        </span>
        <span
          className="commentButton"
          onClick={() => {
            setCommentPressed((prevCommentPressed) => !prevCommentPressed);
          }}
        >
          <i
            className={`bi bi-chat${commentPressed ? "-fill" : ""}`}
            style={{ fontSize: "2rem", cursor: "pointer" }}
          ></i>
        </span>
        <Share />
      </div>
      <div className="commentSection">
        <Comment
          commentPressed={commentPressed}
          user_name={user_name}
          user_photo={user_photo}
        />
      </div>
    </div>
  );
}

export default Social;
