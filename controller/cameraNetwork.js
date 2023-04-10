// delete a camera network by id
router.delete('/camera-networks/:id', getCameraNetwork, async (req, res) => {
    try {
      // remove the network from the cameras that belong to it
      await Camera.updateMany(
        { _id: { $in: res.network.cameras } },
        { $pull: { networks: res.network._id } }
      );
      // delete the network itself
      await res.network.remove();
      res.json({ message: 'Camera network deleted.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });