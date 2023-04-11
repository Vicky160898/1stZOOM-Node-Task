const Camera = require("../models/cameraModel");

// middleware function to get a single camera by id
const getCamera = async (req, res, next) => {
  try {
    const camera = await Camera.findById(req.params.id);
    if (camera == null) {
      return res.status(404).json({ message: "Camera not found." });
    }
    res.camera = camera;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getCamera;
