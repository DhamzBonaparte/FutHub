import { useEffect, useState } from "react";
import "../auth.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkOwner = async () => {
    try {
      const check = await axios.get(
        "http://localhost:3000/api/v1/owner/check-owner",
        { withCredentials: true }
      );
      if (check. data.data?.approved) {
        navigate("/owner");
      } else {
        navigate("/register");
      }
    } catch (e) {
      setErr(e.message);
    }
  };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post(
        `http://localhost:3000/api/v1/login`,
        {
          email: email,
          password: pass,
        },
        { withCredentials: true }
      );
      setErr("");

      if (login.data.data.role === "player") {
        navigate("/player");
      }

      if (login.data.data.role === "owner") {
        await checkOwner();
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 404) {
        setErr("Invalid email or password.");

        setTimeout(() => {
          setErr("");
        }, 1500);
      } else {
        console.log(err);
        setErr("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="all">
        <div
          className="auth-container"
          style={loading ? { filter: "blur(5px)" } : { filter: "blur(0px)" }}
        >
          <div className="auth-card">
            <div className="auth-header">
              <a href="index.html" className="logo">
                Fut<span style={{ color: "lightgreen" }}>Hub</span>
              </a>
              <h1>Login to Your Account</h1>
              <p>Access your football management dashboard</p>
            </div>

            <div id="login-alert" className="alert alert-danger"></div>

            <form id="login-form" className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>

              <div className="form-options">
                <a href="#" id="forgot-password" className="forgot-link">
                  Forgot password?
                </a>

                <p style={{ color: "red", textAlign: "center " }}>{err}</p>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-auth"
                onClick={(e) => handleLogin(e)}
              >
                Login to FutHub
              </button>
              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <Link className="auth-link" to="/signup">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <div className="text">
            <p>Hang Tight...</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
