const Camera = require("../models/cameraModel");
const CameraNetwork = require("../models/cameraNetwork");

// Get all cameras

const GetCameraNetwork = async (req, res) => {
  try {
    const networks = await CameraNetwork.find().populate("cameras");
    res.json(networks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific camera

const GetSingleCameraNetwork = async (req, res) => {
  res.json(res.network);
};

// create a new camera network
const CreateCameraNetwork = async (req, res) => {
  try {
    const network = new CameraNetwork(req.body);
    await network.save();
    res.status(201).json(network);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update a camera by id
const UpdateCameraNetwork = async (req, res) => {
  if (req.body.name != null) {
    res.network.name = req.body.name;
  }
  if (req.body.description != null) {
    res.network.description = req.body.description;
  }
  if (req.body.cameras != null) {
    // update the cameras belonging to the network
    res.network.cameras = req.body.cameras;
    // update the networks for the cameras
    try {
      await Camera.updateMany(
        { _id: { $in: res.network.cameras } },
        { $push: { networks: res.network._id } }
      );
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  try {
    const updatedNetwork = await res.network.save();
    res.json(updatedNetwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete a camera network by id
const DeleteCameraNetworks = async (req, res) => {
  try {
    // remove the network from the cameras that belong to it
    await Camera.updateMany(
      { _id: { $in: res.network.cameras } },
      { $pull: { networks: res.network._id } }
    );
    // delete the network itself
    await res.network.remove();
    res.json({ message: "Camera network deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  DeleteCameraNetworks,
  GetSingleCameraNetwork,
  GetCameraNetwork,
  CreateCameraNetwork,
  UpdateCameraNetwork,
};
