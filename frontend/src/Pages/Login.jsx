// src/pages/Login.jsx

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getReq, postReq } from "../config/request";
import "./Login.css";
import { AppContext } from "../config/AppContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    loginTok();
  }, []);

  const loginTok = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const res = await getReq("api/auth/logtok", token);
      if (res.success) {
        setUser({ ...res.user, token: res.token });
        sessionStorage.setItem("token", res.token);
        navigate("/dashboard");
      }
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postReq("api/auth/login", formData, "");
    if (res.success) {
      setUser({ ...res.user, token: res.token });
      sessionStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      alert("Login failed: " + res.message);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-copy">
          {/* <p className='login-kicker'>Shop Floor Portal</p> */}
          <h1>Operator Login</h1>
          {/* <p className='login-subtitle'>
						Sign in to view jobs, manage tasks, and track shop floor updates.
					</p> */}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="username">User ID</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your user ID"
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
