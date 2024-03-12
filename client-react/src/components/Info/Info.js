81% of storage used … If you run out, you can't create, edit, and upload files. Get 100 GB of storage for ₪8.00 ₪2.00/month for 3 months.
import {Link} from "react-router-dom";
import { useUser } from '../../providers/user_context';

function Info({ user_name, user_photo }) {
  const [user, setUser] = useUser();

  return (
    <div className="info col-2 vh-100">
      <ul className="info-container">
        <Link to={`/${user.username}`} className="profile-info">
          <h3>
            <img src={user_photo} className="img-profile-user" alt="..." />
            <b className="user-name">{"@" + user_name}</b>
          </h3>
        </Link>
      </ul>
    </div>
  );
  }
  
  export default Info;
  