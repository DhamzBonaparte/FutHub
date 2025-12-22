import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
export default function Futsals() {
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
        "http://localhost:3000/api/v1/admin/futsals",
        {
          withCredentials: true,
        }
      );
      setFutsals(allFutsal.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (fut) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/admin/approve-futsals/${fut}`
      );
      await getFutsals();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFutsal = async (fut) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/admin/approve-futsals/${fut}`
      );
      await getFutsals();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="header">
        <div className="dashboard-title" style={{ color: "gray" }}>
          Futsal Management
        </div>
      </div>
      <div
        className="error"
        style={{
          display: error ? "block" : "none",
          fontWeight: 700,
          textAlign: "center",
          fontFamily: "Arial",
          fontSize: "1.6rem",
        }}
      >
        {error}
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
        Loading all futsals...
      </div>
      <div
        id="opponents-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {futsals?.map((futsal, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            className="opponent-card"
          >
            {/* Carousel */}
            <Carousel>
              {futsal.images.map((img, index) => (
                <Carousel.Item interval={2000} key={index}>
                  <img
                    src={`http://localhost:3000${img}`}
                    alt={futsal.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Card Details */}
            <div
              style={{
                padding: "16px",
                height: "100%",
              }}
            >
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  marginBottom: "10px",
                  color: "#1B2626",
                }}
              >
                {futsal.futsal.charAt(0).toUpperCase() + futsal.futsal.slice(1)}
              </h2>

              <p
                style={{ margin: "6px 0", color: "#444", fontSize: "0.95rem" }}
              >
                <strong>Owner:</strong>{" "}
                {futsal.owner.charAt(0).toUpperCase() + futsal.owner.slice(1)}
              </p>
              <p
                style={{ margin: "6px 0", color: "#444", fontSize: "0.95rem" }}
              >
                <strong>Email:</strong> {futsal.email}
              </p>
              <p
                style={{ margin: "6px 0", color: "#444", fontSize: "0.95rem" }}
              >
                <strong>Price:</strong> Rs. {futsal.price} per hour
              </p>
              <p
                style={{ margin: "6px 0", color: "#444", fontSize: "0.95rem" }}
              >
                <strong>Location:</strong>{" "}
                {futsal.address.charAt(0).toUpperCase() +
                  futsal.address.slice(1)}
                ,{" "}
                {futsal.location.charAt(0).toUpperCase() +
                  futsal.location.slice(1)}
              </p>
              <p
                style={{ margin: "6px 0", color: "#444", fontSize: "0.95rem" }}
              >
                <strong>Capacity:</strong> {futsal.capacity}-a-side
              </p>
              <p
                style={{ margin: "6px 0", color: "#444", fontSize: "0.95rem" }}
              >
                <strong>Contact:</strong> {futsal.contact}
              </p>

              {/* Facilities */}
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

              {/* About */}
              <p
                style={{
                  marginTop: "10px",
                  color: "#444",
                  fontSize: "0.95rem",
                }}
              >
                <strong>About:</strong>{" "}
                {futsal.about.charAt(0).toUpperCase() + futsal.about.slice(1)}
              </p>

              {/* Button */}
              <button
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "10px",
                  color: futsal.approved ? "white" : "#20c928ff",
                  background: futsal.approved ? "gray" : "black",
                  cursor: futsal.approved ? "not-allowed" : "pointer",
                  opacity: futsal.approved ? 0.6 : 1,
                  pointerEvents: futsal.approved ? "none" : "auto",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  transition: "background 0.2s ease",
                  bottom: 0,
                }}
                onClick={() => handleApprove(futsal.userId)}
              >
                {futsal.approved ? "Already Approved" : "Approve Futsal"}
              </button>
              <button
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  bottom: 0,
                  background: "#f35345ff", // soft red background
                  color: "#f5f5f5ff",
                }}
                onClick={() => deleteFutsal(futsal.userId)}
              >
                Delete Futsal
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
