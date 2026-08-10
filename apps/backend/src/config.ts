import { env } from "@repo/utils"
import { Env } from "./type"

const config = {
    environment: env<Env, "NODE_ENV">("NODE_ENV"),
    url: env<Env>("DATABASE_URL"),
    port: Number(env<Env>("PORT", false) ?? 7200),
    secret: {
        cookie: env<Env>("COOKIE_SECRET"),
        jwt: env<Env>("JWT_SECRET")
    }
} as const

export default config
