const express = require("express");
const cors = require("cors");
const atsRoutes = require("./routes/atsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", atsRoutes);

app.get("/", (req, res) => {
  res.send("ATS Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ATS running on port ${PORT}`);
});
