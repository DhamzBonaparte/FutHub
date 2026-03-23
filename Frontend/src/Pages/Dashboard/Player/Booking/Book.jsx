import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Swal from "sweetalert2";

export default function Book() {
  useEffect(() => {
    getFutsals();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [futsals, setFutsals] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({ id: null, time: null });

  const alltimes = [
    "6-7 AM",
    "7-8 AM",
    "8-9 AM",
    "9-10 AM",
    "10-11 AM",
    "11-12 AM",
    "12-1 PM",
    "1-2 PM",
    "2-3 PM",
    "3-4 PM",
    "4-5 PM",
    "5-6 PM",
    "6-7 PM",
    "7-8 PM",
    "8-9 PM",
    "9-10 PM",
  ];

  const handleSearch = async (sea) => {
    setLoading(true);
    try {
      if (!sea || sea.trim() === "") {
        await getFutsals();
      }
      const se = await axios.post(
        "http://localhost:3000/api/v1/player/search-futsal",
        { search },
        { withCredentials: true },
      );
      setFutsals(se.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getFutsals = async () => {
    setLoading(true);
    try {
      const allFutsal = await axios.get(
        "http://localhost:3000/api/v1/player/book-futsal",
        { withCredentials: true },
      );
      setFutsals(allFutsal.data.data);
      console.log(allFutsal.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      if (!selected.time || selected.id !== id) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please select a time slot for this specific futsal!",
          confirmButtonColor: "#4CAF50",
        });
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to confirm booking for: ${selected.time}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) {
        return;
      }

      await axios.patch(
        "http://localhost:3000/api/v1/player/confirm-futsal",
        { id, selected: selected.time },
        { withCredentials: true },
      );

      setSelected({ id: null, time: null });
      await getFutsals();

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        text: `You chose: ${selected.time}`,
        confirmButtonColor: "#2196F3",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelect = (futsalId, time) => {
    if (selected.id === futsalId && selected.time === time) {
      setSelected({ id: null, time: null });
    } else {
      setSelected({ id: futsalId, time: time });
    }
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px 25px",
    width: "320px",
    margin: "20px",
    fontFamily: "Segoe UI, sans-serif",
    transition: "transform 0.2s ease",
  };

  const headingStyle = {
    marginTop: 0,
    fontSize: "20px",
    color: "#333",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  };

  const textStyle = {
    margin: "8px 0",
    fontSize: "15px",
    color: "#444",
  };

  return (
    <>
      <div className="header" style={{ textAlign: "center" }}>
        <div className="dashboard-title">Booking Futsal</div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          maxWidth: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Search location..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <button
          style={{
            background: "#0d1b2a",
            color: "#5efc82",
            padding: "12px 30px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </div>
      <div
        className="loadi"
        style={{
          display: loading ? "block" : "none",
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "Arial",
          fontSize: "1.6rem",
        }}
      >
        Loading Available futsals...
      </div>
      <div className="opponents-grid" id="opponents-grid">
        {futsals?.map((futsal, i) => (
          <div
            className="opponent-card"
            key={i}
            style={{ display: futsal.approved ? "block" : "none" }}
          >
            <div className="opponent-details">
              <Carousel>
                {futsal.images.map((img, index) => (
                  <Carousel.Item
                    interval={1000}
                    key={index}
                    style={{ height: "250px" }}
                  >
                    <img
                      src={`http://localhost:3000${img}`}
                      alt={futsal.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "10px",
                        display: "block",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div style={cardStyle}>
                <h2 style={headingStyle}>
                  {futsal.futsal.charAt(0).toUpperCase() +
                    futsal.futsal.slice(1)}
                </h2>
                <p style={textStyle}>
                  <span>
                    <strong>Location: </strong>
                    {futsal.address.charAt(0).toUpperCase() +
                      futsal.address.slice(1)}
                    ,{" "}
                    {futsal.location.charAt(0).toUpperCase() +
                      futsal.location.slice(1)}
                  </span>
                </p>
                <p style={textStyle}>
                  <span>
                    <strong>Capacity: </strong>
                    {futsal.capacity}-a-side
                  </span>
                </p>

                <p style={textStyle}>
                  <span>
                    <strong>Contact: </strong>
                    {futsal.contact}
                  </span>
                </p>

                <p
                  style={{
                    fontWeight: "bold",
                    marginTop: "10px",
                    marginBottom: "5px",
                    color: "#1B2626",
                  }}
                >
                  Facilities:
                </p>
                <ul
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px",
                    listStyleType: "none",
                    paddingLeft: 0,
                    margin: 0,
                  }}
                >
                  {[
                    futsal.artificialTurf && "Artificial Turf",
                    futsal.floodlights && "Floodlights",
                    futsal.changingRooms && "Changing Rooms",
                    futsal.showers && "Showers",
                    futsal.parking && "Parking",
                    futsal.cafeteria && "Cafeteria",
                    futsal.firstAid && "First Aid",
                    futsal.equipmentRental && "Equipment Rental",
                  ]
                    .filter(Boolean)
                    .map((facility, index) => (
                      <li
                        key={index}
                        style={{
                          background: "#f4f6f8",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          fontSize: "0.9rem",
                          color: "#1B2626",
                        }}
                      >
                        {facility}
                      </li>
                    ))}
                </ul>

                <div
                  className="times"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    maxWidth: "400px",
                    margin: "20px auto",
                  }}
                >
                  {alltimes.map((time, index) => {
                    const isBooked = futsal.bookings?.some(
                      (b) => b.timeSlot === time,
                    );

                    const isCurrentSelection =
                      selected.id === futsal._id && selected.time === time;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelect(futsal._id, time)}
                        disabled={isBooked || futsal.underMaintenance}
                        style={{
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderRadius: "6px",
                          border: isCurrentSelection
                            ? "2px solid #555"
                            : "1px solid #4CAF50",
                          cursor: isBooked || futsal.underMaintenance? "not-allowed" : "pointer",
                          background: isBooked || futsal.underMaintenance
                            ? "#d3d3d3"
                            : isCurrentSelection
                              ? "#d3d3d3"
                              : "#e8f5e9",
                          color: isBooked || futsal.underMaintenance
                            ? "#000"
                            : isCurrentSelection
                              ? "#000"
                              : "#2e7d32",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                <p style={textStyle}>
                  <span>
                    <strong>About: </strong>
                    {futsal.about.charAt(0).toUpperCase() +
                      futsal.about.slice(1)}
                  </span>
                </p>
                <button
                  style={{
                    marginTop: "15px",
                    padding: "8px 12px",
                    background: futsal.underMaintenance ? "#d6d6d6" : "#0d1b2a", 
                    color: futsal.underMaintenance
                      ? "#7a7a7a"
                      : "rgba(86, 236, 98, 1)", 
                    border: "none",
                    borderRadius: "6px",
                    cursor: futsal.underMaintenance ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    transition: "background 0.3s ease",
                    opacity: futsal.underMaintenance ? 0.7 : 1,
                  }}
                  onClick={() => handleConfirm(futsal._id)}
                  disabled={futsal.underMaintenance}
                >
                  <span>
                    {futsal.underMaintenance
                      ? "Under Maintenance"
                      : "Book Futsal"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
