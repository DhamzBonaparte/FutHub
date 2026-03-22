import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Owner() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getOwners();
  }, []);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");

  const getOwners = async () => {
    try {
      setLoading(true);
      const all = await axios.get("http://localhost:3000/api/v1/admin/owners");
      setOwners(all.data.data.filter((items) => items.roles === "owner"));
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    try {
      if (!e || e.trim() === "") {
        await getOwners();
      }

      setLoading(true);
      setSearch(e);
      const data = await axios.post(
        "http://localhost:3000/api/v1/admin/search-player",
        { value: e },
      );
      const fil = data.data.data.filter((items) => items.roles == "owner");
      setOwners(fil);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this futsal owner?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) {
        return; // user cancelled
      }

      await axios.delete(`http://localhost:3000/api/v1/admin/owners/${id}`);

      await Swal.fire({
        title: "Deleted!",
        text: "This Futsal has been deleted.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });

      await getOwners();
    } catch (Err) {
      setErr(Err.message);
    }
  };

  const handleDetails = async (email) => {
    try {
      setLoading(true);
      setShowDetails(true);

      const hi = await axios.post("http://localhost:3000/api/v1/admin/owners", {
        email,
      });

      setData(hi?.data?.details || []);
    } catch (err) {
      setShowDetails(false);
      setErr(err.message);

      if (err.response?.status === 404) {
        setData([]);
        alert("No futsal registered");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          padding: "40px",
          fontFamily: "Segoe UI, sans-serif",
          display: showDetails ? "none" : "block",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "gray",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Owner Management
        </h1>
        <div
          style={{
            width: "100%",
            padding: "20px",
            backgroundColor: "#f9fafb",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search owners, futsals, or locations..."
            style={{
              width: "100%",
              maxWidth: "800px",
              padding: "14px 20px",
              borderRadius: "30px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 0 3px rgba(32, 201, 151, 0.4)")
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)")
            }
            // value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div
          className="loadi"
          style={{
            display: loading ? "block" : "none",
            fontWeight: 700,
            textAlign: "center",
            fontFamily: "Arial",
            fontSize: "1.6rem",
            marginBottom: "20px",
          }}
        >
          Loading owner data...
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.95rem",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#20C997",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "14px 20px" }}>ID</th>
                <th style={{ padding: "14px 20px" }}>Name</th>
                <th style={{ padding: "14px 20px" }}>Email</th>
                <th style={{ padding: "14px 20px" }}>Location</th>
                <th style={{ padding: "14px 20px" }}>Contact</th>
                <th style={{ padding: "14px 20px" }}>Created On</th>
                <th style={{ padding: "14px 20px" }}>Agreed to Terms</th>
                <th style={{ padding: "14px 20px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {owners?.map((owner, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                    transition: "background 0.2s ease",
                  }}
                >
                  <td style={{ padding: "14px 20px", fontWeight: "600" }}>
                    {owner._id}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#444" }}>
                    {owner?.firstName &&
                      owner?.lastName &&
                      `${owner.firstName
                        .charAt(0)
                        .toUpperCase()}${owner.firstName.slice(1)} 
                     ${owner.lastName
                       .charAt(0)
                       .toUpperCase()}${owner.lastName.slice(1)}`}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#444" }}>
                    {owner.email}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#444" }}>
                    {owner.location}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#444" }}>
                    {owner.phone}
                  </td>
                  <td style={{ padding: "14px 20px", color: "#444" }}>
                    {owner.createdAt.slice(0, 10)}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        backgroundColor: !owner.agreed ? "#2ecc71" : "#f28b82",
                        color: "#fff",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Yes
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <button
                      style={{
                        background: "#f28b82",
                        color: "#fff",
                        border: "none",
                        width: "100%",
                        borderRadius: "6px",
                        padding: "8px 14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      onClick={() => handleDelete(owner._id)}
                    >
                      Delete
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
                        background: "#41c312ff",
                        color: "#f5f5f5ff",
                      }}
                      onClick={() => handleDetails(owner.email)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* show details */}
      <div
        style={{
          backgroundColor: "#f4f6f8",
          padding: "40px",
          fontFamily: "Segoe UI, sans-serif",
          justifyContent: "center",
          display: showDetails ? "flex" : "none",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            maxWidth: "900px",
            width: "100%",
            padding: "30px",
          }}
        >
          {/* Header */}
          <h1
            style={{
              marginBottom: "20px",
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#20C997",
              textAlign: "center",
            }}
          >
            {data?.futsal?.charAt(0)?.toUpperCase() + data?.futsal?.slice(1)} —
            Details
          </h1>

          {/* Owner & Contact Info */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ margin: "6px 0", color: "#444" }}>
              <strong>Owner:</strong>{" "}
              {data?.owner?.charAt(0).toUpperCase() + data?.owner?.slice(1)}
            </p>
            <p style={{ margin: "6px 0", color: "#444" }}>
              <strong>Email:</strong> {data?.email}
            </p>
            <p style={{ margin: "6px 0", color: "#444" }}>
              <strong>Contact:</strong> {data?.contact}
            </p>
            <p style={{ margin: "6px 0", color: "#444" }}>
              <strong>Address:</strong>{" "}
              {data?.address?.charAt(0).toUpperCase() + data?.address?.slice(1)}
            </p>
          </div>

          {/* Facilities */}
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              marginBottom: "12px",
              color: "#1B2626",
            }}
          >
            Facilities
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor:
                  data?.artificialTurf == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Artificial Turf: {data?.artificialTurf == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor:
                  data?.floodlights == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Floodlights: {data?.floodlights == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor:
                  data?.changingRooms == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Changing Showers: {data?.changingRooms == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor: data?.showers == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Showers: {data?.showers == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor: data?.parking == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Parking: {data?.parking == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor:
                  data?.cafeteria == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Cafeteria: {data?.cafeteria == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor: data?.firstAid == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              First Aid: {data?.firstAid == true ? "Yes" : "No"}
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "8px 14px",
                backgroundColor:
                  data?.equipmentRental == true ? "#2ecc71" : "#f28b82",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Rental Equipment: {data?.equipmentRental == true ? "Yes" : "No"}
            </span>
          </div>

          {/* Pricing & Capacity */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ margin: "6px 0", color: "#444" }}>
              <strong>Price:</strong> Rs. {data?.price} per hour
            </p>
            <p style={{ margin: "6px 0", color: "#444" }}>
              <strong>Capacity:</strong> {data?.capacity}-a-side
            </p>
          </div>

          {/* About */}
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#1B2626",
              }}
            >
              About
            </h2>
            <p style={{ color: "#444", lineHeight: "1.5" }}>
              {data?.about?.charAt(0).toUpperCase() + data?.about?.slice(1)}
            </p>
          </div>

          {/* Approval Status */}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor:
                  data?.approved === true ? "#2ecc71" : "#c43007ff",
                color: "#fff",
                borderRadius: "25px",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {data?.approved === true ? "Approved" : "Not Approved"}
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "#c43007ff",
                color: "#fff",
                borderRadius: "25px",
                fontSize: "1rem",
                fontWeight: "600",
                width: "100%",
                marginTop: "20px",
              }}
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
