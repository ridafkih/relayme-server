import * as chalk from "chalk";

enum Prefix {
  Notification = ":: ",
  Warning = "!! ",
  Entry = ">> ",
}

const log = console.log;

export const logNotification = (message: string): void => {
  const constructed = constructMessage(
    chalk.green(Prefix.Notification),
    message
  );
  log(constructed);
};

export const logWarning = (message: string, data?: any): void => {
  const constructed = constructMessage(chalk.yellow(Prefix.Warning), message);
  log(constructed, data);
};

export const logError = (message: string, data?: any): void => {
  const constructed = constructMessage(chalk.red(Prefix.Warning), message);
  log(constructed, data);
};

function constructMessage(prefix: string, message: string): string {
  return `${prefix} ${message}`;
}
