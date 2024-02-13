import "./PostItem.css";
import React, { useState } from "react";
import Social from "./Social/Social";
import EditPost from "./EditPost";

function PostItem({
  postList,
  setPostList,
  title,
  author,
  description,
  date,
  author_photo,
  img,
  user_name,
  user_photo,
}) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newImg, setNewImg] = useState(img);

  const updatePost = () => {
    const updatedPosts = postList.map((post) =>
      post.title === title
        ? { ...post, title: newTitle, description: newDescription, img: newImg, Key:post.id }
        : post
    );
    setPostList(updatedPosts);
    setEditMode(false);
  };

  const deleteChanges = () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewImg(img);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImg(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="row post">
      <div className="col-5"></div>
      <div className="col-6 main-content">
        <div className="card" href="details.html">
          <div className="row top-card">
            <div className="col-9">
              <p className="card-author">
                <img className="img-profile" src={author_photo} alt="..."></img>
                <span className="authorInfo">
                  <b>{"@" + author}</b>
                  {" " + date}
                </span>
              </p>
            </div>
            <EditPost
              title={title}
              postList={postList}
              setPostList={setPostList}
              editMode={editMode}
              setEditMode={setEditMode}
              deleteChanges={deleteChanges}
            />
          </div>
          <img className="card-img" src={newImg} alt="..."></img>
          <div className="card-body">
            {!editMode && (
              <div>
                <h5 className="card-title">{title}</h5>
                <p className="card-description">{description}</p>
              </div>
            )}
            {editMode && (
              <div className="editPost">
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
                <div className="editImg">
                  <br />
                  <label></label>
                  <br />
                  <i className="bi bi-plus-circle-fill"></i>
                  <input type="file" onChange={handleImageChange} />
                </div>
              </div>
            )}
          </div>
          <Social user_name={user_name} user_photo={user_photo} />
          {editMode && (
            <div className="editButtons">
              <button key="update" onClick={updatePost} className="fs-6">
                Update
              </button>
              <button
                key="cancel"
                onClick={() => {
                  deleteChanges();
                  setEditMode(false);
                }}
                className="fs-6"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
