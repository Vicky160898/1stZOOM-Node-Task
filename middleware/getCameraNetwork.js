const CameraNetwork = require("../models/cameraNetwork");

// middleware function to get a single camera network by id
const getCameraNetwork = async (req, res, next) => {
  try {
    const network = await CameraNetwork.findById(req.params.id);
    if (network == null) {
      return res.status(404).json({ message: "Camera network not found." });
    }
    res.network = network;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getCameraNetwork;
