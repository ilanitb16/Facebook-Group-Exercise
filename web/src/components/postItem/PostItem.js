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
  friendsList,
  setFriendsList,
}) {
  const [isCurrentUser] = useState(author === user_name);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newImg, setNewImg] = useState(img);
  
  const isFriendOrCurrentUser = friendsList.includes(author) || author === user_name;

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

  const handleAddFriend = () => {
    setFriendsList((prevFriendsList) => [...prevFriendsList, author]);
  };

  return (
    <div className="row post">
      <div className="col-5"></div>
      {isFriendOrCurrentUser && (
        <div className="col-6 main-content">
          <div className="card" href="details.html">
            <div className="row top-card">
              <div className="col-9">
                <p className="card-author">
                  <img className="img-profile" src={author_photo} alt="..." />
                  <span className="authorInfo">
                    <b>{"@" + author}</b>
                    {" " + date}
                  </span>
                </p>
              </div>
              {isCurrentUser && (
                <EditPost
                  title={title}
                  postList={postList}
                  setPostList={setPostList}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  deleteChanges={deleteChanges}
                />
              )}
            </div>
            <img className="card-img" src={img} alt="..." />
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
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
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
          </div>
        </div>
      )}
      {!isFriendOrCurrentUser && (
        <div className="col-6 main-content">
          <div className="card" href="details.html">
            <div className="row top-card">
              <p className="card-author">
                <img className="img-profile" src={author_photo} alt="..." />
                <span className="authorInfo">
                  <b>{"@" + author}</b>
                </span>
              </p>
              <div className="w-90 text-end">
                <i className="addFriend bi bi-person-fill-add" style={{ fontSize: "1.6rem" }} onClick={handleAddFriend}></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostItem;