import axios from "axios";
import { useState, useEffect } from "react";

export default function Player() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPlayers();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const getPlayers = async () => {
    try {
      setLoading(true);
      const all = await axios.get("http://localhost:3000/api/v1/admin/players");
      setData(all.data.data.filter((items) => items.roles == "player"));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    try {
      if (!e || e.trim() === "") {
        await getPlayers();
      }

      setLoading(true);
      setSearch(e);
      const data = await axios.post(
        "http://localhost:3000/api/v1/admin/search-player",
        { value: e },
      );
      const fil = data.data.data.filter((items) => items.roles == "player");
      setData(fil);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/admin/players/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "This user has been deleted.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });
      await getPlayers();
    } catch (error) {
      setError(error.message);
    } finally {
      await getPlayers()
    }
  };
  return (
    <>
      <div className="header">
        <div className="dashboard-title" style={{ color: "gray" }}>
          Player Management
        </div>
        <div
          style={{
            width: "76%",
            padding: "20px",
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
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
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
        Loading player data...
      </div>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
          padding: "30px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {data?.map((players, id) => {
            return (
              <>
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
                      <strong>Email:</strong> {players?.email}
                    </p>
                    <p style={{ margin: "6px 0", color: "#444" }}>
                      <strong>Location:</strong>{" "}
                      {players?.location?.charAt(0).toUpperCase() +
                        players?.location?.slice(1)}
                    </p>
                    <p style={{ margin: "6px 0", color: "#444" }}>
                      <strong>Agreed to terms: </strong>
                      {players?.agreedToTerms == true ? (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 14px",
                            color: "#fffcfcff",
                            backgroundColor: "#32dd35ff",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            textAlign: "center",
                            minWidth: "60px",
                            marginLeft: "10px",
                          }}
                        >
                          Yes
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 14px",
                            color: "#ffffffff",
                            backgroundColor: "#ff0000ff",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            textAlign: "center",
                            minWidth: "60px",
                          }}
                        >
                          No
                        </span>
                      )}
                    </p>
                    <p style={{ margin: "6px 0", color: "#444" }}>
                      <strong>Contact: </strong> {players?.phone}
                    </p>
                    <p style={{ margin: "6px 0", color: "#444" }}>
                      <strong>Created on: </strong>{" "}
                      {players?.createdAt.slice(0, 10)}
                    </p>
                    <p style={{ margin: "6px 0", color: "#444" }}>
                      <strong>Created at: </strong>{" "}
                      {players?.createdAt.slice(11, 19)}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <button
                      style={{
                        flex: 1,
                        marginLeft: "8px",
                        padding: "10px",
                        background: "#ff0019ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(players._id)}
                    >
                      Delete{" "}
                      {players?.firstName?.charAt(0).toUpperCase() +
                        players?.firstName?.slice(1)}
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
