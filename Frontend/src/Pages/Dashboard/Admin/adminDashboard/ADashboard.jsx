import axios from "axios";
import { useEffect, useState } from "react";

export default function ADashboard() {
  useEffect(() => {
    getPlayers();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState(0);
  const [players, setPlayers] = useState(0);
  const [pending, setPending] = useState(0);
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const getPlayers = async () => {
    try {
      setLoading(true);
      const all = await axios.get("http://localhost:3000/api/v1/admin/players");
      const player = all.data.data.filter((items) => items.roles == "player");
      const owner = all.data.data.filter((items) => items.roles == "owner");
      setPlayers(player);
      setOwners(owner);
      setAllUsers(all);

      const pending = await axios.get(
        "http://localhost:3000/api/v1/admin/futsals"
      );
      const pend = pending.data.data.filter(
        (items) => items.approved === false
      );
      setPending(pend);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="content">
        <div className="dashboard" id="dashboard">
          <div className="header">
            <div className="dashboard-title" style={{ color: "gray" }}>
              Admin Dashboard
            </div>
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
          Loading Dashboard...
        </div>

        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            fontFamily: "Segoe UI, sans-serif",
            backgroundColor: "#f4f6f8",
          }}
        >
          <main style={{ flex: 1, padding: "30px" }}>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#20C997",
                    marginBottom: "10px",
                  }}
                >
                  Owners
                </h3>
                <p
                  style={{ fontSize: "2rem", fontWeight: "700", color: "#333" }}
                >
                  {owners?.length}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#20C997",
                    marginBottom: "10px",
                  }}
                >
                  Players
                </h3>
                <p
                  style={{ fontSize: "2rem", fontWeight: "700", color: "#333" }}
                >
                  {players?.length}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "#20C997",
                    marginBottom: "10px",
                  }}
                >
                  Pending Approvals
                </h3>
                <p
                  style={{ fontSize: "2rem", fontWeight: "700", color: "#333" }}
                >
                  {pending?.length}
                </p>
              </div>
            </section>

            <section
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
                  <tr style={{ backgroundColor: "#20C997", color: "#fff" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      S.N
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Name
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Email
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Role
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Address
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Phone
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Created on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.data?.data?.map((items, id) => {
                    return (
                      <>
                        <tr style={{ borderBottom: "1px solid #eee" }} key={id}>
                          <td style={{ padding: "14px 20px" }}>{id + 1}</td>
                          <td style={{ padding: "14px 20px" }}>
                            {items?.firstName?.charAt(0)?.toUpperCase() +
                              items?.firstName?.slice(1) +
                              " " +
                              items?.lastName?.charAt(0)?.toUpperCase() +
                              items?.lastName?.slice(1)}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            {items.email}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <span
                              style={{
                                color:
                                  items?.roles == "owner" ? "red" : "green",
                              }}
                            >
                              {items?.roles?.charAt(0).toUpperCase() +
                                items?.roles?.slice(1)}
                            </span>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            {items?.location?.charAt(0).toUpperCase() +
                              items?.location?.slice(1)}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            {items?.phone}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            {items?.createdAt.slice(0, 10)}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
