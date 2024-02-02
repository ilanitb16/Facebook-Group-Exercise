function PostItem({ title, author, description, date, img }) {
  return (
    <div className="row">
      <div className="col-3">
        <label></label>
      </div>
      <div className="col-9 main-content">
        <div className="card" href="details.html">
          <img src={img} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{author}</p>
            <p className="card-text">{description}</p>
            <p className="card-text">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostItem;
