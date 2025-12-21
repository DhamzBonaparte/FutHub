import "../PDash.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";

export default function Opponent() {
  const [loading, setLoading] = useState(true);
  const [beOpponent, setBeOpponent] = useState(false);
  const [mine, setMine] = useState("");
  const [totalPlayers, setTotalPlayers] = useState(5);
  const [error, setError] = useState("");
  const [playerNames, setPlayerNames] = useState(Array(5).fill(""));
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [venue, setVenue] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [level, setLevel] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [averageAge, setAverageAge] = useState("");
  const [opponents, setOpponents] = useState({});
  const [search, setSearch] = useState("");
  const [length, setLength] = useState(0);
  const [filter, setFilter] = useState({});
  const [edit, setEdit] = useState(false);
  const [main, setMain] = useState(true);
  const [myOppPostings, setMyOppPostings] = useState([]);
  const [ID, setId] = useState("");

  useEffect(() => {
    handleFilter();
  }, [search]);

  useEffect(() => {
    getOpponents();
    getMyOpponentListings();
  }, [length]);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(
        "http://localhost:3000/api/v1/player/confirm-opponent",
        { id },
        { withCredentials: true }
      );
      await getOpponents();
    } catch (error) {
      setError(error.message);
    }
  };

  async function getMyOpponentListings() {
    setLoading(true);
    try {
      const value = await axios.get(
        "http://localhost:3000/api/v1/player/my-opponent-postings",
        { withCredentials: true }
      );
      setMyOppPostings(value.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      const upd = await axios.patch(
        `http://localhost:3000/api/v1/player/my-opponent-postings/${ID}`,
        {
          teamName,
          location,
          averageAge,
          contact,
          venue,
          gender,
          date,
          level,
          timeFrom,
          timeTo,
        },
        { withCredentials: true }
      );
      getMyOpponentListings();
      setEdit(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function getOpponents() {
    setLoading(true);
    try {
      const oppo = await axios.get(
        "http://localhost:3000/api/v1/player/find-opponent"
      );
      setOpponents(oppo.data);
      setLength(opponents.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFilter() {
    setLoading(true);
    try {
      const values = await axios.post(
        "http://localhost:3000/api/v1/player/search-opponent",
        { search },
        {
          withCredentials: true,
        }
      );
      setFilter(values.data.filteredData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(
    Eage,
    Egender,
    Econtact,
    Eto,
    Efrom,
    Evenue,
    Edate,
    Eteam,
    Elevel,
    Eid
  ) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setEdit(true);
    setAverageAge(Eage);
    setGender(Egender);
    setContact(Econtact);
    setTimeTo(Eto);
    setTimeFrom(Efrom);
    setDate(Edate);
    setVenue(Evenue);
    setTeamName(Eteam);
    setLevel(Elevel);
    setId(Eid);
  }

  function handleNames(index, name) {
    const updatedNames = [...playerNames];
    updatedNames[index] = name;
    setPlayerNames(updatedNames);
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/player/my-opponent-postings/${id}`,
        { withCredentials: true }
      );
      getMyOpponentListings();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/v1/player/find-opponent",
        {
          teamName,
          totalPlayers,
          location,
          averageAge,
          contact,
          venue,
          gender,
          date,
          playerNames,
          level,
          timeFrom,
          timeTo,
        },
        { withCredentials: true }
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "110%",
          background: "rgba(0,0,0,0.5)",
          display: edit ? "flex" : "none",
          justifyContent: "center",
          alignItems: "flex-start",
          zIndex: 1000,
          overflowY: "auto",
          boxSizing: "border-box",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <p
            style={{
              margin: 0,
              textAlign: "center",
              fontSize: "30px",
              fontWeight: 700,
              color: "#0d1b2a",
              letterSpacing: "1px",
              padding: "12px 20px",
              borderBottom: "2px solid #5efc82",
              fontFamily: "arial",
            }}
          >
            Edit your posting
          </p>

          <form
            onSubmit={(e) => handleEditSubmit(e)}
            style={{ padding: "12px 20px" }}
          >
            <label>Team Name:</label>
            <input
              type="text"
              id="opponent-name"
              required={edit}
              value={
                teamName.split(" ")[0].slice(0, 1).toUpperCase() +
                teamName.slice(1)
              }
              placeholder="Enter Team Name"
              onChange={(e) => setTeamName(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />

            <label>Location:</label>
            <select
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
              id="opponent-location"
              required={edit}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="kathmandu">Kathmandu</option>
              <option value="bhaktapur">Bhaktapur</option>
              <option value="lalitpur">Lalitpur</option>
            </select>

            <label>Average Age:</label>
            <input
              type="number"
              id="average-age"
              name="average-age"
              required={edit}
              value={averageAge}
              placeholder="Enter average age"
              min="12"
              max="65"
              onChange={(e) => setAverageAge(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />
            <label>Contact:</label>
            <input
              type="tel"
              id="opponent-phone"
              required={edit}
              value={contact}
              minLength="10"
              maxLength="10"
              pattern="[0-9]{10}"
              placeholder="Enter contact number"
              onChange={(e) => setContact(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />

            <label>Venue:</label>
            <input
              type="text"
              id="opponent-venue"
              required={edit}
              value={
                venue.split(" ")[0].slice(0, 1).toUpperCase() + venue.slice(1)
              }
              placeholder="Enter venue"
              onChange={(e) => setVenue(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />

            <label>Gender:</label>
            <div
              className="gen"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={gender == "male"}
                  value="male"
                  required={edit}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label
                  htmlFor="male"
                  style={{ marginLeft: "5px", borderRadius: "10px" }}
                >
                  Male
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender == "female"}
                  required={edit}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female" style={{ marginLeft: "5px" }}>
                  Female
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={gender == "other"}
                  required={edit}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="other" style={{ marginLeft: "5px" }}>
                  Other
                </label>
              </div>
            </div>

            <label>Match Date:</label>
            <input
              type="date"
              id="user-date"
              name="user-date"
              required={edit}
              value={date.slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />

            <label>Level:</label>
            <select
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
              id="opponent-skills"
              required={edit}
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="">Select Skill Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>

            <label>Time From:</label>
            <input
              type="time"
              name="from"
              required={edit}
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />

            <label>Time To:</label>
            <input
              type="time"
              name="to"
              value={timeTo}
              required={edit}
              onChange={(e) => setTimeTo(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                borderRadius: "10px",
              }}
            >
              <button
                type="submit"
                style={{
                  background: "#0d1b2a",
                  color: "#5efc82",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                type="button"
                style={{
                  background: "#e63946",
                  color: "#fff",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="error">
        <h3
          style={{
            textAlign: "center",
            padding: "10px",
            display: error ? "block" : "none",
          }}
        >
          {error}
        </h3>
      </div>
      <div
        id="opponents"
        className="opponents-section"
        style={{
          filter: edit ? "blur(10px)" : "blur(0px)",
          position: "relative",
          height: "100%",
        }}
      >
        <div className="section-tabs">
          <div
            className="tab active"
            style={
              main
                ? { borderBottom: "3px solid #00c853", color: "#009624" }
                : { borderBottom: "0px", color: "black" }
            }
            onClick={() => {
              setMain(true);
              setBeOpponent(false);
              setMine(false);
            }}
          >
            Find Opponents
          </div>
          <div
            className="tab"
            style={
              beOpponent
                ? { borderBottom: "3px solid #00c853", color: "#009624" }
                : { borderBottom: "0px", color: "black" }
            }
            onClick={() => {
              setBeOpponent(true);
              setMain(false);
              setMine(false);
            }}
          >
            Become an Opponent
          </div>
          <div
            className="tab"
            style={
              mine
                ? { borderBottom: "3px solid #00c853", color: "#009624" }
                : { borderBottom: "0px", color: "black" }
            }
            onClick={() => {
              setMine(true);
              setBeOpponent(false);
              setMain(false);
            }}
          >
            My Postings of opponents
          </div>
        </div>

        <div
          id="find-opponents"
          className="opponent-tab"
          style={main ? { display: "block" } : { display: "none" }}
        >
          <div className="search-container">
            <div className="location-search">
              <input
                type="text"
                placeholder="Search location (e.g., Kathmandu, Bhaktapur)"
                id="opponent-search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleFilter();
                }}
              />
            </div>
            <button
              className="become-opponent-btn"
              style={{ background: "#0d1b2a", color: "#5efc82" }}
              onClick={() => handleFilter()}
            >
              Search Opponent
            </button>
          </div>

          <div className="opponents-grid" id="opponents-grid">
            {!search
              ? opponents?.data?.map((opp, index) => {
                  return (
                    <>
                      <div className="opponent-card" key={index}>
                        <div className="opponent-header">
                          <div className="opponent-name">
                            {opp.teamName.slice(0, 1).toUpperCase() +
                              opp.teamName.slice(1)}
                          </div>
                          <div className="opponent-age">
                            {opp.averageAge} years
                          </div>
                        </div>
                        <div className="opponent-details">
                          <p>
                            <LocationPinIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />{" "}
                            {opp.location.slice(0, 1).toUpperCase() +
                              opp.location.slice(1)}
                          </p>
                          <p>
                            <SportsSoccerIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />{" "}
                            {opp.venue.slice(0, 1).toUpperCase() +
                              opp.venue.slice(1)}
                          </p>
                          <p>
                            <CalendarTodayIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />{" "}
                            {opp.matchDate.slice(0, 10)}
                          </p>
                          <p>
                            <AccessTimeIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />{" "}
                            {new Date(
                              `1970-01-01T${opp.timeFrom}:00`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}{" "}
                            -{" "}
                            {new Date(
                              `1970-01-01T${opp.timeTo}:00`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <p>
                            <PhoneIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />{" "}
                            {opp.contact}
                          </p>
                          <p>
                            <MilitaryTechIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />
                            {opp.level.slice(0, 1).toUpperCase() +
                              opp.level.slice(1) +
                              " " +
                              "level"}
                          </p>
                          <p>
                            <WcIcon
                              height="20"
                              style={{ color: "black", marginRight: "10px" }}
                            />
                            {opp.gender.slice(0, 1).toUpperCase() +
                              opp.gender.slice(1)}
                          </p>
                        </div>
                        <button
                          className="confirm-btn"
                          disabled={!!opp.confirmedBy}
                          style={{
                            background: opp.confirmedBy ? "#d3d3d3" : "#0d1b2a",
                            color: opp.confirmedBy ? "#888" : "#5efc82",
                            cursor: opp.confirmedBy ? "not-allowed" : "pointer",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: "600",
                          }}
                          onClick={() => handleConfirm(opp._id)}
                        >
                          {opp.confirmedBy
                            ? "Not Available"
                            : "Confirm As Opponent"}
                        </button>
                      </div>
                    </>
                  );
                })
              : filter?.map((opp, index) => {
                  return (
                    <>
                      <div className="opponent-card" key={index}>
                        <div className="opponent-header">
                          <div className="opponent-name">{opp.teamName}</div>
                          <div className="opponent-age">
                            {opp.averageAge} years
                          </div>
                        </div>

                        <div className="opponent-details">
                          <p>
                            <LocationPinIcon
                              style={{
                                color: "black",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                            {opp.location.charAt(0).toUpperCase() +
                              opp.location.slice(1)}
                          </p>
                          <p>
                            <SportsSoccerIcon
                              style={{
                                color: "black",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                            {opp.venue.charAt(0).toUpperCase() +
                              opp.venue.slice(1)}
                          </p>
                          <p>
                            <CalendarTodayIcon
                              style={{
                                color: "black",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                            {opp.matchDate.slice(0, 10)}
                          </p>
                          <p>
                            <AccessTimeIcon
                              style={{
                                color: "black",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                            {new Date(
                              `1970-01-01T${opp.timeFrom}:00`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}{" "}
                            -{" "}
                            {new Date(
                              `1970-01-01T${opp.timeTo}:00`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <p>
                            <PhoneIcon
                              style={{
                                color: "black",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                            {opp.contact}
                          </p>
                          <p>
                            <MilitaryTechIcon
                              style={{
                                color: "black",
                                marginRight: "10px",
                                fontSize: "20px",
                              }}
                            />
                            {opp.level.charAt(0).toUpperCase() +
                              opp.level.slice(1)}{" "}
                            level
                          </p>
                        </div>

                        <button
                          className="confirm-btn"
                          style={{ background: "#0d1b2a", color: "#5efc82" }}
                        >
                          Confirm as Opponent
                        </button>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
        <div className="sdf">
          <p
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontFamily: "arial",
            }}
          >
            {loading ? "Loading Opponents..." : ""}
          </p>
        </div>
        <div
          id="become-opponent"
          className="opponent-tab"
          style={beOpponent ? { display: "block" } : { display: "none" }}
        >
          <div className="form-container">
            <h3>Post your team as an Opponent</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  background: "#9aa0a6",
                  color: "#fff",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  lineHeight: 1,
                  cursor: "default",
                  userSelect: "none",
                  margin: "10px 10px 10px 0px",
                }}
                aria-label="Information"
              >
                i
              </div>
              <span style={{ fontSize: "12px", color: "#333" }}>
                Make sure that you have a team of 5 or more to post your team as
                an opponent.
              </span>
            </div>
            <form id="opponent-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="opponent-name">Team Name</label>
                  <input
                    type="text"
                    id="opponent-name"
                    required
                    placeholder="Enter Team Name"
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="opponent-playrs">Total Players</label>
                  <input
                    type="number"
                    id="opponent-players"
                    min="5"
                    max="15"
                    placeholder="Enter total number of players"
                    required
                    onChange={(e) => setTotalPlayers(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="opponent-location">Location</label>
                  <select
                    id="opponent-location"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select Location</option>
                    <option value="kathmandu">Kathmandu</option>
                    <option value="bhaktapur">Bhaktapur</option>
                    <option value="lalitpur">Lalitpur</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="average-age">Average Age</label>
                  <input
                    type="number"
                    id="average-age"
                    name="average-age"
                    required
                    placeholder="Enter average age"
                    min="12"
                    max="65"
                    value={averageAge}
                    onChange={(e) => setAverageAge(e.target.value)}
                    style={{
                      width: "100%",
                      height: "50px",
                      padding: "6px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="opponent-phone">Contact Number</label>
                  <input
                    type="tel"
                    id="opponent-phone"
                    required
                    minLength="10"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    placeholder="Enter contact number"
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="opponent-venue">Venue</label>
                  <input
                    type="text"
                    id="opponent-venue"
                    required
                    placeholder="Enter venue"
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>

                <div
                  className="form-group"
                  style={{
                    textAlign: "Center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="gender">Gender</label>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      marginTop: "10px",
                    }}
                  >
                    <div>
                      <label style={{ marginLeft: "5px" }}>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                      </label>
                    </div>

                    <div>
                      <label style={{ marginLeft: "5px" }}>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                      </label>
                    </div>

                    <div>
                      <label style={{ marginLeft: "5px" }}>
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        />
                        Other
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="user-date">Select Date</label>
                  <input
                    type="date"
                    id="user-date"
                    name="user-date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      padding: "6px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      height: "48px",
                    }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <h3 style={{ color: "#009624", marginBottom: "20px" }}>
                    Player Details
                  </h3>
                  {[...Array(totalPlayers)].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                        gap: "10px",
                      }}
                    >
                      <label
                        htmlFor={`player-${index + 1}`}
                        style={{
                          width: "100px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Player {index + 1}
                      </label>
                      <input
                        type="text"
                        id={`player-${index + 1}`}
                        name={`player-${index + 1}`}
                        required
                        placeholder="Enter name"
                        onChange={(e) => handleNames(index, e.target.value)}
                        style={{
                          flex: 1,
                          padding: "6px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="opponent-skills">Skills Level</label>
                  <select
                    id="opponent-skills"
                    required
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value="">Select Skill Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="opponent-time">Preferred Time</label>
                  <div
                    className="from"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label
                      htmlFor="from"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        marginTop: "10px",
                      }}
                    >
                      From
                    </label>
                    <input
                      type="time"
                      name="from"
                      required
                      style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        padding: "10px",
                      }}
                      onChange={(e) => setTimeFrom(e.target.value)}
                    />
                  </div>

                  <div
                    className="to"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <label
                      htmlFor="to"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        marginTop: "10px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      To
                    </label>
                    <input
                      type="time"
                      name="to"
                      required
                      onChange={(e) => setTimeTo(e.target.value)}
                      style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        width: "100%",
                        padding: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{ background: "#0d1b2a", color: "#5efc82" }}
                onClick={() => handleSubmit()}
              >
                Post as Opponent
              </button>
            </form>
          </div>
        </div>

        {myOppPostings?.map((opp) => (
          <div
            className="opponents-grid"
            style={mine ? { display: "block" } : { display: "none" }}
            key={opp._id}
          >
            <div className="opponent-card" style={{ marginBottom: "20px" }}>
              <div
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0.1)",
                  display: mine ? "block" : "none",
                }}
              >
                <h2>{opp.length == 0 ? "Nothing to show" : ""}</h2>
                <h3>
                  {opp.teamName.slice(0, 1).toUpperCase() +
                    opp.teamName.slice(1)}{" "}
                  • {opp.averageAge} yrs avg
                </h3>
                <p>
                  <strong>Location:</strong> {opp.location} |{" "}
                  <strong>Venue:</strong> {opp.venue} | <strong>Date:</strong>{" "}
                  {opp.matchDate.slice(0, 10)}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(`1970-01-01T${opp.timeFrom}:00`).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}{" "}
                  -{" "}
                  {new Date(`1970-01-01T${opp.timeTo}:00`).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}{" "}
                  | <strong>Level:</strong>{" "}
                  {opp.level.slice(0, 1).toUpperCase() +
                    opp.level.slice(1) +
                    " " +
                    "level "}
                  | <strong>Gender:</strong>{" "}
                  {opp.gender.slice(0, 1).toUpperCase() + opp.gender.slice(1)}
                </p>
                <div style={{ margin: "15px 0" }}>
                  <strong>Players:</strong>
                  <ul>
                    {opp.players.map((player, i) => (
                      <li key={i} type="none">
                        <PersonIcon className="icon" />
                        {player.name.split(" ")[0].slice(0, 1).toUpperCase() +
                          player.name.split(" ")[0].slice(1) +
                          " " +
                          player.name.split(" ")[1].slice(0, 1).toUpperCase() +
                          player.name.split(" ")[1].slice(1)}{" "}
                        {player.age ? `- ${player.age} yrs` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ textAlign: "right" }}>
                  <button
                    style={{
                      background: "#1d3557",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                      marginRight: "10px",
                    }}
                    onClick={() =>
                      handleEdit(
                        opp.averageAge,
                        opp.gender,
                        opp.contact,
                        opp.timeTo,
                        opp.timeFrom,
                        opp.venue,
                        opp.matchDate,
                        opp.teamName,
                        opp.level,
                        opp._id
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      background: "#e63946",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                    }}
                    onClick={() => handleDelete(opp._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
