import "./Social.css";
import React, { useState } from "react";
function Social() {
  const [likePressed, setLlikePressed] = useState(false);
  const [commentPressed, setCommentPressed] = useState(false);
  const [sharePressed, setSharePressed] = useState(false);

  const handleClickLike = () => {
    setLlikePressed((pressed) => !pressed);
  };

  const handleClickComment = () => {
    setCommentPressed((pressed) => !pressed);
  };

  const handleClickShare = () => {
    setSharePressed((pressed) => !pressed);
  };

  return (
    <div className="social">
      <span className="likeButton" onClick={console.log("like")}>
        <i
          className={`bi bi-hand-thumbs-up${likePressed ? "-fill" : ""}`}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={handleClickLike}
        ></i>
      </span>
      <span className="commentButton" onClick={console.log("comment")}>
        <i
          className={`bi bi-chat${commentPressed ? "-fill" : ""}`}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={handleClickComment}
        ></i>
      </span>
      <span className="shareButton" onClick={console.log("share")}>
        <i
          className={`bi bi-reply${sharePressed ? "-fill" : ""}`}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={handleClickShare}
        ></i>
      </span>
    </div>
  );
}
export default Social;
