import "./Conector.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createContext } from "react";
import FeedPage from "../feedPage/FeedPage.js";
import posts from "../postItem/allPosts.json"

export const ThemeContext = createContext(null);

function Connector() {
  const[theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const [postList, setPostList] = useState(posts);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="container-fluid" id={theme}>
      <div className="row">
        <BrowserRouter>
          <Routes>
            <Route path="/Feed" element={<FeedPage postList={postList} setPostList={setPostList} toggleTheme={toggleTheme} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default Connector;

