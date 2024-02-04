import "./PostItem.css";
import React, { useState } from "react";
import Social from "./social/Social";
import EditPost from "./EditPost";


function PostItem({ postList, setPostList, title, author, description, date, author_photo, img, user_name, user_photo}) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const updatePost = () => {
    const updatedPosts = postList.map((post) =>
      post.title === title
        ? { ...post, title: newTitle, description: newDescription }
        : post
    );
    setPostList(updatedPosts);
    setEditMode(false); // Close edit mode after updating
  };
  
  const deleteChanges = () => {
    setNewTitle(title);
    setNewDescription(description);
  };

  return (
    <div className="row post">
      <div className="col-5"></div>
      <div className="col-6 main-content">
        <div className="card" href="details.html">
          <div className="row top-card">
            <div className="col-9">
              <p className="card-author">
                <img className="img-profile" src={author_photo} alt="..." />
                <b>{"@" + author}</b>
                {" " + date}
              </p>
            </div>
            <EditPost title={title} postList={postList} setPostList={setPostList} editMode={editMode} setEditMode={setEditMode} />
          </div>
          <img src={img} className="card-img" alt="..."></img>
          <div className="card-body">
          {!editMode && (
          <div>
           <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          </div>
          )}
          {editMode && (
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <br />
                  <div className="description">
                  <label>Description:</label>
                  <textarea
                    rows="1"
                    value={newDescription}
                    style={{ width: "60%" }}
                    onChange={(e) => setNewDescription(e.target.value)}
                  ></textarea>
                  </div>
                </div>
              )}
          </div>
          <Social user_name={user_name} user_photo={user_photo}/>
          {editMode && (
                  <div className="editButtons">
                    <button key="update" onClick={updatePost} className="fs-6">Update</button>
                    <button key="cancel" onClick={() => {setEditMode(false);deleteChanges();}} className="fs-6">Cancel</button>
                  </div>
                )}
        </div>
      </div>
    </div>
  );
}
export default PostItem;
