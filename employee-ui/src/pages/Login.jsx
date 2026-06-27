import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  useEffect(() => {
    if (
      localStorage.getItem(
        "sessionExpired"
      )
    ) {
      toast.warning(
        "Session expired. Please login again."
      );

      localStorage.removeItem(
        "sessionExpired"
      );
    }
  }, []);

  const handleLogin = async () => {
  try {

    const response =
      await axios.post(
        "http://localhost:5157/api/Auth/login",
        {
          username,
          password
        }
      );

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "role",
      response.data.role
    );

    localStorage.setItem(
      "employeeId",
      response.data.employeeId
    );

    if (
      response.data
        .mustChangePassword
    ) {
      navigate(
        "/change-password"
      );

      return;
    }

    if (
      response.data.role ===
      "Admin"
    ) {
      navigate(
        "/admin-dashboard"
      );
    }
    else {
      navigate(
        "/employee-dashboard"
      );
    }

  }
  catch {

    toast.error(
      "Invalid Credentials"
    );
  }
};

  return (
  <div className="login-container">

    <div className="login-card">

      <h1 className="login-title">
        Employee Management System
      </h1>

      <p className="login-subtitle">
        Sign in to continue
      </p>

      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="login-btn"
        onClick={handleLogin}
      >
        Login
      </button>

      <button
        className="forgot-btn"
        onClick={() =>
          navigate("/forgot-password")
        }
      >
        Forgot Password?
      </button>

    </div>

  </div>
);
}

export default Login;