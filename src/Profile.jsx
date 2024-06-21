import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { Logout } from "@mui/icons-material";
import "./Profile.css"
function Profile() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="profile">
      <div className="profile_information">
        <div className="profile_name">
          <img src="tony-stark.jpg" alt="" />
        </div>
        <div className="username_email_id">
          <p>Tran Mau Tri Tam</p>
          <mail>tam@ui.net</mail>
        </div>
      </div>
      <div
        className="logout"
        onClick={() => {
          // handleLogout();
        }}
      >
        Logout
        <Logout style={{fontSize:"20px"}} />
      </div>
    </div>
  );
}

export default Profile;