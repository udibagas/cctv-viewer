const express = require("express");
const app = express();
const { proxy, scriptUrl } = require("rtsp-relay")(app);

app.ws("/api/stream", (ws, req) => {
  const url = `rtsp://807e9439d5ca.entrypoint.cloud.wowza.com:1935/app-rC94792j/068b9c9a_stream2`;
  // const { url } = req.query;
  return proxy({ url })(ws);
});

app.get("/", (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://localhost:2000/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`)
);

app.listen(2000, () => {
  console.log(`Streaming relay running on port 2000`);
});
