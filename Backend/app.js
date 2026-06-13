const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connect = require("./Database/db");
const credentials = require("./Routes/route");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log(path.join(__dirname, "uploads"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "https://futhub.netlify.app/",
    credentials: true,
  })
); 
app.use(cookieParser());
app.use("/api/v1", credentials);

const URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    if (await connect(URL)) {
      console.log("Database Connected");
    }
    app.listen(PORT, () => {  
      console.log("Server connected!");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
