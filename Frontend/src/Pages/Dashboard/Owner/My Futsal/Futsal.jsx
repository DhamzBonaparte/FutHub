import axios from "axios";
import { useEffect, useState } from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InfoIcon from "@mui/icons-material/Info";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

export default function Futsal() {
  const [showMsg, setShowMsg] = useState(false);
  const [venue, setVenue] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const [price, setPrice] = useState(venue?.price ? venue?.price : "");
  const [capacity, setCapacity] = useState("");
  const [about, setAbout] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFutsal();
  }, []);

  const formData = new FormData();

  images.forEach(({ file }) => {
    formData.append("updatefutsalPic", file);
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

  const getFutsal = async () => {
    setLoading(true);
    try {
      const check = await axios.get(
        "http://localhost:3000/api/v1/owner/check-owner",
        { withCredentials: true }
      );
      setVenue(check.data.data);
      setOwner(check.data.data.owner);
      setFutsal(check.data.data.futsal);
      setLocation(check.data.data.location);
      setEmail(check.data.data.email);
      setContact(check.data.data.contact);
      setAddress(check.data.data.address);
      setArtificialTurf(check.data.data.artificialTurf);
      setFloodlights(check.data.data.floodlights);
      setChangingRooms(check.data.data.changingRooms);
      setShowers(check.data.data.showers);
      setParking(check.data.data.parking);
      setCafeteria(check.data.data.cafeteria);
      setFirstAid(check.data.data.firstAid);
      setEquipmentRental(check.data.data.equipmentRental);
      setPrice(check.data.data.price);
      setCapacity(check.data.data.capacity);
      setAbout(check.data.data.about);
      console.log(check);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        "http://localhost:3000/api/v1/owner/check-owner",
        formData,
        { withCredentials: true }
      );
      await getFutsal();
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2500);
      setEdit(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(showMsg);
  return (
    <>
      <div>
        <div
          className="msg"
          style={{
            display: showMsg ? "block" : "none",
            background: "#d4edda",
            color: "#155724",
            padding: "15px 20px",
            borderRadius: "8px",
            border: "1px solid #c3e6cb",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            marginTop: "15px",
          }}
        >
          <p style={{ margin: 0 }}>
            You have updated the details of your futsal. Our team shall verify
            and update them accordingly.
          </p>
        </div>
      </div>

      <div
        className="load"
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "30px",
          display: loading ? "block" : "none",
        }}
      >
        Loading Details...
      </div>
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: edit ? "block" : "none",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#007bff",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Edit Venue Details
        </h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="text"
            placeholder="Owner Name"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={owner?.charAt(0).toUpperCase() + owner?.slice(1)}
            onChange={(e) => setOwner(e.target.value)}
          />
          <input
            type="text"
            placeholder="Futsal Name"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={futsal?.charAt(0).toUpperCase() + futsal?.slice(1)}
            onChange={(e) => setFutsal(e.target.value)}
          />

          <select
            id="location"
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="kathmandu">Kathmandu</option>
            <option value="bhaktapur">Bhaktapur</option>
            <option value="lalitpur">Lalitpur</option>
            <option value="pokhara">Pokhara</option>
            <option value="chitwan">Chitwan</option>
            <option value="biratnagar">Biratnagar</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Contact Number"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            minLength={10}
            maxLength={10}
            pattern="\d{10}"
            required
          />

          <input
            type="text"
            placeholder="Address"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                checked={artificialTurf}
                onChange={(e) => setArtificialTurf(e.target.checked)}
              />{" "}
              Artificial Turf
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                checked={floodlights}
                onChange={(e) => setFloodlights(e.target.checked)}
              />{" "}
              Floodlights
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                checked={changingRooms}
                onChange={(e) => setChangingRooms(e.target.checked)}
              />{" "}
              Changing Rooms
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                onChange={(e) => setShowers(e.target.checked)}
                checked={showers}
              />{" "}
              Showers
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                onChange={(e) => setParking(e.target.checked)}
                checked={parking}
              />{" "}
              Parking
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                onChange={(e) => setCafeteria(e.target.checked)}
                checked={cafeteria}
              />{" "}
              Cafeteria
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                checked={firstAid}
                onChange={(e) => setFirstAid(e.target.checked)}
              />{" "}
              First Aid
            </label>
            <label
              style={{
                display: "flex",
                gap: "6px",
                background: "#f0f8ff",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#007bff",
              }}
            >
              <input
                type="checkbox"
                onChange={(e) => setEquipmentRental(e.target.checked)}
                checked={equipmentRental}
              />{" "}
              Equipment Rental
            </label>
          </div>

          <input
            type="text"
            placeholder="Price"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
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
            value={capacity}
          >
            <option value="">Select Capacity</option>
            <option value="5">5-a-side</option>
            <option value="7">7-a-side</option>
            <option value="11">11-a-side</option>
          </select>

          <div>
            <div
              className="msg"
              style={{
                background: "#d1ecf1",
                color: "#0c5460",
                padding: "15px 20px",
                borderRadius: "8px",
                border: "1px solid #bee5eb",
                fontSize: "16px",
                fontWeight: "500",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                marginTop: "15px",
              }}
            >
              <p style={{ margin: 0 }}>
                Note: All the photos you upload here will overwrite the
                previously uploaded photos
              </p>
            </div>
          </div>

          <label>Futsal Photos </label>
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
              name="updatefutsalPic"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleImageChange(e);
                setPreview(true);
              }}
            />

            <div
              style={{
                display: !preview ? "grid" : "none",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              {venue?.images?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000${img}`}
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
            <div
              style={{
                display: preview ? "grid" : "none",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
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
          <textarea
            placeholder="About the venue"
            rows="4"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "none",
            }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            type="submit"
            style={{
              background: "#23b319ff",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              marginTop: "10px",
            }}
            onClick={(e) => {
              handleChanges(e);
              setShowMsg(true);
            }}
          >
            Save Changes
          </button>
          <button
            style={{
              background: "#ef4532ff",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              marginTop: "10px",
            }}
            onClick={() => {
              setEdit(false);
              navigate("/owner/my-futsal");
            }}
          >
            Cancel
          </button>
        </form>
      </div>

      <div
        id="myVenues"
        className="venues-section"
        style={{
          padding: "40px",
          background: "linear-gradient(135deg, #f9f9f9, #eef2f7)",
          minHeight: "100vh",
          fontFamily: '"Segoe UI", sans-serif',
          display: loading || edit ? "none" : "block",
        }}
      >
        <div
          className="section-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#333",
            }}
          >
            My Venues
          </h2>
        </div>

        <div
          className="venues-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              background: "#fdfdfd",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              marginBottom: "25px",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                background: "#fafafa",
                padding: "8px",
              }}
            >
              {venue?.images?.slice(0, 1).map((fut, idx) => {
                return (
                  <img
                    key={idx}
                    src={`http://localhost:3000${venue.images.slice(0, 1)}`}
                    alt={venue?.futsal}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  />
                );
              })}
            </div>

            <div
              style={{
                flex: "2",
                height: "100%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#555",
                    margin: "6px 0",
                    textAlign: "center",
                  }}
                >
                  <i
                    className="fas fa-tag"
                    style={{ color: "#28a745", marginRight: "6px" }}
                  ></i>
                  Futsal Id: {venue?._id}
                </p>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    color: "#1a1a1a",
                  }}
                >
                  {venue?.futsal?.split(" ")[0].slice(0, 1).toUpperCase() +
                    venue?.futsal?.slice(1)}
                </h3>

                <p style={{ fontSize: "15px", color: "#555", margin: "6px 0" }}>
                  <LocationPinIcon
                    className="fas fa-map-marker-alt"
                    style={{ color: "var(--dark-green)", marginRight: "6px" }}
                  ></LocationPinIcon>
                  {venue?.address?.charAt(0).toUpperCase() + venue?.address?.slice(1)}, {" "} 
                      {venue?.location?.charAt(0).toUpperCase() + venue?.location?.slice(1)}
                </p>
                <p style={{ fontSize: "15px", color: "#555", margin: "6px 0" }}>
                  <AccountBalanceWalletIcon
                    className="fas fa-tag"
                    style={{ color: "var(--dark-green)", marginRight: "6px" }}
                  ></AccountBalanceWalletIcon>
                  NPR {venue?.price}/hour • {venue?.capacity}-a-side
                </p>

                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.artificialTurf ? "inline-block" : "none",
                    }}
                  >
                    {venue?.artificialTurf ? "Artificial Turf" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.floodlights ? "inline-block" : "none",
                    }}
                  >
                    {venue?.floodlights ? "Floodlights" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.changingRooms ? "inline-block" : "none",
                    }}
                  >
                    {venue?.changingRooms ? "Changing Rooms" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.showers ? "inline-block" : "none",
                    }}
                  >
                    {venue?.showers ? "Showers" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.parking ? "inline-block" : "none",
                    }}
                  >
                    {venue?.parking ? "Parking" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.cafeteria ? "inline-block" : "none",
                    }}
                  >
                    {venue?.cafeteria ? "Cafeteria" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.firstAid ? "inline-block" : "none",
                    }}
                  >
                    {venue?.firstAid ? "First Aid" : ""}
                  </span>

                  <span
                    style={{
                      background: "#e9f5ff",
                      color: "#007bff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 500,
                      display: venue?.equipmentRental ? "inline-block" : "none",
                    }}
                  >
                    {venue?.equipmentRental ? "Equipment Rental" : ""}
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    color: "#333",
                    margin: "6px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#bcc3d3ff",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    fontWeight: 500,
                  }}
                >
                  {venue?.email}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#333",
                    margin: "6px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#bcc3d3ff",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    fontWeight: 500,
                  }}
                >
                  {venue?.contact}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#333",
                    margin: "6px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#bcc3d3ff",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    fontWeight: 500,
                  }}
                >
                  {venue?.address?.slice(0, 1).toUpperCase() +
                    venue?.address?.slice(1)}
                </p>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <InfoIcon style={{ color: "#415245ff", marginRight: "6px" }} />
                {about?.slice(0, 1).toUpperCase() + about?.slice(1)}
              </div>
              <button
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  marginTop: "20px",
                }}
                onClick={() => setEdit(true)}
              >
                Edit Futsal Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
