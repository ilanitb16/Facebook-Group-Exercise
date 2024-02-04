import React from "react";

function Comment({ commentPressed, commentContent, setCommentContent, comments, setComments, user_name, user_photo }) {
  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleAddComment = () => {
    setComments((prevComments) => [...prevComments, commentContent]);
    setCommentContent(""); // Clear the commentContent after adding the comment
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
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          <div className="comments" style={{ height: "120px", overflowY: "auto" }}>
            {comments.map((comment, index) => (
              <p key={index} style={{ margin: "0" }}>
                <img className="img-profile-comments" src={user_photo} alt="..." />
                <b>{"@" + user_name + ": "}</b>
                {comment}
              </p>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

export default Comment;
