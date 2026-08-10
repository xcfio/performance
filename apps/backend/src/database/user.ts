import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { randomUUIDv7 } from "node:crypto"

export const user = sqliteTable("user", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => randomUUIDv7())
})
