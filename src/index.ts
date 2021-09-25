import { Relay } from "@modules/relay.module";

const relay = new Relay(24);

relay.timedToggle(2000).then(() => console.log("complete"));
