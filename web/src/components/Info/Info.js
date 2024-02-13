function Info({ user_name, user_photo }) {
    return (
      <div className="info col-2 vh-100">
        <ul className="list-group">
          <span className="profile-info">
            <h3>
              <img src={user_photo} className="img-profile-user" alt="..." />
              <b className="user-name">{"@" + user_name}</b>
            </h3>
          </span>
        </ul>
      </div>
    );
  }
  
  export default Info;
  