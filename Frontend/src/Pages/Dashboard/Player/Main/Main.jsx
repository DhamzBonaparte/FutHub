import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

const formatTo12Hour = (timeStr) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

export default function Main() {
  useEffect(() => {
    getMyBookings();
    getMyOpponents();
    getMyTeammates();
  }, []);

  const [opponents, setOpponents] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [matches, setMatches] = useState(0);
  const [opp, setOpp] = useState(0);
  const [tem, setTem] = useState(0);
  const [err, setErr] = useState("");

  console.log(bookings);
  const url = import.meta.env.VITE_API_URL;

  const getMyBookings = async () => {
    try {
      setLoading(true);
      const hi = await axios.get(`${url}/player/myBookings`, {
        withCredentials: true,
      });
      setBookings(hi.data.data);
      setId(hi.data.userId);

      const myBookings = hi.data.data.flatMap((f) =>
        f.bookings.filter((b) => {
          console.log(
            "Comparing booking userId:",
            b.userId,
            "with id:",
            hi.data.userId,
          );
          return String(b.userId) === String(hi.data.userId);
        }),
      );

      console.log("My bookings:", myBookings);

      setMatches(hi.data.data.length);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBookings = async (id, bid) => {
    try {
      // Ask for confirmation first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it",
        cancelButtonText: "No, keep it",
      });

      if (!result.isConfirmed) {
        return; // user cancelled
      }

      // Proceed only if confirmed
      await axios.patch(
        `${url}/player/myBookings`,
        { id, bid },
        { withCredentials: true },
      );

      await getMyBookings();

      Swal.fire({
        icon: "error",
        title: "Cancelled",
        text: "Your booking has been cancelled.",
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setErr(error.message);
    }
  };

  const getMyOpponents = async () => {
    try {
      setLoading(true);
      const hi = await axios.get(`${url}/player/myOpponents`, {
        withCredentials: true,
      });
      setOpponents(hi.data.data);
      setOpp(hi.data.data.length);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Frontend id in render:", id, typeof id);
  }, [id]);

  const handleCancelOpponents = async (id) => {
    try {
      // Ask for confirmation first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this opponent?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep",
      });

      if (!result.isConfirmed) {
        return; // user cancelled
      }

      // Proceed only if confirmed
      await axios.patch(
        `${url}/player/myOpponents`,
        { id },
        { withCredentials: true },
      );

      await getMyOpponents();

      Swal.fire({
        icon: "error",
        title: "Cancelled",
        text: "Opponent has been cancelled.",
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setErr(error.message);
    }
  };

  const getMyTeammates = async () => {
    try {
      setLoading(true);
      const hi = await axios.get(`${url}/player/myTeammates`, {
        withCredentials: true,
      });
      setTeammates(hi.data.data);
      setTem(hi.data.data.length);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTeammates = async (id) => {
    try {
      // Ask for confirmation first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this teammate?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep",
      });

      if (!result.isConfirmed) {
        return; // user cancelled
      }

      // Proceed only if confirmed
      await axios.patch(
        `${url}/player/myTeammates`,
        { id },
        { withCredentials: true },
      );

      await getMyTeammates();

      Swal.fire({
        icon: "error",
        title: "Cancelled",
        text: "Teammate has been cancelled.",
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setErr(error.message);
    }
  };

  console.log(bookings);

  return (
    <>
      <div className="header">
        <div className="dashboard-title">Player Dashboard</div>
      </div>
      <div
        className="load"
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "30px",
          display: loading ? "block" : "none",
        }}
      >
        Loading Dashboard Details...
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
              <FavoriteIcon className="bigIcon" />
            </div>
            <div className="stat-title">Upcoming Teammates</div>
            <div className="stat-value">{tem}</div>
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
            <div className="stat-title">Upcoming Opponents</div>
            <div className="stat-value">{opp}</div>
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
          <div
            className="no"
            style={{
              display: matches == 0 ? "block" : "none",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: 600 }}>
              No futsals booked
            </p>
          </div>
          {bookings?.map((items, index) => {
            return (
              <div
                className="match-card"
                key={items._id}
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
                      {formatWithOrdinal(items?.createdAt).slice(5, 8)},{" "}
                      {items?.createdAt.slice(0, 4)}
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
                      {items.address.charAt(0).toUpperCase() +
                        items.address.slice(1)}
                      ,{" "}
                      {items.location.charAt(0).toUpperCase() +
                        items.location.slice(1)}
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
                          color: "#0d1b2a",
                          background: "#5be27bff",
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
                  {/* time */}
                  <div
                    className="match-time"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i
                      className="far fa-clock"
                      style={{ color: "#20C997" }}
                    ></i>
                    <span style={{ fontSize: "0.95rem", fontWeight: "bold" }}>
                      {items.bookings
                        ?.filter((b) => String(b.userId) === String(id))
                        .map((b, i) => (
                          <span key={i} style={{ display: "block" }}>
                            {b.timeSlot}{" "}
                            <span
                              style={{
                                color: b.isApproved ? "green" : "red",
                              }}
                            >
                              {b.isApproved ? "(Approved)" : "(Not Approved)"}
                            </span>
                          </span>
                        ))}
                      {items.bookings?.filter(
                        (b) => String(b.userId) === String(id),
                      ).length === 0 && "No slots found"}
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
                  {items.bookings
                    .filter((b) => String(b.userId) === String(id))
                    .map((b, i) => (
                      <div key={b._id} style={{ marginBottom: "8px" }}>
                        <button
                          onClick={() => handleCancelBookings(items._id, b._id)}
                          style={{
                            background: "#d9534f",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "10px 18px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#c9302c")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#d9534f")
                          }
                        >
                          Cancel {b.timeSlot}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
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
                <th>Average age</th>
                <th>Contact</th>
                <th>Venue</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {opponents?.map((items, id) => {
                return (
                  <tr key={id}>
                    <td>
                      {items.teamName.charAt(0).toUpperCase() +
                        items.teamName.slice(1)}
                    </td>
                    <td>
                      {items.location.charAt(0).toUpperCase() +
                        items.location.slice(1)}
                    </td>
                    <td>
                      {formatWithOrdinal(items.matchDate)},
                      {items.matchDate.slice(0, 4)}
                    </td>
                    <td>
                      {formatTo12Hour(items?.timeFrom)} -{" "}
                      {formatTo12Hour(items?.timeTo)}
                    </td>
                    <td>{items.averageAge} years</td>
                    <td>{items.contact}</td>
                    <td>
                      {items.venue.charAt(0).toUpperCase() +
                        items.venue.slice(1)}
                    </td>
                    <td>
                      {items.gender.charAt(0).toUpperCase() +
                        items.gender.slice(1)}
                    </td>
                    <td>
                      <button
                        style={{
                          background: "#d9534f",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "10px 18px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#c9302c")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#d9534f")
                        }
                        onClick={() => handleCancelOpponents(items._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {opp === 0 && (
            <div className="no" style={{ padding: "10px" }}>
              <p style={{ fontSize: "20px", fontWeight: 600 }}>
                No opponents Selected
              </p>
            </div>
          )}
        </div>
        <div className="section-header">
          <h2>Teammate</h2>
        </div>
        {/* header */}
        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Position</th>
                <th>Experience</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {teammates?.map((items, id) => {
                return (
                  <tr key={id}>
                    <td>
                      {items.name.charAt(0).toUpperCase() + items.name.slice(1)}
                    </td>
                    <td>
                      {items.location.charAt(0).toUpperCase() +
                        items.location.slice(1)}
                    </td>
                    <td>{items.age} years </td>
                    <td>{items.contact}</td>
                    <td>
                      {items.position.charAt(0).toUpperCase() +
                        items.position.slice(1)}
                    </td>
                    <td>{items.experience} years</td>
                    <td>
                      {items.gender.charAt(0).toUpperCase() +
                        items.gender.slice(1)}
                    </td>
                    <td>
                      <button
                        style={{
                          background: "#d9534f", // red tone for cancel
                          color: "#fff", // white text
                          border: "none",
                          borderRadius: "6px",
                          padding: "10px 18px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#c9302c")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#d9534f")
                        }
                        onClick={() => handleCancelTeammates(items._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {tem === 0 && (
            <div className="no" style={{ padding: "10px" }}>
              <p style={{ fontSize: "20px", fontWeight: 600 }}>
                No teammates selected
              </p>
            </div>
          )}
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
