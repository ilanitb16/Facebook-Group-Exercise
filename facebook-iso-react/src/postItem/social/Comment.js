import React, { useState } from "react";

function Comment({ commentPressed, user_name, user_photo }) {
  const [commentContent, setCommentContent] = useState(""); //current comment being typed
  const [comments, setComments] = useState([]); //the array where all the posted comments in
  const [editIndex, setEditIndex] = useState(null); //track of the index of the comment
  const [showIcons, setShowIcons] = useState(false); //show the editing icon

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const noEmptyComment = () => {
    if (commentContent.trim() === "") {
      return;
    }

    if (editIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[editIndex] = commentContent;
      setComments(updatedComments);
      setEditIndex(null);
    } else {
      setComments((prevComments) => [...prevComments, commentContent]);
      setCommentContent("");
    }
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setCommentContent(comments[index]);
    setShowIcons(!showIcons);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <span className="comment-container">
      {commentPressed && (
        <div className="comment-section">
          <div className="comment-input">
            <input
              type="text"
              value={commentContent}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              onKeyPress={(event) => event.key === "Enter" && noEmptyComment()}
            />
            <button className="post-comment" onClick={noEmptyComment}>
              Post Comment
            </button>
            <button className="edit-comments" onClick={() => setShowIcons(!showIcons)}>
              Edit Comments
            </button>
          </div>
          <div className="comments" style={{ height: "120px", overflowY: "auto" }}>
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <img className="img-profile-comments" src={user_photo} alt="..." />
                <b>{"@" + user_name + ": "}</b>
                {comment}
                {showIcons && (
                  <span className="comment-actions">
                    <i className="editComment bi bi-sliders" onClick={() => handleEditComment(index)}></i>
                    <i className="bi bi-trash3" onClick={() => handleDeleteComment(index)}></i>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

export default Comment;
