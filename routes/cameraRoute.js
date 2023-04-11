const express = require("express");
const {
  GetCamera,
  CreateCamera,
  GetSingleCamera,
  DeleteCamera,
  UpdateCamera,
} = require("../controller/camera");
const getCamera = require("../middleware/getCamera");
const router = express.Router();

router.get("/camera", GetCamera);
router.get("/cameras/:id", getCamera, GetSingleCamera);
router.post("/create", CreateCamera);
router.delete("/camera/:id", getCamera, DeleteCamera);
router.patch("/camera/update/:id", getCamera, UpdateCamera);
module.exports = router;
