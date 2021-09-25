import { Relay } from "@modules/relay.module";

const relay = new Relay(7);

(async () => {
  await relay.activate();
  console.log("ac");
  await relay.deactivate();
  console.log("d");
  await relay.activate();
  console.log("ac");
  await relay.deactivate();
  console.log("d");
})();
