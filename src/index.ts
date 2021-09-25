import * as express from "express";
import { Relay } from "@modules/relay.module";

const app = express();
const relay = new Relay(24);

app.post("/trigger/garage", async (req, res) => {
  const success = await relay.timedToggle(500);
  if (!success) return res.status(500).json({ success: false });
  res.status(200).json({ success: true });
});

app.listen(4321, () => ":: server listening");
