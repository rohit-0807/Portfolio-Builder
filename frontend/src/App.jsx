import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/signup">Signup</Link> |{" "} 
          <Link to="/login">Login</Link> |{" "}
          <Link to="/profile">Profile</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
