import { Relay } from "@modules/relay";

export const garageDoor = new Relay(24);

export const triggerGarageDoor = () => garageDoor.timedToggle(500);
