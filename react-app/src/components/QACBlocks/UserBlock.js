import { Link } from "react-router-dom";
import defaultimg from "./blank-profile-img.png";
import "./UserBlock.css"

const UserBlock = ({ userData }) => {
  //TODO: Change backend to only provide askerName
  const {id, askerName, first_name, last_name} = userData;
  const displayName = askerName || first_name + ' ' + last_name

  // TODO: Change this to profileImg once the backend is updated
  let {profileImg, profileimg} = userData;
  if (!profileImg && !profileimg) {
    profileImg = defaultimg
    profileimg = defaultimg
  }

  const displayImg = profileImg || profileimg


  return (
    <Link to={`/users/${id}`}>
      <div className="user-block">
        <div className="user-block-profile-img">
          <img className="profile-img" src={displayImg} alt={`profile avatar for user ${askerName}`} />

        </div>
        <div className="user-block-name">
          {displayName}
        </div>

      </div>
    </Link>
  )
}

export default UserBlock
