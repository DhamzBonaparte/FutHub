import axios from "axios";
import { useEffect, useState } from "react";

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
  const [showDetails, setShowDetails] = useState(false);
  const [owners, setOwners] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(
        `http://localhost:3000/api/v1/admin/owners/${id}`
      );
      console.log(del);
      await getOwners();
    } catch (Err) {
      setErr(Err.message);
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
          Futsal Management
        </h1>

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
          Loading owner data...
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            overflowX: "auto",
            // display:showDetails?"none":"block"
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
  ${owner.lastName.charAt(0).toUpperCase()}${owner.lastName.slice(1)}`}
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
                        background: "#2dd05bff",
                        borderRadius: "10px",
                        height: "60px",
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => handleDetails(owner._id)}
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
    </>
  );
}
