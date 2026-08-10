import { char, pgTable, uuid, text, pgEnum, timestamp, check } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { sql } from "drizzle-orm"

export const gender = pgEnum("gender", ["male", "female", "other"])
export const result = pgTable(
    "result",
    {
        id: uuid("id")
            .primaryKey()
            .notNull()
            .$defaultFn(() => randomUUIDv7()),
        roll: char("roll", { length: 6 }).notNull(),
        reg: text("reg").notNull(),
        name: text("name").notNull(),
        gender: gender("gender").notNull(),
        createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
            .notNull()
            .$defaultFn(() => Temporal.Now.instant().toString()),
        updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
            .notNull()
            .$onUpdateFn(() => Temporal.Now.instant().toString())
    },
    (table) => [check("roll_format_check", sql`${table.roll} ~ '^[0-9]{6}$'`)]
)
