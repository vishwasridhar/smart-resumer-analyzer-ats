const express = require("express");
const multer = require("multer");
const atsController = require("../controllers/atsController");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post("/analyze", upload.single("resume"), atsController);

module.exports = router;
