import React, { useState } from "react";
import Hompage from "./Hompage";
import { Route, Routes, Navigate } from "react-router-dom";
import SingUp from "./components/SignUpPage/Singup";
import Login from "./components/LoginPage/Login";
import NotFound from "./components/NotFound/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import LinkBank from "./components/LinkBank/LinkBank";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [SignUptoken, SignUpsetToken] = useState(null);
  return (
    <>
      <Routes >
        <Route path="/" element={<Hompage />}>
        </Route>
        <Route path="/signup" element={<SingUp setToken={SignUpsetToken} />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />

        <Route
          path="/dashboard"
          element={token ? (
            <>
            <Dashboard user={user} setToken={setToken} setUser={setUser} />
            <LinkBank user={user} setToken={setToken} setUser={setUser} />
            </>
          ) : (
            <Navigate to="/login" replace />


          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
