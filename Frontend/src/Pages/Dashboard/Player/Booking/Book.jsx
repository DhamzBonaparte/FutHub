import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Book() {
  useEffect(() => {
    getFutsals();
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

  console.log(futsals?.map((i) => i));

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

  const statusStyle = {
    padding: "3px 8px",
    borderRadius: "5px",
    fontWeight: "bold",
    // backgroundColor:
    //   booking.status === "Confirmed" ? "#d4edda" : "#fff3cd",
    // color: booking.status === "Confirmed" ? "#155724" : "#856404",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "8px 12px",
    background: "#0d1b2a",
    color: "rgba(86, 236, 98, 1)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
                    {futsal.address.charAt(0).toUpperCase() +
                      futsal.address.slice(1)}
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

                <div style={{ marginTop: "10px" }}>
                  <p
                    style={{
                      ...textStyle,
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Facilities:
                  </p>
                  <ul
                    style={{
                      ...textStyle,
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
                        <li key={index} style={{ marginBottom: "4px" }}>
                          ✅ {facility}
                        </li>
                      ))}
                  </ul>
                </div>

                <p style={textStyle}>
                  <span>
                    <strong>About: </strong>
                    {futsal.about.charAt(0).toUpperCase() +
                      futsal.about.slice(1)}
                  </span>
                </p>
                <button style={buttonStyle}>Book Futsal</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
