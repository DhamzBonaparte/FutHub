import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useOutletContext } from "react-router-dom";

export default function Main() {
  const { error, fav, data } = useOutletContext();
  return (
    <>
    <div className="header">
            <div className="dashboard-title">Player Dashboard</div>
          </div>
      <div id="dashboard" className="dashboard-section">
        <div className="stats-container">
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <EventAvailableIcon className="bigIcon" />
            </div>
            <div className="stat-title">Upcoming Matches</div>
            <div className="stat-value">3</div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <SportsSoccerIcon className="bigIcon" />
            </div>
            <div className="stat-title">Total Bookings</div>
            <div className="stat-value">15</div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <FavoriteIcon className="bigIcon" />
            </div>
            <div className="stat-title">Favourite Venues</div>
            <div className="stat-value">4</div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              <DirectionsRunIcon className="bigIcon" />
            </div>
            <div className="stat-title">Matches Played</div>
            <div className="stat-value">12</div>
          </div>
        </div>

        <div className="section-header">
          <h2>Upcoming Bookings</h2>
        </div>

        <div className="upcoming-matches">
          <div className="match-card">
            <div className="match-date">
              <div className="day">28</div>
              <div className="month">OCT</div>
            </div>
            <div className="match-details">
              <h4>Kathmandu Futsal Arena</h4>
              <p>5-a-side, Artificial Turf</p>
            </div>
            <div className="match-time">
              <i className="far fa-clock"></i>
              <span>2:00 PM - 3:30 PM</span>
            </div>
            <div className="match-price">
              <i className="fas fa-tag"></i>
              <span>NPR 1,500</span>
            </div>
          </div>

          <div className="match-card">
            <div className="match-date">
              <div className="day">30</div>
              <div className="month">OCT</div>
            </div>
            <div className="match-details">
              <h4>Bhaktapur Sports Complex</h4>
              <p>7-a-side, Floodlights Available</p>
            </div>
            <div className="match-time">
              <i className="far fa-clock"></i>
              <span>5:00 PM - 6:30 PM</span>
            </div>
            <div className="match-price">
              <i className="fas fa-tag"></i>
              <span>NPR 2,000</span>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2>Booking History</h2>
        </div>

        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Venue</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pokhara Arena</td>
                <td>Oct 25, 2023</td>
                <td>4:00 PM - 5:30 PM</td>
                <td>NPR 1,800</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>Chitwan Sports</td>
                <td>Oct 22, 2023</td>
                <td>6:00 PM - 7:30 PM</td>
                <td>NPR 2,200</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>Lalitpur Futsal</td>
                <td>Oct 20, 2023</td>
                <td>3:00 PM - 4:30 PM</td>
                <td>NPR 1,600</td>
                <td>
                  <span className="status cancelled">Cancelled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section-header">
          <h2>Opponents</h2>
        </div>

        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pokhara Titans</td>
                <td>Pokhara</td>
                <td>Dec 10, 2025</td>
                <td>4:00 PM - 5:30 PM</td>
                <td>
                  <span className="status scheduled">Scheduled</span>
                </td>
              </tr>
              <tr>
                <td>Chitwan Warriors</td>
                <td>Chitwan</td>
                <td>Dec 12, 2025</td>
                <td>6:00 PM - 7:30 PM</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>Lalitpur Strikers</td>
                <td>Lalitpur</td>
                <td>Dec 15, 2025</td>
                <td>3:00 PM - 4:30 PM</td>
                <td>
                  <span className="status cancelled">Cancelled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="section-header">
          <h2>Teammate</h2>
        </div>

        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pokhara Titans</td>
                <td>Pokhara</td>
                <td>Dec 10, 2025</td>
                <td>4:00 PM - 5:30 PM</td>
                <td>
                  <span className="status scheduled">Scheduled</span>
                </td>
              </tr>
              <tr>
                <td>Chitwan Warriors</td>
                <td>Chitwan</td>
                <td>Dec 12, 2025</td>
                <td>6:00 PM - 7:30 PM</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>Lalitpur Strikers</td>
                <td>Lalitpur</td>
                <td>Dec 15, 2025</td>
                <td>3:00 PM - 4:30 PM</td>
                <td>
                  <span className="status cancelled">Cancelled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="bookings"
        className="booking-history"
        style={{ display: "none" }}
      >
        <div className="section-header">
          <h2>All Bookings</h2>
        </div>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

    </>
  );
}
