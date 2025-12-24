import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function BookFutsal() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [time, setTime] = useState("");
  const [data, setData] = useState([]);

  const getBookings = async () => {
    try {
      setLoading(true);
      const check = await axios.get(
        "http://localhost:3000/api/v1/owner/get-Bookings",
        { withCredentials: true }
      );

      const bookings = check?.data?.data.flatMap((items) =>
        items.bookings.map((b) => ({
          userId: b.userId,
          timeSlot: b.timeSlot,
        }))
      );

      const allBookers = [];
      for (const booking of bookings) {
        const hi = await axios.get(
          `http://localhost:3000/api/v1/owner/showBookers/${booking.userId}`,
          { withCredentials: true }
        );
        const user = hi?.data?.msg[0];
        allBookers.push({ ...user, timeSlot: booking.timeSlot });
      }      
      setData(allBookers);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);
  return (
    <>
      <div className="header">
        <div className="dashboard-title" style={{ color: "gray" }}>
          Booked Futsals
        </div>
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
        Loading details...
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {data?.map((players, id) => {
          return (
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              key={id}
            >
              <div
                style={{
                  backgroundColor: "#ff5733",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: "#fff",
                }}
                key={id}
              >
                {players?.firstName?.charAt(0).toUpperCase()}
              </div>

              <div style={{ padding: "16px", flexGrow: 1 }}>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#1B2626",
                  }}
                >
                  {players?.firstName &&
                    players?.lastName &&
                    `${players.firstName
                      .charAt(0)
                      .toUpperCase()}${players.firstName.slice(1)} 
                        ${players.lastName
                          .charAt(0)
                          .toUpperCase()}${players.lastName.slice(1)}`}
                </h2>
                <p style={{ margin: "6px 0", color: "#444" }}>
                  <strong>Booked Time:</strong> {players?.timeSlot}
                </p>
                <p style={{ margin: "6px 0", color: "#444" }}>
                  <strong>Email:</strong> {players?.email}
                </p>
                <p style={{ margin: "6px 0", color: "#444" }}>
                  <strong>Location:</strong>{" "}
                  {players?.location?.charAt(0).toUpperCase() +
                    players?.location?.slice(1)}
                </p>
                <p style={{ margin: "6px 0", color: "#444" }}>
                  <strong>Contact: </strong> {players?.phone}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
