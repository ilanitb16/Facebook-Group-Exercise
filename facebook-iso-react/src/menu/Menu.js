import "./Menu.css";
import posts from "../postItem/allPosts.json";
import img1 from "../postItem/img/img1.jpg";
import DarkMode from "../DarkMode/DarkMode.js";

function Menu({ setPostList, postList, toggleTheme }) {
  const addPost = () => {
    const newPost = {
      title: "another car",
      author: "noam leibovich",
      description: "car",
      date: "31/1/2024",
      img: img1,
    };
    setPostList([...postList, newPost]);
  };

  return (
    <div className="menu col-2 vh-100">
      <div>
        <h1>
          <font color="blue">
            <b>facebook</b>
          </font>
        </h1>
      </div>

      <ul className="list-group">
        <li className="list-group-item d-flex align-items-center">
            <i className="bi bi-house-fill"></i>
          <span className="home w-100 m-1 ms-3">
            <label>Home</label>
          </span>
          <span className="badge bg-primary rounded-pill">1</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <i className="bi bi-plus-circle-fill"></i>
          <span className="newPost w-100 m-1 ms-3" onClick={addPost}>
            <label>New Post</label>
          </span>
          <span className="badge bg-primary rounded-pill"></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <i class="bi bi-person-circle"></i>
          <span className="myAccount w-100 m-1 ms-3">
            <label>My account</label>
          </span>
          <span className="badge bg-primary rounded-pill"></span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <DarkMode toggleTheme={toggleTheme} />
        </li>
      </ul>
    </div>
  );
}

export default Menu;
