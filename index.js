require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const CameraRouter = require("./routes/cameraRoute");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api", CameraRouter);

connect();
app.listen(PORT, () => {
  console.log("Server started on PORT");
});
