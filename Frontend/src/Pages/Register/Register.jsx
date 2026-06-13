import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showMsg, setShowMsg] = useState(false);
  const [images, setImages] = useState([]);
  const [owner, setOwner] = useState("");
  const [futsal, setFutsal] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [artificialTurf, setArtificialTurf] = useState(false);
  const [floodlights, setFloodlights] = useState(false);
  const [changingRooms, setChangingRooms] = useState(false);
  const [showers, setShowers] = useState(false);
  const [parking, setParking] = useState(false);
  const [cafeteria, setCafeteria] = useState(false);
  const [firstAid, setFirstAid] = useState(false);
  const [equipmentRental, setEquipmentRental] = useState(false);
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [about, setAbout] = useState("");
  const [em, setEm] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    checkOwner();
  }, []);

  const formData = new FormData();

  images.forEach(({ file }) => {
    formData.append("futsalPic", file);
  });

  formData.append("owner", owner);
  formData.append("futsal", futsal);
  formData.append("location", location);
  formData.append("email", email);
  formData.append("contact", contact);
  formData.append("address", address);
  formData.append("artificialTurf", artificialTurf);
  formData.append("floodlights", floodlights);
  formData.append("changingRooms", changingRooms);
  formData.append("showers", showers);
  formData.append("parking", parking);
  formData.append("cafeteria", cafeteria);
  formData.append("firstAid", firstAid);
  formData.append("equipmentRental", equipmentRental);
  formData.append("price", price);
  formData.append("capacity", capacity);
  formData.append("about", about);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fut = await axios.post(
        `${url}/upload`,
        formData,
        {
          withCredentials: true,
        },
      );
      navigate("/owner");
    } catch (error) {
      console.log(error);

      // console.log(error.message);
    }
  };

  const checkOwner = async () => {
    try {
      const check = await axios.get(
        `${url}/owner/check-owner`,
        { withCredentials: true },
      );
      setEm(check.data.user.email);
      setEmail(check.data.user.email);

      if (check.data.data) {
        setShowMsg(true);
      }

      if (check.data.user.role !== "owner") {
        alert("Login as owner to register!");
        setTimeout(() => {
          navigate("/login");
        });
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Email Already Used!");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div
        className="registration-form"
        id="registrationForm"
        style={{
          display: !showMsg ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "2rem",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <div
          className="form-container"
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            padding: "2.5rem",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <div
            className="form-header"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "2px solid var(--primary-green)",
            }}
          >
            <h2
              style={{
                color: "var(--dark-green)",
                fontSize: "1.8rem",
                marginBottom: "0.5rem",
              }}
            >
              Register Your Futsal Venue
            </h2>
            <p style={{ color: "#666" }}>
              Fill in the details to list your futsal court on FutHub
            </p>
          </div>

          <form id="venueRegistrationForm" encType="multipart/form-data">
            <div
              className="form-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="ownerName"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--dark-green)",
                    fontWeight: 500,
                  }}
                >
                  Owner Name *
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  onChange={(e) => setOwner(e.target.value)}
                  type="text"
                  id="ownerName"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="futsalName"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--dark-green)",
                    fontWeight: 500,
                  }}
                >
                  Futsal Name *
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  onChange={(e) => setFutsal(e.target.value)}
                  type="text"
                  id="futsalName"
                  required
                  placeholder="Enter your futsal court name"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="ownerEmail"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--dark-green)",
                    fontWeight: 500,
                  }}
                >
                  Email Address *
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  type="email"
                  id="ownerEmail"
                  required
                  placeholder="Enter your email"
                  value={em}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="contactNumber"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--dark-green)",
                    fontWeight: 500,
                  }}
                >
                  Contact Number *
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  onChange={(e) => setContact(e.target.value)}
                  type="tel"
                  id="contactNumber"
                  minLength={10}
                  maxLength={10}
                  pattern="\d{10}"
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="location"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--dark-green)",
                    fontWeight: 500,
                  }}
                >
                  Location *
                </label>
                <select
                  id="location"
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
                <label
                  htmlFor="address"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--dark-green)",
                    fontWeight: 500,
                  }}
                >
                  Full Address *
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  id="address"
                  required
                  placeholder="Enter complete address"
                />
              </div>

              <div
                className="form-group full-width"
                style={{ gridColumn: "1/-1" }}
              >
                <label>Facilities Available *</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1.2 rem",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <label>
                    <input
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      type="checkbox"
                      name="facilities"
                      value="artificial_turf"
                      onChange={(e) => setArtificialTurf(e.target.value)}
                    />{" "}
                    Artificial Turf
                  </label>
                  <label>
                    <input
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      onChange={(e) => setFloodlights(e.target.value)}
                      type="checkbox"
                      name="facilities"
                      value="floodlights"
                    />{" "}
                    Floodlights
                  </label>
                  <label>
                    <input
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      onChange={(e) => setChangingRooms(e.target.value)}
                      type="checkbox"
                      name="facilities"
                      value="changing_rooms"
                    />{" "}
                    Changing Rooms
                  </label>
                  <label>
                    <input
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      type="checkbox"
                      name="facilities"
                      value="showers"
                      onChange={(e) => setShowers(e.target.value)}
                    />{" "}
                    Showers
                  </label>
                  <label>
                    <input
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      onChange={(e) => setParking(e.target.value)}
                      type="checkbox"
                      name="facilities"
                      value="parking"
                    />{" "}
                    Parking
                  </label>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      color: "var(--dark-green)",
                      fontWeight: 500,
                    }}
                  >
                    <input
                      onChange={(e) => setCafeteria(e.target.value)}
                      type="checkbox"
                      name="facilities"
                      value="cafeteria"
                      style={{
                        marginRight: "0.5rem",
                        verticalAlign: "middle",
                      }}
                    />
                    Cafeteria
                  </label>

                  <label>
                    <input
                      onChange={(e) => setFirstAid(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      type="checkbox"
                      name="facilities"
                      value="first_aid"
                    />{" "}
                    First Aid
                  </label>
                  <label>
                    <input
                      onChange={(e) => setEquipmentRental(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "var(--transition)",
                      }}
                      type="checkbox"
                      name="facilities"
                      value="equipment_rental"
                    />{" "}
                    Equipment Rental
                  </label>
                </div>
              </div>

              <div
                className="form-group full-width"
                style={{ gridColumn: "1/-1" }}
              >
                <label>Futsal Photos (Upload at least 3 photos) *</label>
                <div
                  className="photo-upload"
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "5px",
                    padding: "1.5rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                  onClick={() => document.getElementById("photoInput").click()}
                >
                  <CloudUploadIcon style={{ fontSize: "3rem" }} />
                  <p>Click to upload futsal photos</p>

                  <input
                    type="file"
                    id="photoInput"
                    multiple
                    name="futsalPic"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={`preview-${index}`}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="photo-preview"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                  id="photoPreview"
                ></div>
              </div>

              <div className="form-group">
                <label htmlFor="pricePerHour">Price per Hour (NPR) *</label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  type="number"
                  id="pricePerHour"
                  required
                  placeholder="e.g., 1500"
                  min="500"
                  max="5000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Court Capacity *</label>
                <select
                  onChange={(e) => setCapacity(e.target.value)}
                  id="capacity"
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  required
                >
                  <option value="">Select Capacity</option>
                  <option value="5">5-a-side</option>
                  <option value="7">7-a-side</option>
                  <option value="11">11-a-side</option>
                </select>
              </div>

              <div
                className="form-group full-width"
                style={{ gridColumn: "1/-1" }}
              >
                <label htmlFor="description">Futsal Description</label>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "var(--transition)",
                  }}
                  id="description"
                  rows="3"
                  placeholder="Describe your futsal court, facilities, and any special features"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1rem",
                background:
                  "linear-gradient(to right, var(--light-green), var(--primary-green))",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "var(--transition)",
                marginTop: "1rem",
              }}
              className="submit-btn"
              onClick={(e) => {
                handleSubmit(e);
                setShowMsg(true);
              }}
            >
              Register Futsal
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
