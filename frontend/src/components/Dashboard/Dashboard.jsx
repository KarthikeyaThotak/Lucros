import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setToken, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage and state
    localStorage.removeItem("access");
    setToken(null);
    setUser(null);

    // Redirect to the login page
    navigate("/login");
  };

  if (!user) {
    // If there's no user, redirect to login page
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>

      <h3>User Info:</h3>
      <ul>
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Full Name:</strong> {user.full_name}</li>
        {/* Display other user info here */}
      </ul>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
