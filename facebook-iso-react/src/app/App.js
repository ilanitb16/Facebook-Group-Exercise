import "./App.css";
import Article from "../article/Article";
import articles from "../data/db.json";
import Menu from "../menu/Menu.js";
import posts from "../postItem/allPosts.json";
import Search from "../search/Search.js";
import { useState } from "react";
import PostListReslts from "../postListResults/PostListResults.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewPost from "../newPost/NewPost.js";
import { createContext } from "react";

export const ThemeContext = createContext(null);

function App() {
  const [postList, setPostList] = useState(posts);

  const doSearch = function (q) {
    setPostList(posts.filter((post) => post.title.includes(q)));
  };
  
  const[theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  

  return (
    /*
          // what written- the links
          <Link to="/"> Main </Link><br />
          <Link to="/details"> Details </Link>
          <Routes>
          // where it goes- the links
            <Route path="/" element={<NewPost />}></Route>
            <Route path="/details" element={<Menu setPostList={setPostList} postList={postList} />}></Route>
          </Routes>


    */
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="container-fluid" id={theme}>
      <div className="row">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NewPost />}></Route>
            <Route
              path="/details"
              element={<Menu setPostList={setPostList} postList={postList} toggleTheme={toggleTheme}/>}
            ></Route>
          </Routes>
          <div className="col-9 main-content">
            <Search doSearch={doSearch} />
            <PostListReslts posts={postList} />
          </div>
        </BrowserRouter>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;

