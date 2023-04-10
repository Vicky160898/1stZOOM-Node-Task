const { Schema, model } = require("mongoose");
const cameraSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  url: { type: String },
  networks: [
    {
      type: Schema.Types.ObjectId,
      ref: "CameraNetwork",
    },
  ],
});

const Camera = model("Camera", cameraSchema);

module.exports = Camera;
