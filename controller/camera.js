const Camera = require("../models/cameraModel");

// Get all cameras

const GetCamera = async (req, res) => {
  try {
    const cameras = await Camera.find().populate("networks");
    res.json(cameras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific camera

const GetSingleCamera = async (req, res) => {
  const { id } = req.params;
  res.json(res.camera);
};

// Create a new camera
const CreateCamera = async (req, res) => {
  const { name, description, url } = req.body;
  const findCamera = await Camera.findOne({ name });
  try {
    if (!findCamera) {
      const newCamera = await Camera.create({ name, description, url });
      res.status(201).json(newCamera);
    }
    res.status(401).send("Camera already exist");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//here exporting route..

module.exports = { GetCamera, GetSingleCamera, CreateCamera };
