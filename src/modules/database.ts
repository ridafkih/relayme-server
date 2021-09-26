import { Client, QueryResult } from "pg";
import format from "pg-format";

import { logNotification } from "@helpers/logger";

export default class Database {
  constructor(private readonly client: Client) {}

  async initialize(): Promise<Database> {
    await this.client.connect();
    logNotification(`database connected >> 0.0.0.0:${this.client.port}`);
    return this;
  }
}
