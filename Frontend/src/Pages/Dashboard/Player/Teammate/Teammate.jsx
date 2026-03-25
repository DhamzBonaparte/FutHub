import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Person from "@mui/icons-material/Person";
import LocationOn from "@mui/icons-material/LocationOn";
import Work from "@mui/icons-material/Work";
import AccessTime from "@mui/icons-material/AccessTime";
import Wc from "@mui/icons-material/Wc";
import EventAvailable from "@mui/icons-material/EventAvailable";
import Male from "@mui/icons-material/Male";
import Info from "@mui/icons-material/Info";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import ContactPhoneIcon from "@mui/icons-material/ContactMail";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DetailItem = ({ icon: Icon, label, value }) => {
  const strValue = value ? String(value) : "";
  return (
    <p style={{ margin: "0", display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "8px", color: "#17a2b8" }}>
        <Icon style={{ fontSize: "1.1rem" }} />
      </span>
      <strong>{label}:</strong>
      <span style={{ marginLeft: "5px" }}>
        {strValue
          ? strValue.charAt(0).toUpperCase() + strValue.slice(1)
          : "N/A"}
      </span>
    </p>
  );
};

export default function Teammate() {
  const navigate = useNavigate();
  const [find, setFind] = useState(true);
  const [become, setBecome] = useState(false);
  const [myPosting, setMyPosting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState("");
  const [about, setAbout] = useState("");
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [register, setRegistered] = useState(false);
  const [myData, setMyData] = useState({});

  useEffect(() => {
    checkTeammate();
    getMyTeammateListings();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => {
    getTeams();
  }, [length]);

  const checkTeammate = async () => {
    try {
      const check = await axios.get(
        "http://localhost:3000/api/v1/player/check-teammate",
        {
          withCredentials: true,
        },
      );
      setRegistered(check.data.registered);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirm = async (id) => {
    try {
      // Ask for confirmation first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to confirm this teammate?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2196F3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) {
        return; // user cancelled
      }

      // Proceed only if confirmed
      await axios.patch(
        "http://localhost:3000/api/v1/player/confirm-teammate",
        { id },
        { withCredentials: true },
      );

      await getMyTeammateListings();
      await getTeams();

      Swal.fire({
        icon: "success",
        title: "Teammate Confirmed",
        text: `New player retrieved`,
        confirmButtonColor: "#2196F3",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const setActiveTab = (activeTab) => {
    setFind(activeTab === "find");
    setBecome(activeTab === "become");
    setMyPosting(activeTab === "myPosting");
  };

  const contentDisplay = (isActive) => ({
    display: isActive ? "block" : "none",
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const upd = await axios.patch(
        `http://localhost:3000/api/v1/player/my-teammate-listing`,
        {
          name,
          location,
          age,
          contact,
          position,
          experience,
          gender,
          available,
          about,
        },
        { withCredentials: true },
      );
      await getMyTeammateListings();
      await getTeams();
      navigate("/player/find-teammates");
      setIsEdit(false);
      Swal.fire({
        icon: "success",
        title: "Edited Succesfully",
        text: `Edited data is ready to show`,
        confirmButtonColor: "#2196F3",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Ask for confirmation first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this teammate listing?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "No, cancel",
      });

      if (!result.isConfirmed) {
        return; // user cancelled
      }

      await axios.delete(
        `http://localhost:3000/api/v1/player/my-teammate-listing/${myData?._id}`,
        { withCredentials: true },
      );

      Swal.fire({
        title: "Deleted!",
        text: "Your item has been deleted.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });

      await getMyTeammateListings();
      await getTeams();
      navigate("/player/find-teammates");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (e) => {
    setLoading(true);
    try {
      const se = await axios.post(
        "http://localhost:3000/api/v1/player/search-teammate",
        { search },
        { withCredentials: true },
      );
      setData(se.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getMyTeammateListings = async () => {
    try {
      const myTeam = await axios.get(
        "http://localhost:3000/api/v1/player/my-teammate-listing",
        { withCredentials: true },
      );
      setMyData(myTeam.data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const getTeams = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLoading(true);
    try {
      const teams = await axios.get(
        "http://localhost:3000/api/v1/player/find-teammate",
        { withCredentials: true },
      );
      setData(teams.data.data);
      setLength(teams.data.length);
      await checkTeammate();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/player/find-teammate",
        {
          name,
          age,
          location,
          contact,
          position,
          experience,
          gender,
          available,
          about,
        },
        { withCredentials: true },
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    setActiveTab("find");
    getTeams();
    getMyTeammateListings();
  };

  return (
    <>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {isEdit && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              zIndex: 1000,
              padding: "60px 20px 20px",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                background: "#fff",
                width: "100%",
                maxWidth: "600px",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              <p
                style={{
                  margin: "0 0 20px 0",
                  textAlign: "center",
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#0d1b2a",
                  letterSpacing: "1px",
                  paddingBottom: "10px",
                  borderBottom: "3px solid #5efc82",
                  display: "block",
                }}
              >
                Edit Opponent Posting
              </p>
              <form onSubmit={(e) => handleEdit(e)}>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Location:</label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>Select Location</option>
                  <option value="kathmandu">Kathmandu</option>
                  <option value="bhaktapur">Bhaktapur</option>
                  <option value="lalitpur">Lalitpur</option>
                </select>

                <label>Average Age:</label>
                <input
                  type="number"
                  placeholder="Enter average age"
                  min="12"
                  max="65"
                  value={age}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setAge(e.target.value)}
                />

                <label>Contact:</label>
                <input
                  type="tel"
                  placeholder="Enter contact number"
                  value={contact}
                  minLength="10"
                  maxLength="10"
                  pattern="(97|98)[0-9]{8}"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setContact(e.target.value)}
                />

                <label>Position:</label>
                <select
                  id="teammate-position"
                  required
                  value={position}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="">Select Position</option>
                  <option value="goalkeeper">Goalkeeper</option>
                  <option value="defender">Defender</option>
                  <option value="midfielder">Midfielder</option>
                  <option value="forward">Forward</option>
                  <option value="any">Any Position</option>
                </select>

                <label>Gender:</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />{" "}
                    <label htmlFor="male" style={{ marginLeft: "5px" }}>
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      name="gender"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />{" "}
                    <label htmlFor="female" style={{ marginLeft: "5px" }}>
                      Female
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="other"
                      value="other"
                      name="gender"
                      checked={gender === "other"}
                      onChange={(e) => setGender(e.target.value)}
                    />{" "}
                    <label htmlFor="other" style={{ marginLeft: "5px" }}>
                      Other
                    </label>
                  </div>
                </div>

                <label>Experience:</label>
                <select
                  id="teammate-experience"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 Years</option>
                  <option value="1-3">1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5+">5+ Years</option>
                </select>

                <label>Availability:</label>
                <select
                  id="teammate-availability"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                  value={available}
                  onChange={(e) => setAvailable(e.target.value)}
                >
                  <option value="">Select Availability</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="both weekdays & weekends">
                    Both Weekdays & Weekends
                  </option>
                  <option value="flexible">Flexible</option>
                </select>

                <label htmlFor="about">
                  About:
                  <textarea
                    id="teammate-about"
                    rows="3"
                    style={{
                      width: "227%",
                      padding: "0.8rem",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                    placeholder="About yourself..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>

                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    style={{
                      background: "#0d1b2a",
                      color: "#5efc82",
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEdit(false)}
                    style={{
                      background: "#e63946",
                      color: "#fff",
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              background: "#fff",
              marginBottom: "20px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={
                find
                  ? {
                      flex: 1,
                      padding: "15px",
                      textAlign: "center",
                      background: "#e8f5e9",
                      color: "#009624",
                      fontWeight: "bold",
                      borderBottom: "4px solid #00c853",
                      cursor: "pointer",
                    }
                  : {
                      flex: 1,
                      padding: "15px",
                      textAlign: "center",
                      background: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }
              }
              onClick={() => setActiveTab("find")}
            >
              Find Teammates
            </div>

            <div
              style={
                become
                  ? {
                      flex: 1,
                      padding: "15px",
                      textAlign: "center",
                      background: "#e8f5e9",
                      color: "#009624",
                      fontWeight: "bold",
                      borderBottom: "4px solid #00c853",
                      cursor: "pointer",
                    }
                  : {
                      flex: 1,
                      padding: "15px",
                      textAlign: "center",
                      background: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }
              }
              onClick={() => setActiveTab("become")}
            >
              Become a Teammate
            </div>

            <div
              style={
                myPosting
                  ? {
                      flex: 1,
                      padding: "15px",
                      textAlign: "center",
                      background: "#e8f5e9",
                      color: "#009624",
                      fontWeight: "bold",
                      borderBottom: "4px solid #00c853",
                      cursor: "pointer",
                    }
                  : {
                      flex: 1,
                      padding: "15px",
                      textAlign: "center",
                      background: "#fff",
                      color: "#333",
                      cursor: "pointer",
                    }
              }
              onClick={() => setActiveTab("myPosting")}
            >
              My Posting
            </div>
          </div>

          <div style={contentDisplay(find)}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "30px",
                maxWidth: "100%",
              }}
            >
              <input
                type="text"
                placeholder="Search location"
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch();
                }}
              />
              <button
                style={{
                  background: "#0d1b2a",
                  color: "#5efc82",
                  padding: "12px 30px",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Search
              </button>
            </div>

            <div
              className="loadi"
              style={{
                textAlign: "center",
                fontFamily: "Arial",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              <p>{loading ? "Loading teammates..." : ""}</p>{" "}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "20px",
              }}
            >
              {Array.isArray(data) &&
                data.map((value, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#fff",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 24px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div
                      style={{
                        background: "#1f2937",
                        color: "#f8f9fa",
                        padding: "15px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        {value.name.split(" ")[0].slice(0, 1).toUpperCase() +
                          value.name.slice(1)}
                      </span>
                      <span>{value.age} years old</span>
                    </div>

                    <div style={{ padding: "15px", lineHeight: "1.6" }}>
                      <p>
                        <strong>Location:</strong>{" "}
                        {value.location.charAt(0).toUpperCase() +
                          value.location.slice(1)}
                      </p>
                      <p>
                        <strong>Contact:</strong> {value.contact}
                      </p>
                      <p>
                        <strong>Position:</strong>{" "}
                        {value.position.charAt(0).toUpperCase() +
                          value.position.slice(1)}
                      </p>
                      <p>
                        <strong>Experience:</strong> {value.experience} years
                      </p>
                      <p>
                        <strong>Gender:</strong>{" "}
                        {value.gender.charAt(0).toUpperCase() +
                          value.gender.slice(1)}
                      </p>
                      <p>
                        <strong>Availability:</strong>{" "}
                        {value.availability.charAt(0).toUpperCase() +
                          value.availability.slice(1)}
                      </p>
                      <p>
                        {value.about.charAt(0).toUpperCase() +
                          value.about.slice(1)}
                      </p>
                    </div>

                    <div style={{ padding: "0 15px 15px" }}>
                      <button
                        disabled={!!value.confirmedBy}
                        style={{
                          width: "100%",
                          background: value.confirmedBy ? "#d3d3d3" : "#0d1b2a", // grey if confirmed
                          color: value.confirmedBy ? "#888" : "#5efc82", // muted text if confirmed
                          padding: "12px",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          cursor: value.confirmedBy ? "not-allowed" : "pointer", // blocked cursor if confirmed
                          transition: "background 0.3s ease",
                        }}
                        onClick={() => handleConfirm(value._id)}
                      >
                        {value.confirmedBy
                          ? "Already Chosen"
                          : "Confirm as Teammate"}{" "}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div style={contentDisplay(become)}>
            <div
              className="msg"
              style={{
                display: !register ? "none" : "block",
                background: "#fff3cd",
                color: "#856404",
                padding: "15px 20px",
                borderRadius: "8px",
                border: "1px solid #ffeeba",
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                marginTop: "15px",
              }}
            >
              <p style={{ margin: 0 }}>
                Already posted for being a teammate. Feel free to edit it in my
                posting section!
              </p>
            </div>

            <form
              style={{ maxWidth: "800px", margin: "0 auto" }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div id="become-teammate" className="teammate-tab">
                <div
                  className="form-container"
                  style={{
                    width: "100%",
                    display: register ? "none" : "block",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      borderBottom: "5px solid green",
                      marginBottom: "30px",
                    }}
                  >
                    Become Teammate
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teammate-name">Full Name</label>
                      <input
                        type="text"
                        id="teammate-name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="teammate-age">Age</label>
                      <input
                        type="number"
                        id="teammate-age"
                        min="16"
                        max="60"
                        required
                        placeholder="Enter Age"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teammate-location">Location</label>
                      <select
                        id="teammate-location"
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
                      <label htmlFor="teammate-phone">Contact Number</label>
                      <input
                        type="tel"
                        id="teammate-phone"
                        required
                        minLength="10"
                        maxLength="10"
                        pattern="(97|98)\d{8}"
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter Contact Number"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teammate-position">
                        Preferred Position
                      </label>
                      <select
                        id="teammate-position"
                        required
                        onChange={(e) => setPosition(e.target.value)}
                      >
                        <option value="">Select Position</option>
                        <option value="goalkeeper">Goalkeeper</option>
                        <option value="defender">Defender</option>
                        <option value="midfielder">Midfielder</option>
                        <option value="forward">Forward</option>
                        <option value="any">Any Position</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="teammate-experience">
                        Years of Experience
                      </label>
                      <select
                        id="teammate-experience"
                        required
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <option value="">Select Experience</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5+">5+ Years</option>
                      </select>
                    </div>
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
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          required
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="male" style={{ marginLeft: "5px" }}>
                          Male
                        </label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          required
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
                          required
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="other" style={{ marginLeft: "5px" }}>
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="teammate-availability">Availability</label>
                    <select
                      id="teammate-availability"
                      required
                      onChange={(e) => setAvailable(e.target.value)}
                    >
                      <option value="">Select Availability</option>
                      <option value="weekdays">Weekdays Only</option>
                      <option value="weekends">Weekends Only</option>
                      <option value="both weekdays & weekends">
                        Both Weekdays & Weekends
                      </option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="teammate-about">
                      About You (Skills, Preferences)
                    </label>
                    <textarea
                      id="teammate-about"
                      rows="3"
                      style={{
                        width: "100%",
                        padding: "0.8rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                      placeholder="About yourself..."
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    style={{ background: "#0d1b2a", color: "#5efc82" }}
                  >
                    Post as Teammate
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div style={{ marginTop: "50px", ...contentDisplay(myPosting) }}>
            <div
              className="msg"
              style={{
                display: register ? "none" : "block",
                background: "#d4edda",
                color: "#155724",
                padding: "15px 20px",
                borderRadius: "8px",
                border: "1px solid #ffeeba",
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                marginTop: "15px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0 }}>
                {!register
                  ? "Add yourself as a teammate to edit your profile!"
                  : ""}
              </p>
            </div>

            <div
              style={{
                background: "#f8f9fa",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid #dee2e6",
                maxWidth: "600px",
                margin: "20px auto",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                display: register ? "block" : "none",
                fontFamily:
                  "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              }}
            >
              <div
                style={{
                  borderBottom: "2px solid #007bff",
                  paddingBottom: "15px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#007bff",
                    fontSize: "1.8rem",
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#6c757d" }}>
                    <Person style={{ fontSize: "1.8rem" }} />{" "}
                  </span>

                  {myData?.name?.slice(0, 1).toUpperCase() +
                    myData?.name?.slice(1) +
                    " "}
                  <span
                    style={{
                      color: "#6c757d",
                      fontSize: "1.2rem",
                      fontWeight: "normal",
                      marginLeft: "8px",
                    }}
                  >
                    ( {myData?.age} years old )
                  </span>
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px 25px",
                  marginBottom: "20px",
                  fontSize: "0.95rem",
                  color: "#343a40",
                }}
              >
                <DetailItem
                  icon={LocationOn}
                  label="Location"
                  value={String(myData?.location)}
                />

                <DetailItem
                  icon={Work}
                  label="Position"
                  value={
                    myData?.position?.slice(0, 1).toUpperCase() +
                    myData?.position?.slice(1)
                  }
                />

                <p
                  style={{ margin: "0", display: "flex", alignItems: "center" }}
                >
                  <span style={{ marginRight: "8px", color: "#17a2b8" }}>
                    <AccessTime style={{ fontSize: "1.1rem" }} />{" "}
                  </span>
                  <strong>Experience:</strong>
                  <span style={{ marginLeft: "5px" }}>
                    {String(myData?.experience + " years")}
                  </span>
                </p>

                <DetailItem icon={Wc} label="Gender" value={myData?.gender} />

                <DetailItem
                  icon={EventAvailable}
                  label="Availability"
                  value={myData?.availability}
                />
                <DetailItem
                  icon={ContactPhoneIcon}
                  label="Contact"
                  value={myData?.contact}
                />
              </div>

              <div
                style={{
                  margin: "20px 0",
                  padding: "15px",
                  background: "#e9ecef",
                  borderRadius: "8px",
                  borderLeft: "5px solid #ffc107",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#343a40",
                  }}
                >
                  <span style={{ marginRight: "8px", color: "#ffc107" }}>
                    <Info style={{ fontSize: "1.1rem" }} />{" "}
                  </span>
                  About:
                </strong>
                <p
                  style={{
                    margin: "0",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {myData?.about?.slice(0, 1).toUpperCase() +
                    myData?.about?.slice(1)}
                </p>
              </div>

              <div style={{ textAlign: "right", paddingTop: "15px" }}>
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setName(myData?.name || "");
                    setAge(myData?.age || "");
                    setLocation(myData?.location || "");
                    setContact(myData?.contact || "");
                    setPosition(myData?.position || "");
                    setExperience(myData?.experience || "");
                    setGender(myData?.gender || "");
                    setAvailable(myData?.availability || "");
                    setAbout(myData?.about || "");
                  }}
                  style={{
                    background: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    marginRight: "15px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background 0.3s ease",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Edit style={{ fontSize: "1.1rem", marginRight: "5px" }} />{" "}
                  Edit
                </button>
                <button
                  style={{
                    background: "#dc3545",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background 0.3s ease",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleDelete()}
                >
                  <Delete style={{ fontSize: "1.1rem", marginRight: "5px" }} />{" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
