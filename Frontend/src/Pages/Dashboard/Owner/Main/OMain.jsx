import DomainIcon from "@mui/icons-material/Domain";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import { PieChart, Pie, Legend, Cell } from "recharts";
import useBookers from "../../../../Hooks/useBookers";
import Swal from "sweetalert2";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function OMain() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { datas, loading, err } = useBookers();
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
                    }}
                  >
                    <div id="revenueChart" style={{ padding: "20px" }}></div>
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
