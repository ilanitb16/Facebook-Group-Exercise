import "./FeedPage.css";
import React from "react";
import { useState } from "react";
import Menu from "./menu/Menu.js";
import Search from "./search/Search.js";
import PostListReslts from "./postListResults/PostListResults.js";
import posts from "./postItem/allPosts.json"
import Info from "./Info.js"
import user_photo from "./postItem/profile/user-photo.jpg"
import NewPost from "./newPost/NewPost.js";
import { useRef } from "react";

function FeedPage({ postList, setPostList, toggleTheme }) {

  const doSearch = function (q) {
    setPostList(posts.filter((post) => post.title.includes(q)));
  };

  const [newPostInput, setNewPostInput] = useState(false);
  
  return (
    <React.Fragment>
      <Menu setPostList={setPostList} postList={postList} toggleTheme={toggleTheme} newPostInput={newPostInput} setNewPostInput={setNewPostInput} />
      <div className="col-9 main-content">
        <Search doSearch={doSearch} />
        <NewPost postList={postList} setPostList={setPostList} user_name={"ori2236"} user_photo={user_photo} newPostInput={newPostInput} setNewPostInput={setNewPostInput}/>
        <PostListReslts posts={postList} postList={postList} setPostList={setPostList} />
      </div>
        <Info user_name={"ori2236"} user_photo={user_photo}/>
    </React.Fragment>
  );
}

export default FeedPage;
