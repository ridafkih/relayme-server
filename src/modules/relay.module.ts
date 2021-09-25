import { Gpio as GPIO, BinaryValue } from "onoff";

export class Relay {
  constructor(number: number) {
    this.gpio = new GPIO(number, "out");
  }

  private gpio: GPIO;
  private mutable: boolean = true;

  /**
   * Activate the GPIO port for a certain amount of time in millseconds.
   * @param time The amount of time in millseconds to activate that port.
   * @returns Whether the operation was permitted.
   */
  async timedToggle(time: number): Promise<Boolean> {
    await this.activate();
    return new Promise((resolve) => {
      setTimeout(() => this.deactivate().then(resolve), time);
    });
  }

  /**
   * Activates the GPIO port.
   * @returns Whether the operation was permitted.
   */
  async activate(): Promise<boolean> {
    if (!this.mutable) return false;
    return this.setActive(true);
  }

  /**
   * Deactivates the GPIO port.
   * @returns Whether the operation was permitted.
   */
  async deactivate(): Promise<boolean> {
    if (!this.mutable) return false;
    return this.setActive(false);
  }

  /**
   * Gets the state of the GPIO port.
   * @returns Whether or not the GPIO port is active.
   */
  isActive(): Promise<boolean> {
    return this.gpio.read().then((value) => !!value);
  }

  /**
   * Force a state for GPIO port.
   * @param state The new state for the GPIO port.
   * @param override Whether to override under the condition that the state is immutable.
   * @returns Whether the operation was a success.
   */
  async setActive(state: boolean, override: boolean = false) {
    if (!this.mutable && !override) return false;
    await this.gpio.write(+state as BinaryValue);
    return true;
  }

  dispose() {
    this.gpio.unexport();
  }
}
