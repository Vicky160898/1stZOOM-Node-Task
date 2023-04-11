const express = require("express");
const getCameraNetwork = require("../middleware/getCameraNetwork");
const {
  GetSingleCameraNetwork,
  DeleteCameraNetworks,
  GetCameraNetwork,
  CreateCameraNetwork,
  UpdateCameraNetwork,
} = require("../controller/cameraNetwork");
const router = express.Router();

router.get("/camera-network", GetCameraNetwork);
router.get("/network", getCameraNetwork, GetSingleCameraNetwork);
router.post("/camera-networks", CreateCameraNetwork);
router.delete("/camera-networks/:id", getCameraNetwork, DeleteCameraNetworks);
router.patch(
  "/camera-network/update/:id",
  getCameraNetwork,
  UpdateCameraNetwork
);
module.exports = router;
