import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function BookFutsal() {
  const [loading, setLoading] = useState(false);
  const [booking, setBookings] = useState([]);
  const [err, setErr] = useState("");
  const [time, setTime] = useState("");
  const [approved, setApproved] = useState(false);
  const [data, setData] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  const getFutsal = async () => {
    try {
      const check = await axios.get(
        `${url}/owner/check-owner`,
        { withCredentials: true },
      );
      setApproved(check.data.data.approved);
    } catch (error) {
      console.log("Error");
    }
  };

  const getBookings = async () => {
    try {
      setLoading(true);
      const check = await axios.get(
        `${url}/owner/get-Bookings`,
        { withCredentials: true },
      );

      const bookings = check?.data?.data.flatMap((items) =>
        items.bookings.map((b) => ({
          userId: b.userId,
          timeSlot: b.timeSlot,
          isApproved: b.isApproved,
        })),
      );

      setBookings(bookings);

      const allBookers = [];
      for (const booking of bookings) {
        const hi = await axios.get(
          `${url}/owner/showBookers/${booking.userId}`,
          { withCredentials: true },
        );
        const user = hi?.data?.msg[0];
        allBookers.push({
          ...user,
          timeSlot: booking.timeSlot,
          isApproved: booking.isApproved,
        });
        console.log(hi);
      }
      setData(allBookers);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id, timeSlot) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it",
        cancelButtonText: "No, keep it",
      });

      if (!result.isConfirmed) {
        return;
      }

      await axios.patch(
        `${url}/owner/rejectBooking`,
        { id, timeSlot },
        { withCredentials: true },
      );

      await getBookings();

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

  const handleApprove = async (id, time) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to approve this booking for ${time}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) {
        return;
      }

      const hi = await axios.patch(
        `${url}/owner/approveTime/${id}`,
        { time },
        { withCredentials: true },
      );

      await getBookings();

      await Swal.fire({
        icon: "success",
        title: "Approved",
        text: "The booking has been approved successfully.",
        confirmButtonColor: "#28a745",
        confirmButtonText: "OK",
      });

      console.log(hi);
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while approving the booking.",
      });
    }
  };

  useEffect(() => {
    getBookings();
    getFutsal();
  }, []);
  return (
    <>
      <div
        className="msg"
        style={{
          display: approved || loading ? "none" : "block",
          backgroundColor: "#fff3cd",
          color: "#856404",
          border: "1px solid #ffeeba",
          borderRadius: "6px",
          padding: "12px 20px",
          margin: "20px auto",
          maxWidth: "600px",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: 500,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        You will be able to access this page once our team approves your futsal.
      </div>
      <div
        className="header"
        style={{
          display: approved ? "block" : "none",
        }}
      >
        <div
          className="dashboard-title"
          style={{
            color: "gray",
            filter: approved ? "blur(0px)" : "blur(9px)",
          }}
        >
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
          filter: approved ? "blur(0px)" : "blur(9px)",
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
                <button
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: !players.isApproved ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                    background: !players.isApproved
                      ? "linear-gradient(135deg, #28a745, #218838)"
                      : "#e0e0e0",
                    color: !players.isApproved ? "#fff" : "#7a7a7a",
                    boxShadow: players.isApproved
                      ? "0 4px 6px rgba(0,0,0,0.1)"
                      : "none",
                    opacity: !players.isApproved ? 1 : 0.7,
                  }}
                  onClick={() => handleApprove(players?._id, players?.timeSlot)}
                  disabled={players.isApproved || !approved}
                >
                  {players.isApproved ? "Approved" : "Approve"}
                </button>
                <button
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "15px",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    background: "linear-gradient(135deg, #dc3545, #a71d2a)", // vibrant red gradient
                    color: "#fff",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    opacity: 1,
                    cursor: "pointer",
                  }}
                  disabled={!approved}
                  onClick={() => handleReject(players?._id, players?.timeSlot)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
