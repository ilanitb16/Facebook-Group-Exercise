function PostItem({ title, author, description, date, img }) {
  return (
    <div className= "col-xl-2 col-lg-3 col-m-4 col-sm-6 p-2">
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
  );
}
export default PostItem;
