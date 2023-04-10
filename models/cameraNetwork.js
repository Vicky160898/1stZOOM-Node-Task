const { Schema, model } = require("mongoose");

const cameraNetworkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  cameras: [
    {
      type: Schema.Types.ObjectId,
      ref: "Camera",
    },
  ],
});

const CameraNetwork = model("CameraNetwork", cameraNetworkSchema);

module.exports = CameraNetwork;
