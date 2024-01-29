function Menu() {
  return (
    <div className="col-2 bg-light vh-100">
      <ul className="list-group">
        <li className="list-group-item d-flex align-items-center">
          <i className="bi bi-house-fill"></i>
          <span className="w-100 m-1 ms-3">Home</span>
          <span className="badge bg-primary rounded-pill">14</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <i className="bi bi-search"></i>
          <span className="w-100 m-1 ms-3">Explore</span>
          <span className="badge bg-primary rounded-pill">2</span>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <i className="bi bi-plus-circle-fill"></i>
          <span className="w-100 m-1 ms-3">New Post</span>
          <span className="badge bg-primary rounded-pill">1</span>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
