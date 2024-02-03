import "./FeedPage.css";
import React from "react";
import { useState } from "react";
import Menu from "./menu/Menu.js";
import Search from "./search/Search.js";
import PostListReslts from "./postListResults/PostListResults.js";
import posts from "./postItem/allPosts.json"

function FeedPage({ postList, setPostList, toggleTheme }) {
  const doSearch = function (q) {
    setPostList(posts.filter((post) => post.title.includes(q)));
  };
  return (
    <React.Fragment>
      <Menu setPostList={setPostList} postList={postList} toggleTheme={toggleTheme} />
      <div className="col-9 main-content">
        <Search doSearch={doSearch} />
        <PostListReslts posts={postList} postList={postList} setPostList={setPostList} />
      </div>
    </React.Fragment>
  );
}

export default FeedPage;
