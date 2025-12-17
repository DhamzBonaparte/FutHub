import "./Osidebar.css";
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

  //   useEffect(() => {
  //     validate();
  //   }, []);

  //   const validate = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/api/v1/owner", {
  //         withCredentials: true,
  //       });
  //       setData(res.data.data);
  //       if (res.data.data.role !== "owner") {
  //         alert("Login as owner to enter!");
  //         navigate("/login");
  //       }
  //       console.log(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //       if (error?.response?.status === 401) {
  //         setError(error.message);
  //         alert("You must Login to view dashboard!");
  //         navigate("/login");
  //       } else if (error.response?.status === 403) {
  //         setError("Session expired. Please login again.");
  //         alert("Session expired. Please login again.");
  //         setTimeout(() => {
  //           navigate("/login");
  //         }, 500);
  //       } else {
  //         setError("Something went wrong. Please try again");
  //       }
  //     }
  //   };

  const Logout = async () => {
    try {
      axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      setError(err.message);
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
            style={{ background: "#20C997", color: "#c0bb2cff" }}
          >
            {data?.firstName?.slice(0, 1) || ""}
          </div>
          <div className="user-info">
            <h3 style={{ color: "black" }}>
              {data?.firstName?.slice(0, 1).toUpperCase() +
                data?.firstName?.slice(1)}{" "}
              {data?.lastName?.slice(0, 1).toUpperCase() +
                data?.lastName?.slice(1)}
            </h3>
            <p style={{ color: "black" }}>
              {data?.role?.charAt(0).toUpperCase() || ""}
              {data?.role?.slice(1) || ""}
            </p>
          </div>
        </div>

        <ul className="nav-menu">
          <li>
            <Link
              to="/admin"
              style={{ color: "#20C997" }}
              className={location.pathname === "/admin" ? "active" : ""}
            >
              <SpaceDashboardIcon style={{ color: "#20C997", marginRight: "15px" }} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/futsals"
              style={{ color: "#20C997" }}
              className={
                location.pathname === "/admin/futsal" ? "active" : ""
              }
            >
              <StorefrontIcon style={{ color: "#20C997", marginRight: "15px" }} />
              <span> Futsals</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/players"
              style={{ color: "#20C997" }}
              className={
                location.pathname === "/admin/players" ? "active" : ""
              }
            >
              <BookmarkAddedIcon style={{ color: "#20C997",marginRight: "15px" }} />
              <span>Players</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/owners"
              style={{ color: "#20C997" }}
              className={location.pathname === "/admin/owners" ? "active" : ""}
            >
              <ReviewsIcon style={{ marginRight: "15px" }} />
              <span>Owners</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              style={{ color: "#20C997" }}
              className={location.pathname === "/" ? "active" : ""}
              onClick={Logout}
            >
              <LogoutIcon style={{ marginRight: "15px" }} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
