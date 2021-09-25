import { Relay } from "@modules/relay.module";

const relay = new Relay(24);

(async () => {
  await relay.timedToggle(2000);
  relay.dispose();
})();
