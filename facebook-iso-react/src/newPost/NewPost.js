import React, { useState } from "react";

function NewPost({
  user_name,
  user_photo,
  postList,
  setPostList,
  newPostInput,
  setNewPostInput,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgNewPost, setImgNewPost] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImgNewPost(event.target.files[0]);
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  const addPost = () => {
    // Check if an image is selected
    const img = imgNewPost ? URL.createObjectURL(imgNewPost) : null;

    const newPost = {
      title: title,
      author: user_name,
      description: description,
      date: formattedDate,
      author_photo: user_photo,
      img: img,
    };

    setPostList([...postList, newPost]);
    deleteData();
  };

  const deleteData = () => {
    setTitle("");
    setDescription("");
    setImgNewPost(null);
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="row post">
      <div className="col-5"></div>
      <div className="col-6 new-post-content">
        <div className="card" href="details.html">
          {newPostInput && (
            <div className="row top-card">
              <p className="newPostContent">
                <label>NEW POST: What would you like to share?</label>
                <br />
                <br />
                <label>Title of the post: </label>
                <br />
                <input type="text" value={title} onChange={handleTitleChange} />
                <br />
                <label>Description of the post:</label>
                <br />
                <textarea
                  rows="4"
                  style={{ width: "60%" }}
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
                <br />
                <label>Image:</label>
                <br />
                <input type="file" onChange={handleImageChange} />
                </p>
                <div className="newPostButtons btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      addPost();
                      setNewPostInput(false);
                      handleScrollToBottom();
                    }}
                  >
                    post
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setNewPostInput(false)}
                  >
                    discard
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setNewPostInput(false);
                      deleteData();
                    }}
                  >
                    cancel
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewPost;
