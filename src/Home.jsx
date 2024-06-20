import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Sidebar from "./Sidebar";

function Home() {
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
    <div>
      <Sidebar />
    </div>
  );
}
export default Home;