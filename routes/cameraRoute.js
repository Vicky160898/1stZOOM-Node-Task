const express = require("express");
const { GetCamera, CreateCamera } = require("../controller/camera");
const router = express.Router();

router.get("/camera", GetCamera);
router.get("/cameras/:id");
router.post("/create", CreateCamera);
module.exports = router;
