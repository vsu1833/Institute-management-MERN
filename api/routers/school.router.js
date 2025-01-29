const express = require("express");

const authMiddleware = require("../auth/auth");
const {
  getAllSchools,
  getSchoolOwnData,
  registerSchool,
  loginSchool,
  updateSchool,
} = require("../controllers/school.control");

const router = express.Router();

router.post("/register", registerSchool);
router.get("/all", getAllSchools);
router.get("/login", loginSchool);
// Only authenticated schools can update their data
router.patch("/update", authMiddleware(["school"]), updateSchool);
router.get("/fetch-single", authMiddleware(["school"]), getSchoolOwnData);

module.exports = router;
