import "./FeedPage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../providers/user_context';

import Menu from "../Menu/Menu.js";
import Search from "../Search/Search.js";
import PostListReslts from "../PostListResults/PostListResults.js";
import posts from "../postItem/AllPosts.json"
import Info from "../Info/Info.js";
import NewPost from "../NewPost/NewPost.js";

function FeedPage({ postList, setPostList, toggleTheme, currentUser}) {
  const [user, setUser] = useUser();
  const [newPostInput, setNewPostInput] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const navigate = useNavigate();

  

  const doSearch = function (q) {
    setPostList(posts.filter((post) => post.title.includes(q)));
  };

  let user_name = user?.username;
  let user_photo = user?.photo;

  useEffect(() => {
    console.log(currentUser);
    console.log(window.location.pathname);

    if (!currentUser && !user?.authenticated) {
      navigate("/login");
    } else {
      user_name = user?.username;
      user_photo = user?.photo;
      setFriendsList(["ori levi", "shmuel granot"]);
    }
  }, []);

  return (
    <React.Fragment>
      <Menu toggleTheme={toggleTheme} setNewPostInput={setNewPostInput} friendsList={friendsList} setFriendsList={setFriendsList}/>
      <div className="col-9 main-content">
        <Search doSearch={doSearch} />
        <NewPost postList={postList} setPostList={setPostList} user_name={user_name} user_photo={user_photo} newPostInput={newPostInput} setNewPostInput={setNewPostInput}/>
        <PostListReslts posts={postList} postList={postList} setPostList={setPostList} user_name={user_name} user_photo={user_photo} friendsList={friendsList} setFriendsList={setFriendsList}/>
        <div><label></label></div>
        <div><label></label></div>
        <div><label></label></div>
      </div>
        <Info user_name={user?.username} user_photo={user?.photo}/>
    </React.Fragment>
  );
}

export default FeedPage;

