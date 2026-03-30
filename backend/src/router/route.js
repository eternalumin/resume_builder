const express = require("express");
const {
  registerUser,
  getUser,
  login,
  updateUser,
  refreshToken,
  logout,
  generateOtp,
  verifyOtp,
  resetPassword,
} = require("../controllers/authController");
const {
  tailorResume,
  generateSummary,
  improveDescription,
  analyzeJobMatch,
} = require("../controllers/resumeController");
const { authenticate, localVariable } = require("../middleware/authMiddleware");

const router = express.Router();

// POST
router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyotp", verifyOtp);

// GET
router.get("/user/:username", authenticate, getUser);
router.get("/generateotp", localVariable, generateOtp);
router.get("/refresh", refreshToken);
// Testin
router.get("/test", (req, res) => {
  res.send({ message: "its working" });
});

// PUT
router.put("/updateuser", authenticate, updateUser);
router.put("/resetpassword", resetPassword);

// Resume Builder routes
router.post("/resume/tailor", tailorResume);
router.post("/resume/summary", generateSummary);
router.post("/resume/improve", improveDescription);
router.post("/resume/analyze", analyzeJobMatch);

// DELETE
// router.delete("/deleteuser");
module.exports = router;
