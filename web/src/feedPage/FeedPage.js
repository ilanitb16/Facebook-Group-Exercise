import "./FeedPage.css";
import React from "react";
import { useState, useEffect } from "react";
import Menu from "../menu/Menu.js";
import Search from "../search/Search.js";
import PostListReslts from "../postListResults/PostListResults.js";
import posts from "../postItem/allPosts.json"
import Info from "../info/Info.js";
import { useNavigate } from "react-router-dom";

import {useUser} from '../providers/user_context';

import NewPost from "../newPost/NewPost.js";

function FeedPage({ postList, setPostList, toggleTheme}) {
  const [user, setUser] = useUser();
  const [newPostInput, setNewPostInput] = useState(false);
  const navigate = useNavigate();

  const doSearch = function (q) {
    setPostList(posts.filter((post) => post.title.includes(q)));
  };

  const user_name = "ori2236";
  const user_photo = process.env.PUBLIC_URL + '/profile/user-photo.jpg';

  useEffect(() => {
      if(!user?.authenticated){
        // navigate("/login");
      }
  });

  return (
    <React.Fragment>
      <Menu toggleTheme={toggleTheme} setNewPostInput={setNewPostInput} />
      <div className="col-9 main-content">
        <Search doSearch={doSearch} />
        <NewPost postList={postList} setPostList={setPostList} user_name={user_name} user_photo={user_photo} newPostInput={newPostInput} setNewPostInput={setNewPostInput}/>
        <PostListReslts posts={postList} postList={postList} setPostList={setPostList} user_name={user_name} user_photo={user_photo} />
        <div><label></label></div>
        <div><label></label></div>
        <div><label></label></div>
      </div>
        <Info user_name={user_name} user_photo={user_photo}/>
    </React.Fragment>
  );
}

export default FeedPage;
