import "./App.css";
import Article from "../article/Article";
import articles from "../data/db.json";

import Menu from "../menu/Menu.js";
import posts from "../postItem/posts.js";
import Search from "../search/Search.js";
import { useState } from "react";
import PostListReslts from "../postListResults/PostListResults.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Foo from "../Foo/Foo.js";

function App() {
  const [postList, setPostList] = useState(posts);

  const doSearch = function (q) {
    setPostList(posts.filter((post) => post.title.includes(q)));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <BrowserRouter>
          <Link to="/">Main</Link>
          <br />
          <Link to="/details">Details</Link>
          <Routes>
            <Route path="/details" element={<Menu />}></Route>
            <Route path="/" element={<Foo />}></Route>
          </Routes>
          <div className="col main-content">
            <Search doSearch={doSearch} />
            <PostListReslts posts={postList} />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
