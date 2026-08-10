import { drizzle } from "drizzle-orm/node-sqlite"
import { DatabaseSync } from "node:sqlite"
import config from "../config"

export const db = drizzle({ client: new DatabaseSync(config.path) })
