import { drizzle } from "drizzle-orm/postgres-js"
import { result } from "./result"
import postgres from "postgres"
import config from "../config"

export const db = drizzle({ client: postgres(config.url) })
export const table = {
    result
} as const
