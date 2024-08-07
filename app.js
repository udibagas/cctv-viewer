const express = require("express");
const Camera = require("./models/camera");
const app = express();
const port = 2000;
const { proxy, scriptUrl } = require("rtsp-relay")(app);

app.set("view engine", "ejs");

app.ws("/api/stream", (ws, req) => {
  // const url = `rtsp://admin:admin123@192.168.1.110/live.sdp`;
  // const url = `rtsp://admin:admin123@192.168.1.110/live/0/main`;
  const { url } = req.query;
  return proxy({ url })(ws);
});

app.get("/", async (req, res) => {
  try {
    const cameras = await Camera.findAll();
    res.render("index", { scriptUrl, cameras });
  } catch (error) {
    console.error(error);
    res.status(5000).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Streaming relay running on port ${port}`);
});
