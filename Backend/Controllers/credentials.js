const signup = require("../Model/signup");
const bcrypt = require("bcrypt");
const mail = require("nodemailer");
const oppponent = require("../Model/opponent");
const jwt = require("jsonwebtoken");
const opponent = require("../Model/opponent");
const futsals = require("../Model/futsal");
const teammate = require("../Model/teammate");
const admin = require("../Model/admin");
const path = require("path");

require("dotenv").config();

// for login
const getCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const approved = await signup.findOne({ email });

    if (!approved) {
      return res.status(404).json({
        msg: "Account not found",
        status: "Terminated",
      });
    }

    const correctPassword = await bcrypt.compare(password, approved.password);

    if (!correctPassword) {
      return res.status(401).json({
        msg: "Invalid email or password",
        status: "Terminated",
      });
    }

    const token = jwt.sign(
      {
        id: approved._id,
        email: approved.email,
        firstName: approved.firstName,
        lastName: approved.lastName,
        role: approved.roles,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      msg: "Login successful",
      data: {
        id: approved._id,
        email: approved.email,
        firstName: approved.firstName,
        lastName: approved.lastName,
        role: approved.roles,
      },
      status: "completed",
      token: token,
    });
    console.log(correctPassword);
  } catch (err) {
    res.status(401).json({
      msg: "Username or Password is incorrect.",
      error: err.message,
      status: "Terminated",
    });
  }
};

//for signup
const setCredentials = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    agreedToTerms,
    roles,
    location,
    phone,
  } = req.body;

  const newPassword = await bcrypt.hash(password, 13);

  try {
    const insert = await signup.create({
      firstName,
      lastName,
      email,
      password: newPassword,
      roles,
      agreedToTerms,
      location,
      phone,
    });
    res.status(201).json({
      msg: "User created successfully",
      user: insert,
      status: "Completed",
    });
  } catch (err) {
    res.status(400).json({
      msg: err.message,
      status: "Not Completed",
    });
  }
};

//users data after login
const playerData = (req, res) => {
  res.status(200).json({ msg: req.user });
};

//posting as opponent
const setOpponent = async (req, res) => {
  try {
    const { id } = req.user;

    const {
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
    } = req.body;

    const getData = await opponent.create({
      userId: id,
      teamName,
      totalPlayers,
      location,
      averageAge,
      contact,
      venue,
      gender,
      matchDate: new Date(date),
      players: playerNames.map((n) => ({ name: n })),
      level,
      timeFrom,
      timeTo,
    });
    res.status(200).json({ msg: "hi there", data: getData });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

//getting oppponents
const getOpponents = async (req, res) => {
  const all = await opponent.find();
  res.status(200).json({ msg: "all ooponents", data: all, length: all.length });
};

//filtered search
const searchOpponents = async (req, res) => {
  try {
    const { search } = req.body;
    const filter = await opponent.find({
      location: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      filteredData: filter,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

//my opponents
const myOpponentPostings = async (req, res) => {
  try {
    const { id } = req.user;
    const myopponentPostings = await opponent.find({ userId: id });
    res.status(200).json({ msg: "Done", data: myopponentPostings });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const delMyOpponents = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const del = await opponent.findOneAndDelete({ _id: id, userId });
    res.status(200).json({ msg: "deleted", data: del });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateMyOpponents = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const {
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
    } = req.body;

    const update = await oppponent.findOneAndUpdate(
      { _id: id, userId },
      {
        teamName,
        location,
        averageAge,
        contact,
        venue,
        gender,
        matchDate: date,
        level,
        timeFrom,
        timeTo,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "update data", updatedData: update });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const setTeammate = async (req, res) => {
  try {
    const userId = req.user.id;

    const exist = await teammate.findOne({ userId });
    if (exist) {
      return res
        .status(200)
        .json({ msg: "Already Registered", registered: true });
    }

    const {
      name,
      age,
      location,
      contact,
      position,
      experience,
      gender,
      available,
      about,
    } = req.body;

    const frnd = await teammate.create({
      userId,
      name,
      location,
      age,
      contact,
      position,
      experience,
      gender,
      availability: available,
      about,
    });

    res.status(200).json({ msg: "got it", data: frnd });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getTeammate = async (req, res) => {
  try {
    const teams = await teammate.find();
    res.status(200).json({ msg: "got it", data: teams, length: teams.length });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({ msg: "logout" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const searchTeammates = async (req, res) => {
  try {
    const { search } = req.body;
    const data = await teammate.find({
      location: { $regex: search, $options: "i" },
    });
    res.status(200).json({ msg: "searchh", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const checkTeammate = async (req, res) => {
  try {
    const userId = req.user.id;
    const check = await teammate.findOne({ userId });
    if (check) {
      res.status(200).json({ msg: "Already registered", registered: true });
    } else {
      res.status(200).json({ msg: "Not registered", registered: false });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMyTeammatePosting = async (req, res) => {
  try {
    const userId = req.user.id;
    const myList = await teammate.findOne({ userId });
    if (myList) {
      res.status(200).json({ msg: "Listed", data: myList });
    } else {
      res.status(200).json({ msg: "Not listed yet!" });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const deleteMyPosting = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user.id;
    const del = await teammate.findOneAndDelete({ _id, userId });
    res.status(200).json({ msg: "delete", data: del });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const editMyPosting = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      location,
      age,
      contact,
      position,
      experience,
      gender,
      available,
      about,
    } = req.body;
    const upd = await teammate.findOneAndUpdate(
      { userId },
      {
        name,
        location,
        age,
        contact,
        position,
        experience,
        gender,
        availability: available,
        about,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "update", data: upd });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const validateOwner = (req, res) => {
  try {
    res.status(200).json({ msg: "working", data: req.user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const upload = async (req, res) => {
  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
  const userId = req.user.id;
  const {
    images,
    owner,
    futsal,
    location,
    email,
    contact,
    address,
    artificialTurf,
    floodlights,
    changingRooms,
    showers,
    parking,
    cafeteria,
    firstAid,
    equipmentRental,
    price,
    capacity,
    about,
  } = req.body;

  try {
    const fut = await futsals.create({
      userId,
      images: imagePaths,
      owner,
      futsal,
      location,
      email,
      contact,
      address,
      artificialTurf: artificialTurf === "false" ? false : true,
      floodlights: floodlights === "false" ? false : true,
      changingRooms: changingRooms === "false" ? false : true,
      showers: showers === "false" ? false : true,
      parking: parking === "false" ? false : true,
      cafeteria: cafeteria === "false" ? false : true,
      firstAid: firstAid === "false" ? false : true,
      equipmentRental: equipmentRental === "false" ? false : true,
      price,
      capacity,
      about,
    });
    res.status(200).json({ msg: "made", data: fut, user: req.user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const checkOwner = async (req, res) => {
  try {
    const userId = req.user.id;
    const own = await futsals.findOne({ userId });
    res.status(200).json({ msg: "completed", data: own, user: req.user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateOwner = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const userId = req.user.id;
    const {
      images,
      owner,
      futsal,
      location,
      email,
      contact,
      address,
      artificialTurf,
      floodlights,
      changingRooms,
      showers,
      parking,
      cafeteria,
      firstAid,
      equipmentRental,
      price,
      capacity,
      about,
    } = req.body;
    const upd = await futsals.findOneAndUpdate(
      { userId },
      {
        userId,
        images: imagePaths,
        owner,
        futsal,
        location,
        email,
        contact,
        address,
        artificialTurf: artificialTurf === "true",
        floodlights: floodlights === "true",
        changingRooms: changingRooms === "true",
        showers: showers === "true",
        parking: parking === "true",
        cafeteria: cafeteria === "true",
        firstAid: firstAid === "true",
        equipmentRental: equipmentRental === "true",
        price,
        capacity,
        about,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "updated", data: upd });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getFutsals = async (req, res) => {
  try {
    const all = await futsals.find();
    res.status(200).json({ msg: "completed", data: all });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const adminCheck = async (req, res) => {
  try {
    const { username, password } = req.body;
    const approved = await admin.findOne({ admin: username });
    const pass = await bcrypt.compare(password, approved.password);
    if (pass) {
      res.status(200).json({ msg: "admin is approved", data: approved });
    } else {
      res.status(403).json({msg:"Invalis username or password."});
    }
    console.log(pass);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  getCredentials,
  setCredentials,
  playerData,
  setOpponent,
  getOpponents,
  searchOpponents,
  myOpponentPostings,
  delMyOpponents,
  updateMyOpponents,
  setTeammate,
  getTeammate,
  logout,
  searchTeammates,
  checkTeammate,
  getMyTeammatePosting,
  deleteMyPosting,
  editMyPosting,
  validateOwner,
  upload,
  checkOwner,
  updateOwner,
  getFutsals,
  adminCheck,
};
