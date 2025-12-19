const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authorize = require("../Middleware/authMiddleware");
const {
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
  logout,
  getTeammate,
  searchTeammates,
  checkTeammate,
  getMyTeammatePosting,
  deleteMyPosting,
  editMyPosting,
  validateOwner,
  upload,
  checkOwner,
  updateOwner,
  adminCheck,
  getFutsals,
  approve,
  delFutsal,
  getPlayers,
  delPlayers,
  getOwners,
  delOwners
} = require("../Controllers/credentials");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const place = multer({ storage });

router.route("/login").post(getCredentials);
router.route("/signup").post(setCredentials);
router.route("/player").get(authorize, playerData);
router
  .route("/player/find-opponent")
  .post(authorize, setOpponent)
  .get(getOpponents);

router.route("/player/search-opponent").post(searchOpponents);
router.route("/player/my-opponent-postings").get(authorize, myOpponentPostings);
router
  .route("/player/my-opponent-postings/:id")
  .delete(authorize, delMyOpponents)
  .patch(authorize, updateMyOpponents);

router.route("/logout").post(logout);

router
  .route("/player/find-teammate")
  .post(authorize, setTeammate)
  .get(authorize, getTeammate);

router.route("/player/search-teammate").post(searchTeammates);
router.route("/player/check-teammate").get(authorize, checkTeammate);

router
  .route("/player/my-teammate-listing")
  .get(authorize, getMyTeammatePosting)
  .patch(authorize, editMyPosting);
router
  .route("/player/my-teammate-listing/:id")
  .delete(authorize, deleteMyPosting);

router.route('/player/book-futsal').get(authorize,getFutsals)

//owner part started
router.route("/owner").get(authorize, validateOwner);

router.route("/upload").post(authorize, place.array("futsalPic"), upload);
router
  .route("/owner/check-owner")
  .get(authorize, checkOwner)
  .patch(authorize, place.array("updatefutsalPic"), updateOwner);

//admin started
router.route('/admin/login').post(adminCheck);
router.route('/admin/approve-futsals/:id').patch(approve).delete(delFutsal)
router.route('/admin/futsals').get(getFutsals)
router.route('/admin/players').get(getPlayers);
router.route('/admin/owners').get(getOwners);
router.route('/admin/players/:id').delete(delPlayers);
router.route('/admin/owners/:id').delete(delOwners);


module.exports = router;
