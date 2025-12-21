import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useState, useEffect } from "react";
import axios from "axios";

const formatWithOrdinal = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month}`;
};

export default function Main() {
  useEffect(() => {
    getMyBookings();
  }, []);

  const [opponents, setOpponents] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState([]);
  const [matches, setMatches] = useState(0);

  const getMyBookings = async () => {
    try {
      const hi = await axios.get(
        "http://localhost:3000/api/v1/player/myBookings",
        { withCredentials: true }
      );
      setBookings(hi.data.data);
      setMatches(hi.data.data.length);
      console.log(hi);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <div className="header">
        <div className="dashboard-title">Player Dashboard</div>
      </div>
      <div id="dashboard" className="dashboard-section">
        <div className="stats-container">
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <EventAvailableIcon className="bigIcon" />
            </div>
            <div className="stat-title">Upcoming Matches</div>
            <div className="stat-value">{matches}</div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <SportsSoccerIcon className="bigIcon" />
            </div>
            <div className="stat-title">Total Bookings</div>
            <div className="stat-value">15</div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <FavoriteIcon className="bigIcon" />
            </div>
            <div className="stat-title">Favourite Venues</div>
            <div className="stat-value">4</div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <DirectionsRunIcon className="bigIcon" />
            </div>
            <div className="stat-title">Matches Played</div>
            <div className="stat-value">12</div>
          </div>
        </div>

        <div className="section-header">
          <h2>Upcoming Bookings</h2>
        </div>

        <div
          className="upcoming-matches"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: "20px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {bookings?.map((items, id) => {
            return (
              <div
                className="match-card"
                key={id}
                style={{
                  flex: "0 0 auto",
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: "20px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  className="facts"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="match-date"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      background: "#3bc942ff",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      width: "70px",
                      marginLeft: "20px",
                    }}
                  >
                    <div
                      className="day"
                      style={{ fontSize: "1.4rem", fontWeight: "700" }}
                    >
                      {formatWithOrdinal(items?.createdAt).slice(0, 4)}
                    </div>
                    <div
                      className="month"
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      {formatWithOrdinal(items?.createdAt).slice(5, 8)}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="match-details" style={{ flex: 1 }}>
                    <h4
                      style={{
                        margin: "0 0 6px",
                        fontSize: "1.1rem",
                        color: "#0d1b2a",
                        textAlign: "center",
                      }}
                    >
                      {items?.futsal.charAt(0).toUpperCase() +
                        items?.futsal.slice(1)}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "#555",
                        textAlign: "center",
                      }}
                    >
                      {items?.capacity}-a-side
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "#555",
                        textAlign: "center",
                      }}
                    >
                      {items.address.charAt(0).toUpperCase() + items.address.slice(1)}, {" "} 
                      {items.location.charAt(0).toUpperCase() + items.location.slice(1)}
                    </p>
                  </div>

                  <div
                    className="facilities"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      marginTop: "5px",
                    }}
                  >
                    {items?.artificialTurf && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        Artificial Turf
                      </span>
                    )}
                    {items?.floodlights && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        Floodlights
                      </span>
                    )}
                    {items?.changingRooms && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        Changing Rooms
                      </span>
                    )}
                    {items?.showers && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        Showers
                      </span>
                    )}
                    {items?.parking && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        Parking
                      </span>
                    )}
                    {items?.cafeteria && (
                      <span
                        style={{
                          padding: "6px 12px",
                          background: "#0d1b2a",
                          color: "#5efc82",
                          borderRadius: "6px",
                        }}
                      >
                        Cafeteria
                      </span>
                    )}
                    {items?.firstAid && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        First Aid
                      </span>
                    )}
                    {items?.equipmentRental && (
                      <span
                        style={{
                          padding: "6px 12px",
                          color: "#0d1b2a",
                          background: "#5be27bff",
                          borderRadius: "6px",
                        }}
                      >
                        Equipment Rental
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div
                    className="match-time"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#333",
                    }}
                  >
                    <i
                      className="far fa-clock"
                      style={{ color: "#20C997" }}
                    ></i>
                    <span style={{ fontSize: "0.95rem", textAlign: "center" }}>
                      {items.contact}
                    </span>
                  </div>

                  {/* Price */}
                  <div
                    className="match-price"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    <i className="fas fa-tag" style={{ color: "#20C997" }}></i>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      NPR {items.price}/hr
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-header">
          <h2>Booking History</h2>
        </div>

        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Venue</th>
                <th>Date</th>
                <th>Price</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((items, id) => {
                return (
                  <tr key={id}>
                    <td>
                      {items.futsal.charAt(0).toUpperCase() +
                        items.futsal.slice(1)}
                    </td>
                    <td> {formatWithOrdinal(items?.createdAt)}</td>
                    <td>NPR {items.price}/hr</td>
                    <td>{items.contact}</td>
                    <td>{items.address.charAt(0).toUpperCase() + items.address.slice(1)}, {" "} 
                      {items.location.charAt(0).toUpperCase() + items.location.slice(1)}</td>
                    <td>{items.owner.charAt(0).toUpperCase() + items.owner.slice(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="section-header">
          <h2>Opponents</h2>
        </div>

        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pokhara Titans</td>
                <td>Pokhara</td>
                <td>Dec 10, 2025</td>
                <td>4:00 PM - 5:30 PM</td>
                <td>
                  <span className="status scheduled">Scheduled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="section-header">
          <h2>Teammate</h2>
        </div>

        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pokhara Titans</td>
                <td>Pokhara</td>
                <td>Dec 10, 2025</td>
                <td>4:00 PM - 5:30 PM</td>
                <td>
                  <span className="status scheduled">Scheduled</span>
                </td>
              </tr>
              <tr>
                <td>Chitwan Warriors</td>
                <td>Chitwan</td>
                <td>Dec 12, 2025</td>
                <td>6:00 PM - 7:30 PM</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>Lalitpur Strikers</td>
                <td>Lalitpur</td>
                <td>Dec 15, 2025</td>
                <td>3:00 PM - 4:30 PM</td>
                <td>
                  <span className="status cancelled">Cancelled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="bookings"
        className="booking-history"
        style={{ display: "none" }}
      >
        <div className="section-header">
          <h2>All Bookings</h2>
        </div>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}
