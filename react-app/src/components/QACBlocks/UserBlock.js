import defaultimg from "./blank-profile-img.png";
import "./UserBlock.css"

const UserBlock = ({ userData }) => {
  const {askerName} = userData;

  // TODO: Change this to profileImg once the backend is updated
  let {askerProfilImg} = userData;
  console.log(askerProfilImg)
  if (!askerProfilImg) {
    askerProfilImg = defaultimg
  }

  return (
    <div className="user-block">
      <div className="user-block-profile-img">
        <img className="profile-img" src={askerProfilImg} alt={`profile avatar for user ${askerName}`} />

      </div>
      <div className="user-block-name">
        {askerName}
      </div>

    </div>
  )
}

export default UserBlock
