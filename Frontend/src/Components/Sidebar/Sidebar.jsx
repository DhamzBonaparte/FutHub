import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const res = await axios.get(`${url}/player`, {
        withCredentials: true,
      });
      setData(res.data.msg);
      if (res.data.msg.role !== "player") {
        alert("Login as player to enter!");
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("You must Login to view this page!");
        navigate("/login");
      } else if (err.response?.status === 403) {
        setError("Session expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  const Logout = async () => {
    try {
      axios.post(
        `${url}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div
        className="sidebar"
        style={error ? { filter: "blur(10px)" } : { filter: "blur(0px)" }}
      >
        <div className="logo2">
          Fut{" "}
          <span style={{ color: "green", margin: "0", padding: "0" }}>Hub</span>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            {data?.firstName?.slice(0, 1).toUpperCase() || ""}
          </div>
          <div className="user-info">
            <h3
              style={{
                fontSize: "1rem",
              }}
            >
              {data?.firstName?.slice(0, 1).toUpperCase() +
                data?.firstName?.slice(1)}{" "}
              {data?.lastName?.slice(0, 1).toUpperCase() +
                data?.lastName?.slice(1)}{" "}
            </h3>
            <p>
              {data?.role?.charAt(0).toUpperCase() || ""}
              {data?.role?.slice(1) || ""}
            </p>
          </div>
        </div>
        <ul className="nav-menu">
          <li>
            <Link
              to="/player"
              className={location.pathname === "/player" ? "active" : ""}
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/player/booking"
              className={
                location.pathname === "/player/booking" ? "active" : ""
              }
            >
              <BookIcon className="icon" />
              <span>Booking</span>
            </Link>
          </li>
          <li>
            <Link
              to="/player/find-opponent"
              className={
                location.pathname === "/player/find-opponent" ? "active" : ""
              }
            >
              <PersonAddIcon className="icon" />
              <span>Opponents</span>
            </Link>
          </li>
          <li>
            <Link
              to="/player/find-teammates"
              className={
                location.pathname === "/player/find-teammates" ? "active" : ""
              }
            >
              <GroupsIcon className="icon" />
              <span>Teammates</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={Logout}
            >
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
