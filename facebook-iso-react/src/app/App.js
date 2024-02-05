import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createContext } from "react";
import FeedPage from "../FeedPage.js";
import posts from "../postItem/allPosts.json"

export const ThemeContext = createContext(null);

function App() {
  const[theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const [postList, setPostList] = useState(posts);

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

<Route path="/newPost" element={<NewPost postList={postList} setPostList={setPostList} navigateToNewPost={navigateToNewPost} />} />
    */
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="container-fluid" id={theme}>
      <div className="row">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FeedPage postList={postList} setPostList={setPostList} toggleTheme={toggleTheme} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;

