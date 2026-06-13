import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ReviewsIcon from "@mui/icons-material/Reviews";
import StorefrontIcon from "@mui/icons-material/Storefront";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";

export default function OSidebar() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const location = useLocation();

  useEffect(() => {
    validate();
  }, []);

  const validate = async () => {
    try {
      const res = await axios.get(`${url}/owner`, {
        withCredentials: true,
      });
      setData(res.data.data);
      if (res.data.data.role !== "owner") {
        alert("Login as owner to enter!");
        navigate("/login");
      }
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        setError(error.message);
        alert("You must Login to view dashboard!");
        navigate("/login");
      } else if (error.response?.status === 403) {
        setError("Session expired. Please login again.");
        alert("Session expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

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
      <div className="sidebar" style={{ background: "#ddb518ff" }}>
        <div className="logo2" style={{ color: "black" }}>
          Fut{" "}
          <span style={{ color: "#145A32", margin: "0", padding: "0" }}>
            Hub
          </span>
        </div>

        <div className="user-profile">
          <div
            className="user-avatar"
            style={{ background: "#145A32", color: "#c0bb2cff" }}
          >
            {data?.firstName?.charAt(0).toUpperCase() || ""}
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
              to="/owner"
              style={{ color: "black" }}
              className={location.pathname === "/owner" ? "active" : ""}
            >
              <SpaceDashboardIcon style={{ marginRight: "15px" }} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/my-futsal"
              style={{ color: "black" }}
              className={
                location.pathname === "/owner/my-futsal" ? "active" : ""
              }
            >
              <StorefrontIcon style={{ marginRight: "15px" }} />
              <span>My Futsal</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/book-futsal"
              style={{ color: "black" }}
              className={
                location.pathname === "/owner/book-futsal" ? "active" : ""
              }
            >
              <BookmarkAddedIcon style={{ marginRight: "15px" }} />
              <span>Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/review"
              style={{ color: "black", display: "none" }}
              className={location.pathname === "/owner/review" ? "active" : ""}
            >
              <ReviewsIcon style={{ marginRight: "15px" }} />
              <span>Reviews</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              style={{ color: "black" }}
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
