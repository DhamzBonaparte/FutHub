import { Link } from "react-router-dom";
import "../auth.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

export default function Signup() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [isSame, setIsSame] = useState(false);
  const [roles, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  useEffect(() => {
    setIsSame(false);
    if (password !== confirmPassword) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  }, [confirmPassword, password]);

  async function handleSubmit(e) {
    e.preventDefault();

    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidFormat) {
      setErr("Not a valid email");

      setTimeout(() => {
        setErr("");
      }, 2000);
      return;
    }

    setLoading(true);
    try {
      const submit = await axios.post("http://localhost:3000/api/v1/signup", {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        agreedToTerms: isAgreed,
        roles: roles,
        location: location,
        phone: phone,
      });

      if (submit.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setErr("Email Already Used!");

        setTimeout(() => {
          setErr("");
        }, 2000);
      }
      console.log(err);
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
              <Link to="/" className="logo">
                Fut<span style={{ color: "lightgreen" }}>Hub</span>
              </Link>
              <h1>Create Your Account</h1>
              <p>Join the ultimate football management platform</p>
            </div>

            <div id="signup-alert" className="alert alert-success"></div>

            <form
              id="signup-form"
              className="auth-form"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="signup-firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="signup-firstname"
                    className="form-input"
                    placeholder="Enter your first name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="signup-lastname"
                    className="form-input"
                    placeholder="Enter your last name"
                    required
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">
                  Email Address
                </label>
                <input
                  type="text"
                  id="signup-email"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="form-input"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <p style={{ textAlign: "center", margin: "5px", color: "red" }}>
                  {!isSame ? "Password must be same!" : ""}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm-password" className="form-label">
                  Your Location:
                </label>
                <input
                  type="text"
                  id="location"
                  className="form-input"
                  placeholder="Enter your location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm-password" className="form-label">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  minLength={10}
                  maxLength={10}
                  pattern="\d{10}"
                  placeholder="Enter your phone number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="role"
                  class="form-label"
                  style={{
                    display: "block",
                    fontWeight: "500",
                  }}
                >
                  Signing up as:
                </label>
                <div style={{ display: "flex", gap: "20px" }}>
                  <label
                    htmlFor="role-owner"
                    style={{
                      flex: 1,
                      border: "1px solid #0d1b2a",
                      borderRadius: "8px",
                      padding: "20px",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      color:roles=="owner"?"#193ca6ff":"black"
                      
                    }}
                    className="hov"
                  >
                    <input
                      type="radio"
                      id="role-owner"
                      name="role"
                      value="owner"
                      style={{ display: "none" }}
                      required
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      <HomeIcon className="icon" />
                      Owner
                    </span>
                  </label>
                  <label
                    htmlFor="role-player"
                    style={{
                      flex: 1,
                      border: "1px solid #0d1b2a",
                      borderRadius: "8px",
                      padding: "20px",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      color:roles=="player"?"#193ca6ff":"black"
                    }}
                    className="hov"
                  >
                    <input
                      type="radio"
                      id="role-player"
                      name="role"
                      value="player"
                      style={{ display: "none" }}
                      required
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      <PersonIcon className="icon" />
                      Player
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="agree-terms"
                  className="form-check-input"
                  required
                  onChange={() => setIsAgreed(!isAgreed)}
                />
                <label
                  htmlFor="agree-terms"
                  className="form-label"
                  style={{ textAlign: "center", marginTop: "6px" }}
                >
                  I agree to the{" "}
                  <Link to="/terms" style={{ textDecoration: "none" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/service" style={{ textDecoration: "none" }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <p style={{ textAlign: "center", color: "red" }}>{err}</p>

              <button
                type="submit"
                className="btn btn-secondary btn-auth"
                disabled={!isSame}
                style={
                  !isSame
                    ? { cursor: "not-allowed", backgroundColor: "grey" }
                    : { cursor: "pointer", backgroundColor: "#ff6d00" }
                }
              >
                Create Account
              </button>

              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="auth-link">
                    Login here
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
