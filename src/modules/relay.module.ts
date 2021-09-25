import { Gpio as GPIO, BinaryValue } from "onoff";

export class Relay extends GPIO {
  constructor(number: number) {
    super(number, "out");
  }

  private mutable = true;

  /**
   * Activate the GPIO port for a certain amount of time in millseconds.
   * @param time The amount of time in millseconds to activate that port.
   * @returns Whether the operation was permitted.
   */
  timedToggle(time: number): Promise<Boolean> {
    this.mutable = false;
    return new Promise<Boolean>((resolve) => {
      setTimeout(resolve, time, this.deactivate());
    }).then((response) => {
      this.mutable = true;
      return response;
    });
  }

  /**
   * Activates the GPIO port.
   * @returns Whether the operation was permitted.
   */
  activate(): boolean {
    if (!this.mutable) return false;
    return this.setActive(true);
  }

  /**
   * Deactivates the GPIO port.
   * @returns Whether the operation was permitted.
   */
  deactivate(): boolean {
    if (!this.mutable) return false;
    return this.setActive(false);
  }

  /**
   * Gets the state of the GPIO port.
   * @returns Whether or not the GPIO port is active.
   */
  isActive(): boolean {
    return !this.readSync();
  }

  /**
   * Force a state for GPIO port.
   * @param state The new state for the GPIO port.
   * @param override Whether to override under the condition that the state is immutable.
   * @returns Whether the operation was a success.
   */
  setActive(state: boolean, override: boolean = false) {
    if (!this.mutable && !override) return false;
    this.writeSync(+state as BinaryValue);
    return true;
  }
}
