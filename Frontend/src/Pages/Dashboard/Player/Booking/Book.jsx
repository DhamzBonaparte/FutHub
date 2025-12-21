import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

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

  const getFutsals = async () => {
    setLoading(true);
    try {
      const allFutsal = await axios.get(
        "http://localhost:3000/api/v1/player/book-futsal",
        { withCredentials: true }
      );
      setFutsals(allFutsal.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.patch(
        "http://localhost:3000/api/v1/player/confirm-futsal",
        { id },
        { withCredentials: true }
      );
      await getFutsals();
    } catch (error) {
      setError(error.message);
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
          <div className="opponent-card" key={i}>
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

              {/* Booking card */}
              <div style={cardStyle}>
                <h2 style={headingStyle}>
                  {futsal.futsal.charAt(0).toUpperCase() +
                    futsal.futsal.slice(1)}
                </h2>
                <p style={textStyle}>
                  <span>
                    <strong>Owner:</strong>{" "}
                    {futsal.owner.charAt(0).toUpperCase() +
                      futsal.owner.slice(1)}
                  </span>
                </p>
                <p style={textStyle}>
                  <span>
                    <strong>Location: </strong>
                    {futsal.address.charAt(0).toUpperCase() + futsal.address.slice(1)}, {" "} 
                      {futsal.location.charAt(0).toUpperCase() + futsal.location.slice(1)}
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

                <p style={textStyle}>
                  <span>
                    <strong>About: </strong>
                    {futsal.about.charAt(0).toUpperCase() +
                      futsal.about.slice(1)}
                  </span>
                </p>
                <button
                disabled={!!futsal.bookedBy}
                  style={{
                    marginTop: "15px",
                    padding: "8px 12px",
                    background: futsal.bookedBy ? "#d3d3d3" : "#0d1b2a", // grey if booked
                    color: futsal.bookedBy ? "#888" : "rgba(86, 236, 98, 1)", // muted text if booked
                    border: "none",
                    borderRadius: "6px",
                    cursor: futsal.bookedBy ? "not-allowed" : "pointer", // blocked cursor if booked
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    transition: "background 0.3s ease",
                  }}
                  onClick={() => handleConfirm(futsal._id)}
                >
                  {futsal.bookedBy ? "Already Booked" : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
