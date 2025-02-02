// const express = require("express");
// const router = express.Router();
// const schoolController = require("../controllers/school.controller");
// const authMiddleware = require("../auth/auth");
// const {
//   getAllSchools,
//   getSchoolOwnData,
//   registerSchool,
//   loginSchool,
//   updateSchool,
// } = require("../controllers/school.controller");

// // const router = express.Router();
// // school.router.js
// const { createSchool } = require('../controllers/school.controller');
// router.post("/register", registerSchool);
// router.get("/all", getAllSchools);
// router.post("/login", loginSchool);
// // Only authenticated schools can update their data
// router.patch("/update", authMiddleware(["school"]), updateSchool);
// router.get("/fetch-single", authMiddleware(["school"]), getSchoolOwnData);
// // router.post("/register", registerSchool);
// router.post('/', createSchool); // Line 15 should reference the correct function

// module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../auth/auth");
const schoolController = require("../controller/school.controller");

const {
  registerSchool,
  loginSchool,
  getAllSchools,
  getSchoolOwnData,
  updateSchoolWithId,
  signOut,
  isSchoolLoggedIn,
} = require("../controller/school.controller"); // Fixed path typo ("controller" → "controllers")

// Public Routes
router.post("/register", registerSchool);
router.post("/login", loginSchool);
router.get("/all", getAllSchools);

// Protected Routes

router.get("/fetch-single", authMiddleware(["SCHOOL"]), getSchoolOwnData);
router.patch("/update", authMiddleware(["SCHOOL"]), updateSchoolWithId);
router.get("/sign-out", signOut);
router.get("/is-login", isSchoolLoggedIn);

module.exports = router;
