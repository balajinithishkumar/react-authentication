import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Logout } from "@mui/icons-material";
import "../Styles/Profile.css"
import {useSelector } from 'react-redux';
function Profile() {  
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("role");
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
          <p>{user?.displayName ? user?.displayName : "username"} </p>
          <mail>{user?.emailId ? user?.emailId :  "email id"}</mail>
        </div>
      </div>
      <div
        className="logout"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
        <Logout style={{fontSize:"20px"}} />
      </div>
    </div>
  );
}

export default Profile;