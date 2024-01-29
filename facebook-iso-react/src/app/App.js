import "./App.css";
import Article from "../article/Article";
import articles from "../data/db.json";
import { useState } from "react";
import Post from "../post/PostItem.js";
import posts from "../post/posts.js";
import Menu from "../menu/Menu.js";
import Search from "../search/Search.js";

function App() {


  const postList = posts.map((post, key) => {
    return <Post {...post} key={key} />;
  });

  //const [postsList, setPostList] = useState(posts);

  return (
    <div className="container-fluid">
      <div className="row">
        <Menu />
        <div className="col main-content">
        <Search />
          <div className="row g-2">
            {postList}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
