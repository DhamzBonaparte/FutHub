import DomainIcon from "@mui/icons-material/Domain";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import { PieChart, Pie, Legend, Cell } from "recharts";
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

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  },[])

  const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 2000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
    { name: "Jul", revenue: 3490 },
  ];

  const bookingData = [
    { name: "Morning (6 AM - 12 PM)", value: 120 },
    { name: "Afternoon (12 PM - 5 PM)", value: 200 },
    { name: "Evening (5 PM - 10 PM)", value: 350 },
    { name: "Night (10 PM - 2 AM)", value: 80 },
  ];

  const COLORS = ["#145A32", "#2C3E50", "#F39C12", "#8E44AD"];
  return (
    <>
      <div className="content">
        <div className="dashboard" id="dashboard">
          <div className="header" >
            <div className="dashboard-title">Owner Dashboard</div>
          </div>

          <div id="dashboard" className="dashboard-section" >
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
                      18
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{ textAlign: "center" }}>
                      <StarRateIcon height="10" />
                    </div>
                    <div className="stat-title">Average Rating</div>
                    <div className="stat-value" id="averageRating">
                      4.5
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
                    <div className="chart-header">
                      <h3>Revenue Overview</h3>
                    </div>
                    <div id="revenueChart" style={{ padding: "20px" }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                          data={data}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorRevenue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#5efc82"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#145A32"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorExpenses"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#F1C40F"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#F1C40F"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>

                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />

                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#1bc843ff"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div
                    className="chart-container"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "1.2rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="chart-header">
                      <h3>Booking Distribution</h3>
                    </div>
                    <div id="bookingChart">
                      <PieChart
                        style={{
                          width: "100%",
                          maxWidth: "500px",
                          maxHeight: "80vh",
                          aspectRatio: 1,
                        }}
                        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                      >
                        <Pie
                          data={bookingData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius="70%"
                          label
                        >
                          {bookingData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </div>
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
