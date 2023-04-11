const Camera = require("../models/cameraModel");
const CameraNetwork = require("../models/cameraNetwork");
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

// delete a camera by id
const DeleteCamera = async (req, res) => {
  try {
    // remove the camera from the networks it belongs to
    await CameraNetwork.updateMany(
      { cameras: res.camera._id },
      { $pull: { cameras: res.camera._id } }
    );
    // delete the camera itself
    await res.camera.remove();
    res.json({ message: "Camera deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update a camera by id
const UpdateCamera = async (req, res) => {
  if (req.body.name != null) {
    res.camera.name = req.body.name;
  }
  if (req.body.description != null) {
    res.camera.description = req.body.description;
  }
  if (req.body.url != null) {
    res.camera.url = req.body.url;
  }
  if (req.body.networks != null) {
    res.camera.networks = req.body.networks;
  }
  try {
    const updatedCamera = await res.camera.save();
    res.json(updatedCamera);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//here exporting route..

module.exports = {
  GetCamera,
  GetSingleCamera,
  CreateCamera,
  DeleteCamera,
  UpdateCamera,
};
