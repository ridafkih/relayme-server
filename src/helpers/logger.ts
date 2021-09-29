import * as chalk from "chalk";

enum Prefix {
  Notification = ":: ",
  Warning = "!! ",
  Entry = ">> ",
}

const log = console.log;

/**
 * Logs a prefixed message to the console.
 * @param message The message to print to the console.
 */
export const logNotification = (message: string): void => {
  const constructed = constructMessage(
    chalk.green(Prefix.Notification),
    message
  );
  log(constructed);
};

/**
 * Logs a prefixed message to the console.
 * @param message The message to print to the console.
 * @param data Any data to send to the console alongside the message.
 */
export const logWarning = (message: string, data?: any): void => {
  const constructed = constructMessage(chalk.yellow(Prefix.Warning), message);
  log(constructed, data);
};

/**
 * Logs a prefixed message to the console.
 * @param message The message to print to the console.
 * @param data Any data to send to the console alongside the message.
 */
export const logError = (message: string, data?: any): void => {
  const constructed = constructMessage(chalk.red(Prefix.Warning), message);
  log(constructed, data);
};

/**
 * Constructs a message using a prefix and message.
 * @param prefix The prefix for the message, can be chalked.
 * @param message The message to print to the console.
 */
function constructMessage(prefix: string, message: string): string {
  return `${prefix} ${message}`;
}
