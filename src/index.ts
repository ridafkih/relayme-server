import { Relay } from "@modules/relay.module";

const relay = new Relay(7);

(async () => {
  await relay.activate();
  await relay.deactivate();
  await relay.activate();
  await relay.deactivate();
})();
