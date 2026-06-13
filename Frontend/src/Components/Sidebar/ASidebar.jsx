import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ReviewsIcon from "@mui/icons-material/Reviews";
import StorefrontIcon from "@mui/icons-material/Storefront";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";

export default function ASidebar() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const location = useLocation();

  const Logout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your session.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
      });

      if (result.isConfirmed) {
        await axios.post(`${url}/logout`, {}, { withCredentials: true });

        await Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success",
        );
      }
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <>
      <div className="sidebar" style={{ background: "#1B2626" }}>
        <div className="logo2" style={{ color: "white" }}>
          Fut{" "}
          <span style={{ color: "#145A32", margin: "0", padding: "0" }}>
            Hub
          </span>
        </div>

        <div className="user-profile">
          <div
            className="user-avatar"
            style={{ background: "white", color: "gray" }}
          >
            A
          </div>
          <div className="user-info">
            <h3 style={{ color: "white" }}>Admin</h3>
            <p style={{ color: "white" }}>Admin</p>
          </div>
        </div>

        <ul className="nav-menu">
          <li>
            <Link
              to="/admin"
              style={{ color: "white" }}
              className={location.pathname === "/admin" ? "active" : ""}
            >
              <SpaceDashboardIcon
                style={{ color: "gray", marginRight: "15px" }}
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/futsals"
              style={{ color: "white" }}
              className={location.pathname === "/admin/futsals" ? "active" : ""}
            >
              <StorefrontIcon style={{ color: "gray", marginRight: "15px" }} />
              <span> Futsals</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/players"
              style={{ color: "white" }}
              className={location.pathname === "/admin/players" ? "active" : ""}
            >
              <BookmarkAddedIcon
                style={{ color: "gray", marginRight: "15px" }}
              />
              <span>Players</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/owners"
              style={{ color: "white" }}
              className={location.pathname === "/admin/owners" ? "active" : ""}
            >
              <ReviewsIcon style={{ marginRight: "15px", color: "gray" }} />
              <span>Owners</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              style={{ color: "white" }}
              className={location.pathname === "/" ? "active" : ""}
              onClick={Logout}
            >
              <LogoutIcon style={{ marginRight: "15px", color: "gray" }} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
