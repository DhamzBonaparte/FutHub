import DomainIcon from "@mui/icons-material/Domain";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import { PieChart, Pie, Legend, Cell } from "recharts";
import axios from "axios";
import EngineeringIcon from "@mui/icons-material/Engineering";
import useBookers from "../../../../Hooks/useBookers";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";

export default function OMain() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    getFutsal();
  }, []);

  const { datas } = useBookers();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);

  const getFutsal = async () => {
    setLoading(true);
    try {
      const check = await axios.get(
        "http://localhost:3000/api/v1/owner/check-owner",
        { withCredentials: true },
      );
      setInfo(check.data.data);
      console.log(check.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="content">
        <div className="dashboard" id="dashboard">
          <div className="header">
            <div className="dashboard-title">Owner Dashboard</div>
          </div>

          <div id="dashboard" className="dashboard-section">
            <div className="content">
              <div id="dashboardHome">
                <div className="stats-container">
                  <div className="stat-card">
                    <div className="stat-icon" style={{ textAlign: "center" }}>
                      <DomainIcon height="10" />
                    </div>
                    <div className="stat-title">Total Venues</div>
                    <div className="stat-value" id="totalVenues">
                      1
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{ textAlign: "center" }}>
                      <BookmarkIcon height="10" />
                    </div>
                    <div className="stat-title">Bookings This Month</div>
                    <div className="stat-value" id="monthlyBookings">
                      {datas?.length}
                    </div>
                  </div>
                </div>

                <div
                  className="charts-section"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    className="chart-container"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "1.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      width:'80vw'
                    }}
                  >
                    <div id="revenueChart" style={{ padding: "20px" }}>
                      <div className="stat-title">Approval status</div>
                      <p
                        className="stat-value"
                        style={{
                          color: info?.approved ? "green" : "red",
                        }}
                      >
                        {info?.approved ? "Approved" : "Not Approved"}
                      </p>
                      <p
                        style={{
                          color: info?.approved ? "green" : "red",
                          display: !info?.approved ? "block" : "none",
                          textAlign:"center"
                        }}
                      >
                        Dissaproval reason: {info?.reasonOfDisapproval}
                      </p>
                    </div>
                    {/* <div id="revenueChart" style={{ padding: "20px" }}></div> */}
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ textAlign: "center" }}>
                    <EngineeringIcon height="10" />
                  </div>
                  <div className="stat-title">Under Maintainance</div>
                  <div className="stat-value" id="monthlyBookings">
                    <p style={{
                      color:info?.underMaintenance?"Red":"green"
                    }}>
                      {info?.underMaintenance
                        ? "Under Maintainance"
                        : "Under proper Condition"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
